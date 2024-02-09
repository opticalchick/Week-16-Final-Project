import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewOCRecord = () => {
    const navigate = useNavigate();
    const [odometer, setOdometer] = useState('');
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState('');
    const [records, setRecords] = useState('');
    const OC_URL = 'https://65c54d6bdae2304e92e42bed.mockapi.io/OilChange';


    useEffect(() => {
        getRecords();
    }, []);

    const getRecords = async () => {
        try {
            const response = await axios.get(OC_URL);
            setRecords(response.data);
        } catch (error) {
            console.error("There was an error retrieving records:", error.message);
        }
    };

    const handleNewOCRecord = async () => {
        try {
            if (!date || !odometer || !notes) {
                console.error("Please complete all fields");
                return;
            }

            const newOCRecord = {
                odometer: parseInt(odometer),
                date,
                notes,
            };

            await axios.post(OC_URL, newOCRecord);

            getRecords();

            setOdometer('');
            setDate('');
            setNotes('');

            navigate("/");
        } catch (error) {
            console.error("There was a problem creating a new entry:", error.message);

            if (error.response) {
                console.log("Database Response (ERROR):", error.response.data);
            }
        }
    };

    return (
        <div>
            <h2>Create New Oil Change Record</h2>
            <form>
                <label>Odometer:</label>
                <input
                    type="number"
                    value={odometer}
                    onChange={(e) => setOdometer(e.target.value)} />

                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)} />
                <label>Notes:</label>
                <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)} />
                <button type="button" onClick={handleNewOCRecord}>Create</button>
            </form>

            <h2>Oil Change Records</h2>
            <table>
                <thead>
                    <tr>
                        <th>Odometer</th>
                        <th>Date</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record.id}>
                            <td>{record.odometer}</td>
                            <td>{record.date}</td>
                            <td>{record.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NewOCRecord;

