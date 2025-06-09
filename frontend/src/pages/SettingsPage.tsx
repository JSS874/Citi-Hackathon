import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SettingsPage.css';

const SettingsPage: React.FC = () => {
  const userName = "John Doe"; // Placeholder for user's name
  const navigate = useNavigate();

  const handleLogout = () => {
    // For now, pseudo auth is just a value in localStorage
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>
        <div className="user-info">
          <p className="user-name">Welcome, {userName}</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingsPage; 