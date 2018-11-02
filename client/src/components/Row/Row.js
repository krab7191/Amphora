import React from 'react';
import './Row.css';

const Row = props => {


    return (
        <div className={`row song ${props.class}`} >
            <div className="col-md-2">
                <img src={window.location.origin + props.img} alt={props.title} className="album-art" />
            </div>
            <div className="col-md-4 container">
                <p className="row"><strong>{props.title}</strong></p>
                <p className="row">by <strong>{props.artist}</strong></p>
                <p className="row">from <em>{props.album}</em></p>
                {
                    props.length && <p className="row">32kbit/s - 2:32 / {props.length}</p>
                }
            </div>
        </div >
    );
};

export default Row;