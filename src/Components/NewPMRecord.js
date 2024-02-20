import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css';

const NewPMRecord = () => {
    const navigate = useNavigate();
    const [odometer, setOdometer] = useState('');
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState('');
    const PM_URL = 'https://65c54d6bdae2304e92e42bed.mockapi.io/PreventativeMaintenance';


    const handleNewPMRecord = async () => {
        if (date.trim().length === 0 || odometer.trim().length === 0 || notes.trim().length === 0) {
            alert("Please complete all fields!")
        } else {
            const newPMRecord = {
                odometer: parseInt(odometer),
                date,
                notes,
            };

            const response = await axios.post('https://65c54d6bdae2304e92e42bed.mockapi.io/PreventativeMaintenance', newPMRecord);
            console.log("Post request successful", response);
            navigate("/preventativeMaintenance");
        }
    };

    return (
        <div className="newRecord">
            <h2 className="text-center">Create New Preventative Maintenance Record</h2>
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
                        placeholder="enter details about preventative maintenance"
                        className="form-control"
                        rows={3} />
                </div>
                <div className="col mb-3 text-center">
                    <button className="btn btn-primary"
                        onClick={handleNewPMRecord}>Create New Record</button>
                </div>
            </form>
        </div>
    );
};

export default NewPMRecord;