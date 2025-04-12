import React from 'react';
import FilterDesktop from './filterDesktop/filterDesktop.jsx'
import FilterMobile from './filterMobile/filterMobile.jsx'

const Filter = () => {
    return (
        <>
            <FilterDesktop></FilterDesktop>
            <FilterMobile></FilterMobile>
        </>
    );
};

export default Filter;