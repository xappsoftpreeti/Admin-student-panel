import React, { useEffect, useState } from 'react';
import '../style/adminprofile.css';  // Make sure to import the CSS file

const AdminProfilePage = () => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/profile');  // Your API route
                const data = await response.json();

                if (response.ok) {
                    setAdmin(data);  // Save the admin data to the state
                } else {
                    console.log('Error:', data.message);
                }
            } catch (error) {
                console.error('Error fetching admin profile:', error);
            }
        };

        fetchAdminProfile();
    }, []);

    if (!admin) {
        return <p>Loading...</p>;  // Show loading until data is fetched
    }

    return (
        <div className="admin-profile">
            <h2>Admin Profile</h2>
            <div className="profile-details">
                <div className="profile-item">
                    <strong>Name:</strong> <span>{admin.name}</span>
                </div>
                <div className="profile-item">
                    <strong>Email:</strong> <span>{admin.email}</span>
                </div>
                <div className="profile-item">
                    <strong>Staff ID:</strong> <span>{admin.staffId}</span>
                </div>
            </div>

            {/* Buttons Section */}
            <div className="buttons-container">
                <button className="button edit">Edit</button>
                <button className="button delete">Delete</button>
            </div>
        </div>
    );
};

export default AdminProfilePage; 
