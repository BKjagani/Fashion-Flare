import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const AdminNavbar = ({ userName, userImage }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/admin">Admin Dashboard</Link>
        <div className="navbar-nav ms-auto">
          <div className="profile">
            <img src={userImage} alt="Profile" />
            <span>{userName}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
