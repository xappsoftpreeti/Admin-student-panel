import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/StudentProfile.css';

const StudentProfile = () => {
    const [students, setStudents] = useState([]); // Store all students
    const [searchQuery, setSearchQuery] = useState(''); // Track the search query
    const [filteredStudents, setFilteredStudents] = useState([]); // Store filtered results
    const navigate = useNavigate();

    // Fetch all students from the backend API
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/students');
                setStudents(response.data); // Save all students
                setFilteredStudents(response.data); // Initially display all students
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    // Handle search input change
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter students based on search query
        if (query) {
            const filtered = students.filter(
                (student) =>
                    student.name.toLowerCase().includes(query) ||
                    student.examRollNo.toString().includes(query) ||
                    student.collegeRollNo.toString().includes(query) ||
                    student.email.toLowerCase().includes(query) // Fixed: Added email condition here
            );
            setFilteredStudents(filtered);
        } else {
            setFilteredStudents(students); // Show all students if the query is empty
        }
    };

    // Navigate to the dashboard
    const handleBackClick = () => {
        navigate('/dashboard');
    };

    return (
        <div className="container">
            {/* Heading Section */}
            <div className="heading-section">
                <h2 className="form-title">Student Profiles</h2>
            </div>

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Name, Exam Roll No, or College Roll No"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {/* Student List Table */}
            <div className="student-list-container">
                {filteredStudents.length > 0 ? (
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Exam Roll No</th>
                                <th>College Roll No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Honours</th>
                                <th>CC</th>
                                <th>GE-1</th>
                                <th>GE-2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr key={student._id}>
                                    <td>{student.examRollNo}</td>
                                    <td>{student.collegeRollNo}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.honours}</td>
                                    <td>{student.cc}</td>
                                    <td>{student.ge1}</td>
                                    <td>{student.ge2}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-students">No students found.</p>
                )}
            </div>

            {/* Back Button */}
            <button className="back-button" onClick={handleBackClick}>
                Back to Dashboard
            </button>
        </div>
    );
};

export default StudentProfile;
