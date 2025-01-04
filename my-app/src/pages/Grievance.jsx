import React, { useState } from 'react';
import '../style/grievance.css'; 

const GrievancePage = () => {
    const [newGrievance, setNewGrievance] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmitGrievance = (e) => {
        e.preventDefault();
        if (newGrievance.trim()) {
            setSubmitted(true);  
            setNewGrievance('');  
        }
    };

    return (
        <div className="grievance-page">
            <h2>Submit Your Grievance</h2>

            <div className="grievance-form">
                <form onSubmit={handleSubmitGrievance}>
                    <textarea
                        placeholder="Describe your grievance..."
                        value={newGrievance}
                        onChange={(e) => setNewGrievance(e.target.value)}
                        required
                    />
                    <button type="submit" className="submit-btn">Submit Grievance</button>
                </form>
            </div>

            {submitted && (
                <div className="submission-success">
                    <p>Your grievance has been submitted successfully!</p>
                    <p>Our team will contact you shortly.</p>
                </div>
            )}

            {/* Contact Information */}
            <div className="contact-info">
                <h3>Contact Details</h3>
                <p>If you have any concerns, feel free to reach us:</p>
                <p>Email: <a href="mailto:grievance@example.com">grievance@example.com</a></p>
                <p>Phone: <a href="tel:+1234567890">+1 234-567-890</a></p>
            </div>
        </div>
    );
};

export default GrievancePage;
