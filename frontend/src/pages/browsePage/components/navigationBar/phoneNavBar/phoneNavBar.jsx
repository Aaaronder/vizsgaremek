import React from 'react';
import { Link } from 'react-router-dom'; 
import './phoneNavBar.css'; 

const Navbar = () => {
  return (
    <div className="navigationBar">
        <div className="buttonPlus">
            <img className='imagePlus' src="../src/assets/images/Plus.png" alt="" />
        </div>
        <div className="buttonBrowse">
            <a href="#"><img className='imageBrowse' src="../src/assets/images/Logo.png" alt="" /></a>
        </div>
        <div className="buttonAccount">
            <a href="#"><img className='imageAccount' src="../src/assets/images/Account.png" alt="" /></a>
        </div>
    </div>
  );
};

export default Navbar;