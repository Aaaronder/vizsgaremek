import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './navigationBar.css';

const Navbar = () => {
  return (
    <div className="navigationBar">

      <div className="shape"></div>

      <div className="browseButton">
        <Link to="/browse">
          <img src="./src/assets/images/Logo.png" alt="" className="browseImage" />
          <h3 className='stillA' id="browseText">Browse</h3>
        </Link>
      </div>
      <div>
        <Link to="/upload">
          <div className="plusButton">
            <img className='plusImage' src="./src/assets/images/Plus.png" alt="" />
          </div>
        </Link>
      </div>
      <div className="accountButton">
        <Link to="/account">
          <img src="./src/assets/images/Account.png" alt="" className="accountImage" />
          <h3 className='stillA' id='accountText'>Account</h3>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;