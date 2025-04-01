import React from 'react';
import { Link } from 'react-router-dom';
import SongBox from './songBox/songBox.jsx'
import './songContainer.css';

const songContainer = () => {
    return (
        <div className="container">
            <SongBox></SongBox>
            <SongBox></SongBox>
            <SongBox></SongBox>
            <SongBox></SongBox>
            <SongBox></SongBox>
            <SongBox></SongBox>
            <SongBox></SongBox>
            <SongBox></SongBox>
            <SongBox></SongBox>
            <SongBox></SongBox>
        </div>
    );
};

export default songContainer;