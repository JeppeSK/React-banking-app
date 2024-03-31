import React, { useState } from 'react';

const SignupForm = () => {

  const [formData, setFormData] = useState({
    username: '',
    lastname: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send formData to backend API for signup process
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      // Handle response accordingly
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
          <input className="input-box-modal" type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
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