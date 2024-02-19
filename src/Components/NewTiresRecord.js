import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewTiresRecord = () => {
    const navigate = useNavigate();
    const [odometer, setOdometer] = useState('');
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState('');
    const [records, setRecords] = useState([]);
    const TIRES_URL = 'https://65c54d6bdae2304e92e42bed.mockapi.io/Tires';


    useEffect(() => {
        getRecords();
    }, []);

    const getRecords = async () => {
        try {
            const response = await axios.get(TIRES_URL);
            setRecords(response.data);
        } catch (error) {
            console.error("There was an error retrieving records:", error.message);
        }
    };

    const handleNewTiresRecord = async () => {
        try {
            if (!date || !odometer || !notes) {
                console.error("Please complete all fields");
                return;
            }

            const newTiresRecord = {
                odometer: parseInt(odometer),
                date,
                notes,
            };

            await axios.post(TIRES_URL, newTiresRecord);

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
        <div className="newRecord">
            <h2 className="text-center">Create New Tire Record</h2>
            <form>
                <div className="row gx-5">
                    <div className="col mb-3">
                        <label>Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="form-control" />
                    </div>
                    <div className="col mb-3">
                        <label>Odometer:</label>
                        <input
                            type="text"
                            value={odometer}
                            onChange={(e) => setOdometer(e.target.value)}
                            placeholder="enter mileage"
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="col mb-3">
                    <label>Notes:</label>
                    <textarea
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="enter details about tires; replacement, rotation, etc"
                        className="form-control"
                        rows={3} />
                </div>
                <div className="col mb-3 text-center">
                    <button className="btn btn-primary"
                        onClick={handleNewTiresRecord}>Create New Record</button>
                </div>
            </form>
        </div>
    );;
};

export default NewTiresRecord;