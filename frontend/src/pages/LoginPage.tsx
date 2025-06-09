import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    
    navigate('/signup');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Welcome</h1>
        <p className="login-subtitle">Please sign in to continue</p>
        <LoginForm />
        <div className="signup-link">
          <p>Don't have an account? 
            <span onClick={handleSignupRedirect} className="link-text">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
