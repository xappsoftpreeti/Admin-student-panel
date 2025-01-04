import React from "react";
import { NavLink } from "react-router-dom";
import "../style/sidebar.css";

const Sidebar = () => {
    const menuItems = [
        { name: "Dashboard", path: "/" },
        { name: "AdminProfile", path: "/Adminprofile" },
        { name: "Student Result", path: "/Result-Upload" },
        { name: "Student Profile", path: "/Student-add" },
        { name: "Grievance", path: "/grievance" },
        { name: "Admit Card", path: "/admit-card" },
        { name: "Settings", path: "/settings" },
    ];
    const handleLogout = () => {
        console.log("User logged out");
    };

    return (
        <div className="sidebar">
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
                {/* Handle the logout as a button instead of a link */}
                <li>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;



