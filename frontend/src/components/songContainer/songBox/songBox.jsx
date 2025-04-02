import React from 'react';
import { Link } from 'react-router-dom';
import './songBox.css'

/*
<div className="box">
            <div className="box-content">
                <div className="imageDiv"></div>
                <h3>Sunshine Baby</h3>
                <p className='artistAlbum'>King Von - chigbugnus</p>
                <p className='uploader'>@johndoe1974</p>
            </div>
</div>
*/

const songBox = () => {
    return (
        <div className='card'>
            <div className="mobileImage">
                <img src="../../../assets/images/placeholder.png" alt="" />
            </div>
            <div className="rest">
                <h3 className='songName'>Sunshine Baby</h3>
                <p className='artistAlbum'>King Von - chigbugnus</p>
                <p className='uploader'>@johndoe1974</p>
            </div>
        </div>
    );
};

export default songBox;