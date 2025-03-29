import React from 'react';
import { Link } from 'react-router-dom'; 
import './navigationBar.css'; 

const Navbar = () => {
  return (
    <div className="navigationBar">
      <div className="browseButton">
      <a href="#"><img src="./src/assets/images/Logo.png" alt="" className="browseImage" /></a>
      </div>
      <div className="plusButton">
      <a href="#"><img className='plusImage' src="./src/assets/images/Plus.png" alt="" /></a>
      </div>
      <div className="accountButton">
        <a href="#"><img src="./src/assets/images/Account.png" alt="" className="accountImage" /></a>
      </div>
    </div>
  );
};

export default Navbar;