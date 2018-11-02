import React from 'react';
import './SimpleHeader.css';

const SimpleHeader = () => {
    return (
        <header>
            <div>
                <img
                    alt="Amphora logo"
                    src="/images/logo.png"
                    className="logo"
                />
                <h1 className="inline-h1">Amphora</h1>
            </div>
        </header >
    )
};

export default SimpleHeader;