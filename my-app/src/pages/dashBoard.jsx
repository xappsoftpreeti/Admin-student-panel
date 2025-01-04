import React, { useState, useEffect } from "react";
import "../style/Dashboard.css";

const Dashboard = () => {
    const [numberOfStudents, setNumberOfStudents] = useState(0);
    const [activeGrievances, setActiveGrievances] = useState(0);
    const [pendingResults, setPendingResults] = useState(0);
    useEffect(() => {
        const fetchStudentCount = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/');
                const data = await response.json();
                setNumberOfStudents(data.length);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        fetchStudentCount();
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Welcome to the admin panel!</p>
            <div className="stats">
                <div className="stat-item">
                    <h3>Number of Students</h3>
                    <p>{numberOfStudents}</p>
                </div>
                <div className="stat-item">
                    <h3>Active Grievances</h3>
                    <p>{activeGrievances}</p>
                </div>
                <div className="stat-item">
                    <h3>Pending Results</h3>
                    <p>{pendingResults}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
