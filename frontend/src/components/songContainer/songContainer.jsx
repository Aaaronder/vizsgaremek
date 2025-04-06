import React from 'react';
import { Link } from 'react-router-dom';
import SongBox from './songBox/songBox.jsx'
import './songContainer.css';

/*
<div className="container">
            <SongBox></SongBox>
        </div>
*/

function SongContainer({ songs }) {
    return (
        <div className="container">
            {songs.map((song) => (
                <SongBox key={song.id} song={song} />
            ))}
        </div>
    );
}

export default SongContainer;