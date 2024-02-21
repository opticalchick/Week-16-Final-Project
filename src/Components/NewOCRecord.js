import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewOCRecord = () => {
    const [odometer, setOdometer] = useState('');
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    // This is the handles the onClick event to create the new record.  It sends the post
    // request and redirects the user to the list page which will show the new entry

    const handleNewOCRecord = async (e) => {
        e.preventDefault();
        // The if statement will check to make sure all fields are complete.  If not, 
        // then it sends an alert to complete all fields.
        if (date.trim().length === 0 || odometer.trim().length === 0 || notes.trim().length === 0) {
            alert("Please complete all fields!")
        } else {
            const newRecord = {
                date,
                odometer: parseInt(odometer, 10),
                notes
            };
            // This sends the new record with a post request, then navigates to previous page
            const response = await axios.post('https://65c54d6bdae2304e92e42bed.mockapi.io/OilChange', newRecord);
            console.log("Post request successful", response);
            navigate("/oilChange");
        }
    };


    //This is the form that is used to add a new record.  I used some CSS and some 
    //regular Bootstrap for styling.
    return (
        <div className="newRecord">
            <h2 className="text-center">Create New Oil Change Record</h2>
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
                        placeholder="enter details about oil, filter, etc"
                        className="form-control"
                        rows={3}
                        required={true} />
                </div>

                {/* This is the button that then sends the post request and navigates back to the OC List page */}
                <div className="col mb-3 text-center">
                    <button className="btn btn-primary"
                        onClick={handleNewOCRecord}>Create New Record</button>
                </div>
            </form>
        </div>
    );
};

export default NewOCRecord;

