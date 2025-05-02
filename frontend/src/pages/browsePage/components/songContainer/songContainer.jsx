import React from 'react';
import { Link } from 'react-router-dom';
import SongBox from './songBox/songBox.jsx';
import './songContainer.css';

function SongContainer({ songs }) {

    if (!songs || songs.length === 0) {
        return (
            <div className="container">
                <div className="no-results-message">No songs found</div>
            </div>
        );
    }
    
    return (
        <div className="container">
            {songs.map((song) => (
                <SongBox key={song.songId} song={song} />
            ))}
        </div>
    );
}

export default SongContainer;