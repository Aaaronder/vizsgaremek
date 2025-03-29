import React from 'react';
import { Link } from 'react-router-dom';
import './songBox.css'

const songBox = () => {
    return (
        <div className="box">
            <div className="left">
            <img src="../src/assets/images/placeholder.png" alt="" />
            </div>
            <div className="right">
                <h3>Sunshine Baby</h3>
                <p className='artistAlbum'>King Von - chigbugnus</p>
                <p className='uploader'>@johndoe1974</p>
            </div>
        </div>
    );
};

export default songBox;