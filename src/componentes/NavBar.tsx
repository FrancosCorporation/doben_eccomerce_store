import React from 'react';
import '../css/Navbar.css';
import LogoSvg from '../assets/svg/Logo.svg';

function navbar() {
  return (
    <div className="container-navbar" >
      <h1>Do Ben</h1>
      <img src={LogoSvg} alt="Logo" className="logo" />
    </div>
  );
}

export default navbar;
