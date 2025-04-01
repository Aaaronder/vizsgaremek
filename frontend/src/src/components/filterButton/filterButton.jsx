import React from 'react';
import { Link } from 'react-router-dom';
import './filterButton.css';

const filterButton = () => {
    return (
        <button className="filterButton">
            <img src="./src/assets/images/Filter.png" alt="" className='filterImage' />
        </button>
    );
};

export default filterButton;