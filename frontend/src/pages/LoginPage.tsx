import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Welcome</h1>
        <p className="login-subtitle">Please sign in to continue</p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
