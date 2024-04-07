import React, {useState} from 'react';
import './../../../styles/LoginForm.css';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to update state for email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to update state for password
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to submit form
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        onLoginSuccess();
        console.log('Login Successful');
      } else {
        // Handle errors here
        console.log('Login failed', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="div-loginForm-signupForm">
        <h1>Login</h1>
        <input
          className="input-box-modal"
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="input-box-modal"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />

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