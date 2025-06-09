import React from 'react';
import '../../styles/LoginPage.css';

const LoginForm: React.FC = () => {
  return (
    <form className="login-form">
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
