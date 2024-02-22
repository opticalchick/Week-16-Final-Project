import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import ButtonLink from "./ButtonLink.js";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";

const OCRecordList = () => {
    const [records, setRecords] = useState([]);
    const [editRecordId, setEditRecordId] = useState('');
    const [editOdometer, setEditOdometer] = useState('');
    const [editNotes, setEditNotes] = useState('');
    const [editDate, setEditDate] = useState('');
    const [showEditForm, setShowEditForm] = useState('');
    const OC_URL = 'https://65c54d6bdae2304e92e42bed.mockapi.io/OilChange';

    useEffect(() => {
        // sends get request to API, then sets records for display in table below
        const getRecords = async () => {
            try {
                const response = await axios.get(OC_URL);

                setRecords(response.data);

            }
            // Reports an error if get request fails
            catch (error) {
                console.error("There was an error retrieving records:", error.message);
            }
        };
        getRecords();

    }, []);

    // Sends delete request to API using the record id
    const handleDeleteRecord = async (id) => {
        try {
            await axios.delete(`https://65c54d6bdae2304e92e42bed.mockapi.io/OilChange/${id}`);
            // sends a get request to set records once delete has occurred
            const response = await axios.get(OC_URL);
            setRecords(response.data);
        } catch (error) {
            console.error("There was an error deleting this record:", error.message);

            if (error.response) {
                console.log("Database Response (ERROR):", error.response.data);
            }
        }
    };
    // When Edit button is clicked, edit form will changes state and will show.  Fields
    // are pulled from the existing data and can be modified.
    const handleEditRecord = (record) => {
        setEditRecordId(record.id);
        setEditDate(record.date);
        setEditOdometer(String(record.odometer));
        setEditNotes(record.notes);
        setShowEditForm(true);
    };

    const handleUpdateRecord = async () => {
        try {
            if (editDate.trim().length === 0 || editOdometer.trim().length === 0 || editNotes.trim().length === 0) {
                alert("Please complete all fields!");
                return;
            }
            const updatedRecord = {
                date: editDate,
                odometer: parseInt(editOdometer, 10),
                notes: editNotes,
            };
            // Sends API request to edit information using the id.

            await axios.put(`https://65c54d6bdae2304e92e42bed.mockapi.io/OilChange/${editRecordId}`, updatedRecord);

            // Sends get request to repopulate table with updated information
            const response = await axios.get(OC_URL);
            setRecords(response.data);

            // Changes the state of show Form so that form is hidden again until edit
            // button is clicked
            setShowEditForm(false);

            // resets all fields to be empty after form submitted 
            setEditRecordId(null);
            setEditOdometer('');
            setEditDate('');
            setEditNotes('');
        } catch (error) {
            console.error("There was an error updating the information:", error.message);

            if (error.response) {
                console.log("Database Response (ERROR):", error.response.data);
            }
        }
    };

    // This is the container for the edit form and table to display data from API
    return (
        <div className="RecordListContainer">
            <h2 className="Header">Oil Change Records</h2>
            {/* This is the form that has a state of false or hidden, until the edit button is clicked.
            Then the state changes to true and form will show. */}
            {showEditForm && (
                <div className="editFormContainer mb-4">
                    <h3 className="text-center">Edit Record</h3>
                    <form>
                        <div className="row gx-5">
                            <div className="col mb-3">
                                <label>Date:</label>
                                <input
                                    type="date"
                                    value={editDate}
                                    onChange={(e) => setEditDate(e.target.value)}
                                    className="form-control" />
                            </div>
                            <div className="col mb-3">
                                <label>Odometer:</label>
                                <input
                                    type="text"
                                    value={editOdometer}
                                    onChange={(e) => setEditOdometer(e.target.value)}
                                    className="form-control" />
                            </div>
                        </div>
                        <div className="col mb-3">
                            <label>Notes:</label>
                            <input
                                type="text"
                                value={editNotes}
                                onChange={(e) => setEditNotes(e.target.value)}
                                className="form-control" />
                        </div>
                        <div className="col mb-3 text-center">
                            <button type="button"
                                className="btn btn-outline-info"
                                onClick={handleUpdateRecord}>Update</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Bootstrap and CSS used for styling.  Moment component used from react-moment
            to format date to DD/MM/YYYY.  Table renders data received from API */}
            <table className="table table-striped table-hover Table">
                <thead>
                    <tr>
                        <th scope="col" className="col-1" datatype="date" >Date</th>
                        <th scope="col" className="col-1">Odometer</th>
                        <th scope="col" className="col-3">Notes</th>
                        <th scope="col" className="col-1">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record.id}>
                            <td><Moment format="MM/DD/YYYY">{record.date}</Moment></td>
                            <td><NumericFormat value={record.odometer} displayType={"text"} thousandSeparator={true} /></td>
                            <td>{record.notes}</td>
                            <td>
                                {/* Buttons used for edit and delete functions */}
                                <button className="editButton btn btn-outline-info"
                                    onClick={() => handleEditRecord(record)}>Edit</button>
                                <button className="deleteButton btn btn-outline-danger"
                                    onClick={() => handleDeleteRecord(record.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* ButtonLink used to appear as button but act as a link */}
            <div className="createButton">
                <ButtonLink to="/oilChangeNewEntry">Create New Entry</ButtonLink>
            </div>
        </div >
    );
};

export default OCRecordList;