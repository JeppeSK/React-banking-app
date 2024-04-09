import React, { useState, useEffect } from 'react'; // Don't forget to import useEffect
import Account_Panel from './../components/Account_Panel/Account_Panel.js';
import './../styles/Register_Card.css';

function Register_Card() {

  const [creditCardDetails, setCreditCardDetails] = useState({
    serialNumber: '',
    cvv: '',
    expiryDate: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreditCardDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Construct the form data to send, including the fetched registrationNumber and accountNumber
      const token = localStorage.getItem('token');

      const formData = {
        serialNumber: creditCardDetails.serialNumber,
        cvv: creditCardDetails.cvv,
        expiryDate: creditCardDetails.expiryDate,
      };
  
      const response = await fetch('http://localhost:3001/api/account/creditcard_attachment', {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Handle a successful registration
        console.log('Credit card registration successful');
      } else {
        // Handle errors if the server response wasn't ok
        const errorText = await response.text();  // Assuming the server sends a textual error message
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }
    } catch (error) {
      console.error('Error during credit card registration:', error);
    }
  };

  return (
    <>
      <Account_Panel />
      <div className='Register_Card_Form'>
        <form onSubmit={handleSubmit}>
          {/* Remove the input fields for registrationNumber and accountNumber */}
          <input
            type="text"
            name="serialNumber"
            value={creditCardDetails.serialNumber}
            onChange={handleChange}
            placeholder="Serial Number"
            required
          />
          <input
            type="text"
            name="cvv"
            value={creditCardDetails.cvv}
            onChange={handleChange}
            placeholder="CVV"
            required
          />
          <input
            type="date"
            name="expiryDate"
            value={creditCardDetails.expiryDate}
            onChange={handleChange}
            required
          />
          <button type="submit">Register Credit Card</button>
        </form>
      </div>
    </>
  );
}

export default Register_Card;