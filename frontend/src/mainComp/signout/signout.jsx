import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './signout.css'

const SignoutButton = () => {
    const navigate = useNavigate();

    const handleSignout = () => {
        // Token törlése a localStorage-ból
        localStorage.removeItem('token'); 

        // Átirányítás a /signup oldalra
        navigate('/');
    };

    return (
        <button className="signoutButton" onClick={handleSignout}>
            Sign out
        </button>
    );
};

export default SignoutButton