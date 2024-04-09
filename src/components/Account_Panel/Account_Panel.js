import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../../styles/Account_Panel.css';

const Account_Panel = () => {
  return (
    <nav className="Account_Panel_Navigation">
        <Link to="/Account">Economy</Link>
        <Link to="/Account/Register_Card">Register a creditcard</Link>
        <Link to="/Account/Transactions">Transactions</Link>
    </nav>
  );
};

export default Account_Panel;