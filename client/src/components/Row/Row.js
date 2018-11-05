import React from 'react';
import './Row.css';

const Row = props => {
    console.log(`Props in 'Row': `, props);


    return (
        <div className={`row song ${props.class}`} >
            <div className="col-md-2">
                <img src={props.art[2].url} alt={props.title} className="album-art" />
            </div>
            <div className="col-md-4 container">
                <p className="row"><strong>{props.title}</strong></p>
                <p className="row">by <strong>{props.artist}</strong></p>
                <p className="row">from <em>{props.album}</em></p>
                <p className="row">0:00 / {(props.length / 60).toFixed(2)}</p>
            </div>
        </div >
    );
};

export default Row;