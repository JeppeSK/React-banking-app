import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import logo from '../../images/Ezy_Banking_Logo.png'
import SignupForm from './../../components/UserForms/SignupForm/SignUpForm';
import LoginForm from './../../components/UserForms/LoginForm/LoginForm'; 
import Modal from './../../components/UserForms/Modal/Modal'; 
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [name, setName] = useState('');

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setName(decoded.name);
    }
  };

  const handleRegisterSuccess = () => {
    setShowSignupModal(false);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setName('');
  };

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
        <img src={logo} alt="Ezy Banking logo" className="logo-img" />
      </Link>

      {name ? (
        <div
        className="dropdown-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FontAwesomeIcon icon={faCircleUser} className="faCircleUserDropDown" />
        {showDropdown && (
          <div className="dropdown-content">
            <Link to="/Account">Account</Link>
            <Link to="#" onClick={handleLogout}>Logout</Link>
          </div>
        )}
      </div>
      ) : (
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
      )}

      <Modal isOpen={showSignupModal} onClose={handleCloseSignupModal}>
        <SignupForm onRegisterSuccess={handleRegisterSuccess} />
      </Modal>

      <Modal isOpen={showLoginModal} onClose={handleCloseLoginModal}>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </Modal>
    </nav>
  );
};

export default Navbar;