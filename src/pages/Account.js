import React, { useState, useEffect } from 'react';
import creditcard from '../images/Creditcard.png';
import './../styles/Account.css';

function Account() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/account/balance', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
    
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
    
        // Ensure the response is in JSON format
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.warn("Expected JSON response, but received:", contentType);
          throw new TypeError("Oops, we haven't got JSON!");
        }
    
        const data = await response.json();
        setBalance(data.balance);
      } catch (error) {
        console.error('There was a problem fetching the account balance:', error);
        setBalance('Unavailable');
      }
    };

    fetchBalance();
  }, []); // The empty array as a second argument means this effect will only run once, when the component mounts.

  return (
    <div className='Account_information_div'>
      <div>
        <h1>Account</h1>
        <img className='Creditcard_account_information' src={creditcard} alt="Credit Card" />
        {/* Display the balance below the credit card image */}
        <div className='Balance_information'>
          Balance: {balance !== null ? `$${balance}` : 'Loading...'}
        </div>
      </div>
    </div>
  );
}

export default Account;