import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/SettingsPage.css';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session data (e.g., from localStorage)
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>
        <div className="user-info">
          <p>{localStorage.getItem('userEmail')}</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingsPage; 