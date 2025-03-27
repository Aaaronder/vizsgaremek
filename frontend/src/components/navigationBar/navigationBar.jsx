import React from 'react';
import { Link } from 'react-router-dom'; 
import './navigationBar.css'; 

const Navbar = () => {
  return (
    <header>
        <div className="navigationBar">
            <img className='logo' src="/public/Logo.png" alt="" />
            <a href="#">Browse</a>
            <a href="#">Upload</a>
            <img className='account' src="/public/Account.png" alt="" />
        </div>
    </header>
  );
};

export default Navbar;