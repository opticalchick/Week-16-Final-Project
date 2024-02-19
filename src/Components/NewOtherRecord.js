import React, { useState, useEffect } from "react";
import axios from "axios";
import { redirect, useNavigate, useNavigation } from "react-router-dom";

const NewOtherRecord = () => {
    const navigate = useNavigate();
    const [odometer, setOdometer] = useState('');
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState('');
    const OTHER_URL = 'https://65c54d6bdae2304e92e42bed.mockapi.io/Other';

    const handleNewOtherRecord = async () => {
        if (date.trim().length === 0 || odometer.trim().length === 0 || notes.trim().length === 0) {
            alert("Please complete all fields!")
        } else {
            const newRecord = {
                date,
                odometer: parseInt(odometer, 10),
                notes
            };

            await axios.post('https://65c54d6bdae2304e92e42bed.mockapi.io/Other', newRecord);
            const response = await axios.get(OTHER_URL);
            console.log(response);
            navigate("/otherRecord");
        }
    };

    return (
        <div className="newRecord">
            <h2 className="text-center">Create New Record</h2>
            <form>
                <div className="row gx-5">
                    <div className="col mb-3">
                        <label>Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="form-control"
                            required={true} />
                    </div>
                    <div className="col mb-3">
                        <label>Odometer:</label>
                        <input
                            type="text"
                            value={odometer}
                            onChange={(e) => setOdometer(e.target.value)}
                            placeholder="enter mileage"
                            className="form-control"
                            required={true} />
                    </div>
                </div>
                <div className="col mb-3">
                    <label>Notes:</label>
                    <textarea
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="enter details about replacement parts, etc"
                        className="form-control"
                        rows={3}
                        required={true} />
                </div>
                <div className="col mb-3 text-center">
                    <button className="btn btn-primary"
                        onClick={handleNewOtherRecord}>Create New Record</button>
                </div>
            </form>
        </div>
    );
};

export default NewOtherRecord;