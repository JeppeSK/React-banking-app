import React from 'react';
import './../../../styles/LoginForm.css';

const LoginForm = () => {
  return (
    <form>
      <div className="div-loginForm-signupForm">
      <h1>Login</h1>
      <input className="input-box-modal" type="text" placeholder="Username" />
      <input className="input-box-modal" type="password" placeholder="Password" />

      <div className="remember-forgot">
        <label htmlFor="rememberMe" className="remember-label">
          <input type="checkbox" id="rememberMe" className="remember-checkbox" />
          Remember Me
        </label>
        <a href="#" className="forgot-password">Forgot Password?</a>
      </div>
      </div>

      <div className="button-register">
        <button className="button-modal" type="submit">Login</button>

        <div className="register-text">
          Don't have an account? <a href="#">Register</a>
        </div>
      </div>

    </form>
  );
};

export default LoginForm;