import React from 'react';
import FilterDesktop from './filterDesktop/filterDesktop.jsx';
import FilterMobile from './filterMobile/filterMobile.jsx';

const Filter = ({ artists, albums, genres, onFilter }) => {

    return (
        <>

            <FilterMobile
                artists={artists}
                albums={albums}
                genres={genres}
                onFilter={onFilter}
            />

            <FilterDesktop
                artists={artists}
                albums={albums}
                genres={genres}
                onFilter={onFilter}
            />
        </>
    );
};

export default Filter;