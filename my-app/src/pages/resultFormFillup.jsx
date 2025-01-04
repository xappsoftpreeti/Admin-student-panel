import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/resultpage.css';

function ResultPage() {
    const studentName = "John Doe";
    const batch = "Computer Science";
    const semester = "5";
    const marks = [
        { name: "Mathematics", marks: 85 },
        { name: "Physics", marks: 90 },
        { name: "Chemistry", marks: 88 },
        { name: "Biology", marks: 75 },
        { name: "Computer Science", marks: 95 }
    ];

    const cgpa = (marks.reduce((acc, subject) => acc + subject.marks, 0) / marks.length).toFixed(2);
    const navigate = useNavigate();
    return (
        <div className="result-page">
            <div className="result-card">
                <h2>Student Result Summary</h2>

                <div className="student-info">
                    <p><strong>Name:</strong> {studentName}</p>
                    <p><strong>Department:</strong> {batch}</p>
                    <p><strong>Semester:</strong> {semester}</p>
                </div>
                <table className="marks-table">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marks.map((subject, index) => (
                            <tr key={index}>
                                <td>{subject.name}</td>
                                <td>{subject.marks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="cgpa-section">
                    <p><strong>CGPA:</strong> {cgpa}</p>
                </div>

                <button className="back-button" onClick={() => navigate('/')}>
                    Upload New Result
                </button>
            </div>
        </div>
    );
}
export default ResultPage;


