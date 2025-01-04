import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/admitcard.css';

function AdmitCardPage() {
    const studentName = "John Doe";
    const rollNumber = "CS20231001";
    const department = "Computer Science";
    const semester = "5";
    const examDate = "2024-12-01";
    const examTime = "9:00 AM";
    const examVenue = "Main Auditorium, Revensha University";

    const navigate = useNavigate();

    const handleDownload = () => {
        alert("Admit Card downloaded!");
    };

    return (
        <div className="admit-card-page">
            <div className="admit-card">
                <h2>Admit Card</h2>
                <p><strong>Student Name:</strong> {studentName}</p>
                <p><strong>Roll Number:</strong> {rollNumber}</p>
                <p><strong>Department:</strong> {department}</p>
                <p><strong>Semester:</strong> {semester}</p>

                <div className="exam-details">
                    <p><strong>Exam Date:</strong> {examDate}</p>
                    <p><strong>Exam Time:</strong> {examTime}</p>
                    <p><strong>Exam Venue:</strong> {examVenue}</p>
                </div>

                <div className="action-buttons">
                    <button className="download-btn" onClick={handleDownload}>
                        Download Admit Card
                    </button>
                    <button className="back-btn" onClick={() => navigate('/')}>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdmitCardPage;
