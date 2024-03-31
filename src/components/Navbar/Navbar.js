import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import logo from '../../images/Ezy_Banking_Logo.png'
import SignupForm from './../../components/UserForms/SignupForm/SignUpForm';
import LoginForm from './../../components/UserForms/LoginForm/LoginForm'; 
import Modal from './../../components/UserForms/Modal/Modal'; 

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleSignupClick = () => {
    setShowSignupModal(true);
  };

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
  };
  
  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <nav className="navigation">
      <Link to="/" className="title-container">
        <img src={logo} alt="ezybanking logo" className="logo-img" />
      </Link>

      <Link to="/SomethingWentWrong" className="somethingwentwrong-title">
        <h1>Crash</h1>
      </Link>

      <div
        className="dropdown-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FontAwesomeIcon icon={faCircleUser} className="faCircleUserDropDown" />
        {showDropdown && (
          <div className="dropdown-content">
            <Link to="#" onClick={handleLoginClick}>Login</Link>
            <Link to="#" onClick={handleSignupClick}>Sign Up</Link>
          </div>
        )}
      </div>

      <Modal isOpen={showSignupModal} onClose={handleCloseSignupModal}>
        <SignupForm />
      </Modal>

      <Modal isOpen={showLoginModal} onClose={handleCloseLoginModal}>
        <LoginForm />
      </Modal>
    </nav>
  );
};

export default Navbar;