import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../style/resultupload.css';

const PublishResultForm = () => {
    const [studentName, setStudentName] = useState('');
    const [examRollNo, setExamRollNo] = useState('');
    const [collegeRollNo, setCollegeRollNo] = useState('');
    const [honours, setHonours] = useState('');
    const [cc, setCc] = useState('');
    const [ge1, setGe1] = useState('');
    const [ge2, setGe2] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare data to be sent to the server
        const resultData = {
            studentName,
            examRollNo,
            collegeRollNo,
            marks: {
                honours,
                cc,
                ge1,
                ge2
            }
        };

        try {
            const response = await axios.post('http://localhost:5000/api/results/publish', resultData);
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error publishing result:', error);
            setMessage('Failed to publish result');
        }
    };

    const handleViewProfile = () => {
        navigate('/Result-view'); // Navigate to the result view page
    };

    return (
        <div className="publish-result-container">
            <h2 className="form-heading">Publish Result</h2>
            <form onSubmit={handleSubmit} className="result-form">
                <div className="form-group">
                    <label className="form-label">Student Name:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Exam Roll No:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={examRollNo}
                        onChange={(e) => setExamRollNo(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">College Roll No:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={collegeRollNo}
                        onChange={(e) => setCollegeRollNo(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Honours Marks:</label>
                    <input
                        type="number"
                        className="form-input"
                        value={honours}
                        onChange={(e) => setHonours(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">CC Marks:</label>
                    <input
                        type="number"
                        className="form-input"
                        value={cc}
                        onChange={(e) => setCc(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">GE1 Marks:</label>
                    <input
                        type="number"
                        className="form-input"
                        value={ge1}
                        onChange={(e) => setGe1(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">GE2 Marks:</label>
                    <input
                        type="number"
                        className="form-input"
                        value={ge2}
                        onChange={(e) => setGe2(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">Publish Result</button>
            </form>
            <button onClick={handleViewProfile} className="view-profile-button">
                View Profile
            </button>
            {message && <p className="form-message">{message}</p>}
        </div>
    );
};

export default PublishResultForm;



