import React from 'react';
import { Link } from 'react-router-dom';
import './filterPopup.css'

const FilterPopup = () => {
    return (
        <div className='modal'>
            <button className='x'>X</button>

            <form className="restFilter">
                <div className="genresDDmobile">
                    <label className='ddLabel'>Genres:</label>
                    <select className='dd' id="genres" name="genres">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="fiat">Fiat</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div className="artistsDDmobile">
                <label className='ddLabel'>Artists:</label>
                    <select className='dd' id="genres" name="genres">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="fiat">Fiat</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div className="albumsDDmobile">
                <label className='ddLabel'>Albums:</label>
                    <select className='dd' id="genres" name="genres">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="fiat">Fiat</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <input className='submitButton' type="submit"/>
            </form>
        </div>
    );
};

export default FilterPopup;