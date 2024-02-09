import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../App.css';

const OCRecordList = () => {
    const [records, setRecords] = useState('');
    const [odometer, setOdometer] = useState('');
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState('');
    const [editRecordId, setEditRecordId] = useState('');
    const [editOdometer, setEditOdometer] = useState('');
    const [editNotes, setEditNotes] = useState('');
    const [editDate, setEditDate] = useState('');
    const [showEditForm, setShowEditForm] = useState('');
    const OC_URL = 'https://65c54d6bdae2304e92e42bed.mockapi.io/OilChange';

    useEffect(() => {
        const getRecords = async () => {
            try {
                const response = await axios.get(OC_URL);

                setRecords(response.data);
            } catch (error) {
                console.error("There was an error retrieving records:", error.message);
            }
        };
        getRecords();

    }, []);

    const handleNewRecord = async () => {
        try {
            if (!odometer || !date || !notes) {
                console.error("Please complete all fields.");
                return;
            }

            const newRecord = {
                odometer: parseInt(odometer),
                date,
                notes,
            };

            await axios.post(OC_URL, newRecord);
            const response = await axios.get(OC_URL);

            setRecords(response.data);

            setOdometer('');
            setDate('');
            setNotes('');
        } catch (error) {
            console.error("There was an error creating a new record:", error.message);

            if (error.response) {
                console.log("Database Response (ERROR):", error.response.data);
            }
        }
    };

    const handleDeleteRecord = async (id) => {
        try {
            await axios.delete(`OC_URL/${id}`);
            const response = await axios.get(OC_URL);

            setRecords(response.data);
        } catch (error) {
            console.error("There was an error deleting this record:", error.message);

            if (error.response) {
                console.log("Database Response (ERROR):", error.response.data);
            }
        }
    };

    const handleEditRecord = (record) => {
        setEditRecordId(record.id);
        setEditDate(record.date);
        setEditOdometer(String(record.odometer));
        setEditNotes(record.notes);
        setShowEditForm(true);
    };

    const handleUpdateRecord = async () => {
        try {
            if (!editOdometer || !editDate || !editNotes) {
                console.error("Please complete all fields.");
                return;
            }
            const updatedRecord = {
                date: editDate,
                odometer: parseInt(editOdometer),
                notes: editNotes,
            };

            await axios.put(`OC_URL/${editRecordId}`, updatedRecord);

            const response = await axios.get(OC_URL);

            setRecords(response.data);

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

    return (
        <div className="OCRecordListContainer">
            <h2 className="mt-3 mb-4">Oil Change Records</h2>
            {showEditForm && (
                <div className="editFormContainer mb-4">
                    <h3>Edit Record</h3>
                    <form>
                        <label>Date:</label>
                        <input
                            type="date"
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)} />

                        <label>Odometer:</label>
                        <input
                            type="number"
                            value={editOdometer}
                            onChange={(e) => setEditOdometer(e.target.value)} />

                        <label>Note:</label>
                        <input
                            type="text"
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)} />
                        <button type="button"
                            className="btn btn-outline-info"
                            onClick={handleUpdateRecord}>Update</button>
                    </form>
                </div>
            )}

            <div className="mb-5">
                <form className="p-4 bg-light rounded">
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)} />

                    <label>Odometer:</label>
                    <input
                        type="number"
                        value={odometer}
                        onClick={(e) => setOdometer(e.target.value)} />
                    <label>Notes:</label>
                    <input
                        type="text"
                        value={notes}
                        onClick={(e) => setNotes(e.target.value)} />
                    <button className="btn btn-outline-primary"
                        onClick={handleNewRecord}>Create New Record</button>
                </form>
            </div>

            <table className="table-striped table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Odometer</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {records.localeCompare((record) => (
                        <tr key={record.id}>
                            <td>{record.date}</td>
                            <td>{record.odometer}</td>
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
        </div>
    );
};

export default OCRecordList;