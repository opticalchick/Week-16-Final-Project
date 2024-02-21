import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import ButtonLink from "./ButtonLink.js";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";

// creates tire list, with edit and delete functions
const TireRecordList = () => {
    const [records, setRecords] = useState([]);
    const [editRecordId, setEditRecordId] = useState('');
    const [editOdometer, setEditOdometer] = useState('');
    const [editNotes, setEditNotes] = useState('');
    const [editDate, setEditDate] = useState('');
    const [showEditForm, setShowEditForm] = useState('');
    const TIRES_URL = 'https://65c54d6bdae2304e92e42bed.mockapi.io/Tires';

    // sends get request to API, sets records, mounts once
    useEffect(() => {
        const getRecords = async () => {
            try {
                const response = await axios.get(TIRES_URL);

                setRecords(response.data);
            } catch (error) {
                console.error("There was an error retrieving records:", error.message);
            }
        };
        getRecords();

    }, []);

    // sends delete request to API with record id, then sets record with response
    const handleDeleteRecord = async (id) => {
        try {
            await axios.delete(`https://65c54d6bdae2304e92e42bed.mockapi.io/Tires/${id}`);
            const response = await axios.get(TIRES_URL);

            setRecords(response.data);
        } catch (error) {
            console.error("There was an error deleting this record:", error.message);

            if (error.response) {
                console.log("Database Response (ERROR):", error.response.data);
            }
        }
    };

    // called when edit button clicked; pulls information forward to edit and shows edit form
    const handleEditRecord = (record) => {
        setEditRecordId(record.id);
        setEditDate(record.date);
        setEditOdometer(String(record.odometer));
        setEditNotes(record.notes);
        setShowEditForm(true);
    };

    // this is called when submit button clicked on edit form
    const handleUpdateRecord = async () => {
        try {
            // checks to make sure that none of the fields are empty.  Sends alert if empty fields exist
            if (editDate.trim().length === 0 || editOdometer.trim().length === 0 || editNotes.trim().length === 0) {
                alert("Please complete all fields!")
            }
            const updatedRecord = {
                date: editDate,
                odometer: parseInt(editOdometer, 10),
                notes: editNotes,
            };

            await axios.put(`https://65c54d6bdae2304e92e42bed.mockapi.io/Tires/${editRecordId}`, updatedRecord);
            const response = await axios.get(TIRES_URL);
            setRecords(response.data);

            // hides form upon form submission and clears fields
            setShowEditForm(false);
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
    // container for edit form and table displaying API data.  Styled with CSS and Bootstrap
    return (
        <div className="RecordListContainer">
            <h2 className="Header">Tire Records</h2>
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
                    {/* Mapping records for table */}
                    {records.map((record) => (
                        <tr key={record.id}>
                            {/* used Moment to convert date to preferred format & 
                            NumericFormat used to format commas in large numbers returning
                            from API data */}
                            <td><Moment format="MM/DD/YYYY">{record.date}</Moment></td>
                            <td><NumericFormat value={record.odometer} displayType={"text"} thousandSeparator={true} /></td>
                            <td>{record.notes}</td>
                            <td>
                                <button className="editButton btn btn-outline-info"
                                    onClick={() => handleEditRecord(record)}>Edit</button>
                                <button className="deleteButton btn btn-outline-danger"
                                    onClick={() => handleDeleteRecord(record.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="createButton">
                <ButtonLink to="/tiresNewEntry">Create New Entry</ButtonLink>
            </div>
        </div>

    );
};

export default TireRecordList;