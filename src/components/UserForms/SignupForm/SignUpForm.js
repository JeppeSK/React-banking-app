import React, { useState } from 'react';

const SignupForm = ({ onRegisterSuccess }) => {

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        // If registration is successful
        onRegisterSuccess();  // Close the signup modal
        console.log('Registration successful');
      } else {
        // If there is an error with the registration
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='div-loginForm-signupForm'>
        <h1>Register</h1>
        <div className='input-box-div'>
          <input className="input-box-modal" type="text" placeholder="firstname" name="firstname" value={formData.firstname} onChange={handleChange} />
          <input className="input-box-modal" type="text" placeholder="Lastname" name="lastname" value={formData.lastname} onChange={handleChange} />
        </div>
        <input className="input-box-modal" type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
        <input className="input-box-modal" type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
        <div className="button-register">
          <button className="button-modal" type="submit">Register</button>
          <div className="register-text">
            Already have an account? <a href="#">Login</a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;