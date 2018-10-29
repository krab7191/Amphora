import React from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import './Footer.css';

const Footer = props => {

    return (
        <div
            className="footer"
        >
            <div className="hCenter">
                <div className="controlBox">
                    <Glyphicon glyph="pause" />
                </div>
                <div className="controlBox">
                    <Glyphicon glyph="fast-forward" />
                </div>
                <div className="controlBox">
                    <Glyphicon glyph="volume-up" />
                </div>
            </div>
        </div>
    )
};

export default Footer;