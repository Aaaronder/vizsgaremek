import React, { useState } from 'react';
import './filterBar.css';

const FilterBar = () => {
  return (
    <form className="filterBar">
      <div className="searchBar">
      <input
          type="text"
          placeholder="Search by title..."
          className="search-input"
        />
      </div>
      <div className="genreDD">
        <select className="filter-select">
          <option value="">Genres</option>
        </select>
      </div>
      <div className="artistDD">
        <select className="filter-select">
          <option value="">Aritsts</option>
        </select>
      </div>
      <div className="albumDD">
        <select className="filter-select">
          <option value="">Albums</option>
        </select>
      </div>
    </form>
  );
};

export default FilterBar;