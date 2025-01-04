import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/StudentDetails.css';

const AddStudent = () => {
    const navigate = useNavigate();
    const [examRollNo, setExamRollNo] = useState('');
    const [collegeRollNo, setCollegeRollNo] = useState('');
    const [name, setName] = useState('');
    const [honours, setHonours] = useState('');
    const [cc, setCc] = useState('');
    const [ge1, setGe1] = useState('');
    const [ge2, setGe2] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [newStudent, setNewStudent] = useState(null);

    const validateFields = () => {
        if (!examRollNo || !collegeRollNo || !name || !honours || !cc || !ge1 || !ge2) {
            setError("All fields are required.");
            setSuccess('');
            return false;
        }

        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/students/add", {
                examRollNo,
                collegeRollNo,
                name,
                honours,
                cc,
                ge1,
                ge2,
            });

            setSuccess("Student added successfully!");
            setError('');
            setExamRollNo('');
            setCollegeRollNo('');
            setName('');
            setHonours('');
            setCc('');
            setGe1('');
            setGe2('');
            setNewStudent(response.data.student);

        } catch (err) {
            if (err.response && err.response.status === 400) {
                setError(err.response.data.message || "This student is already registered.");
            } else {
                setError("Failed to add student. Please try again.");
            }
            setSuccess('');
            console.error(err);
        }
    };

    const handleViewProfile = () => {
        navigate('/Student-profile');
    };

    return (
        <div className="container">
            <div className="form-container">
                <h1 style={{
                    textAlign: 'center',
                    color: '#4CAF50',
                    fontSize: '2.5rem',
                    marginBottom: '20px'
                }}>
                    Student Registration
                </h1>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Exam Roll Number"
                        value={examRollNo}
                        onChange={(e) => setExamRollNo(e.target.value)}
                    />
                    <input
                        type="text"
                        className="input-field"
                        placeholder="College Roll Number"
                        value={collegeRollNo}
                        onChange={(e) => setCollegeRollNo(e.target.value)}
                    />
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        className="input-field"
                        placeholder="Honours"
                        value={honours}
                        onChange={(e) => setHonours(e.target.value)}
                    />
                    <input
                        type="text"
                        className="input-field"
                        placeholder="CC"
                        value={cc}
                        onChange={(e) => setCc(e.target.value)}
                    />
                    <input
                        type="text"
                        className="input-field"
                        placeholder="GE1"
                        value={ge1}
                        onChange={(e) => setGe1(e.target.value)}
                    />
                    <input
                        type="text"
                        className="input-field"
                        placeholder="GE2"
                        value={ge2}
                        onChange={(e) => setGe2(e.target.value)}
                    />
                    <button type="submit" className="submit-button">Add Student</button>
                </form>
                <button onClick={handleViewProfile} className="view-profile-button">
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default AddStudent;


