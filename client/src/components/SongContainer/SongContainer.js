import React from 'react';
import Row from "../Row";

import './SongContainer.css';

const SongContainer = props => {


    return (
        <div id="song-container" className="container">
            {
                props.songs.map((song, i) => (
                    i === 0 && <Row {...song} key={i} class="playing" />
                ))
            }
            {
                props.songs.map((song, i) => (
                    i !== 0 && <Row {...song} key={i} />
                ))
            }
        </div>
    );

};

export default SongContainer;