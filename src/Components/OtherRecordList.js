import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import ButtonLink from "./ButtonLink.js";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";


const OtherRecordList = () => {
    const [records, setRecords] = useState([]);
    const [editRecordId, setEditRecordId] = useState('');
    const [editOdometer, setEditOdometer] = useState('');
    const [editNotes, setEditNotes] = useState('');
    const [editDate, setEditDate] = useState('');
    const [showEditForm, setShowEditForm] = useState('');
    const OC_URL = 'https://65c54d6bdae2304e92e42bed.mockapi.io/Other';

    useEffect(() => {
        const getRecords = async () => {
            try {
                // sends request for data from API then sets records
                const response = await axios.get(OC_URL);
                setRecords(response.data);
            } catch (error) {
                console.error("There was an error retrieving records:", error.message);
            }
        };
        getRecords();

    }, []);

    // Sends delete request to API when delete button onClick event triggered.
    const handleDeleteRecord = async (id) => {
        try {
            await axios.delete(`https://65c54d6bdae2304e92e42bed.mockapi.io/Other/${id}`);
            const response = await axios.get(OC_URL);

            setRecords(response.data);
        } catch (error) {
            console.error("There was an error deleting this record:", error.message);

            if (error.response) {
                console.log("Database Response (ERROR):", error.response.data);
            }
        }
    };

    // Shows edit form and uses current information in form that can be changed
    const handleEditRecord = (record) => {
        setEditRecordId(record.id);
        setEditDate(record.date);
        setEditOdometer(String(record.odometer));
        setEditNotes(record.notes);
        setShowEditForm(true);
    };

    // function for editing information contained in record
    const handleUpdateRecord = async () => {
        try {
            // checks if fields have input and shows alert if empty
            if (editDate.trim().length === 0 || editOdometer.trim().length === 0 || editNotes.trim().length === 0) {
                alert("Please complete all fields!");
                return;
            }
            // composition of edit record            
            const updatedRecord = {
                date: editDate,
                odometer: parseInt(editOdometer, 10),
                notes: editNotes,
            };
            // API notified of edit; sends put request and gets data returned to show
            // after response
            await axios.put(`https://65c54d6bdae2304e92e42bed.mockapi.io/Other/${editRecordId}`, updatedRecord);
            const response = await axios.get(OC_URL);
            setRecords(response.data);

            // hides edit form after edit complete
            setShowEditForm(false);

            // resets fields to be empty
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

    // Container holding edit form and table displaying data from API    
    return (
        <div className="RecordListContainer">
            <h2 className="Header">Other Maintenance Records</h2>

            {/* This form is hidden until edit button is clicked and state changes. Bootstrap
            and CSS used for styling form and table */}
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
                    {records.map((record) => (
                        <tr key={record.id}>
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
                <ButtonLink to="/otherRecordNewEntry">Create New Entry</ButtonLink>
            </div>
        </div >
    );
};

export default OtherRecordList;