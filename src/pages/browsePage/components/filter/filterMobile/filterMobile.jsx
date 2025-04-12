import React from 'react';
import { Link } from 'react-router-dom';
import './filterMobile.css';
import FilterPopup from './filterPopup/filterPopup.jsx'

const FilterMobile = () => {
    return (
        <button className="filterButton">
            <img src="./src/assets/images/Filter.png" alt="" className='filterImage' />
            <FilterPopup></FilterPopup>
        </button>
    );
};

export default FilterMobile;