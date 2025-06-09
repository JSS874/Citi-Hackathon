import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import '../styles/SignupPage.css';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join us today</p>
        <SignupForm />
        <div className="login-link">
          <p>Already have an account? 
            <span onClick={handleLoginRedirect} className="link-text">
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 