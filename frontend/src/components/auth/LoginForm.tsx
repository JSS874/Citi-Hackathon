import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginPage.css';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add authentication logic here
    localStorage.setItem('isAuthenticated', 'true');
    console.log("Login successful");
    navigate('/settings');
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit" className="login-button">Login</button>
    </form>
  );
};

export default LoginForm;
