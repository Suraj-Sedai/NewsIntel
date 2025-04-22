// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate        = useNavigate();

  const handleLogout = () => {
    logout();              // clears token + state
    navigate('/login');    // send you to login screen
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="News Intel Logo" />
      </div>
      <ul className="navbar-links">
        {/* ... your other links ... */}
        <li>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
