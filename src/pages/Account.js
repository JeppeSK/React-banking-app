import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import creditcard from '../images/Creditcard.png';
import './../styles/Account.css';
import Account_Panel from './../components/Account_Panel/Account_Panel.js'
import useFetchCreditInformation from '../Functions/DB_FETCH/fetchCreditCardInformation.js';


function Account() {
  const [balance, setBalance] = useState(null);
  const [registrationNumber, setRegistrationNumber] = useState(null);
  const [accountNumber, setAccountNumber] = useState(null);
  const { expiryDate, serialNumber, CVV } = useFetchCreditInformation();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/account/accountdetails', {
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
        setRegistrationNumber(data.registrationNumber);
        setAccountNumber(data.accountNumber);
      } catch (error) {
        console.error('There was a problem fetching the account balance:', error);
        setBalance('Unavailable');
      }
    };

    fetchBalance();
  }, []); // The empty array as a second argument means this effect will only run once, when the component mounts.

  return (
    <>
    <Account_Panel/>

    <div className='Account_information_div'>
      <div className='Creditcard_account_information'>
        <div className='Creditcard_datails_serialNumber'>
          { serialNumber !== null ? `${serialNumber}` : ' ' }
        </div>
        <div className='Creditcard_datails_expiryDate'>
          { expiryDate !== null ? `${expiryDate}` : ' ' }
        </div>
        <img className='Creditcard_image' src={creditcard} alt="Credit Card" />
        <div className='Account_information'>
          Reg: {registrationNumber !== null ? `${registrationNumber}` : 'Loading...'} AccountNumber: {accountNumber !== null ? `${accountNumber}` : 'Loading...'}
        </div>
        <div className='Balance_information'>
          Balance: {balance !== null ? `$${balance}` : 'Loading...'}
        </div>
      </div>

      <div className='Activity_Panel'>

      </div>
    </div>
    </>
  );
}

export default Account;