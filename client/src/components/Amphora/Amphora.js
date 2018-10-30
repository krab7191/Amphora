import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import SongContainer from '../SongContainer';

import './Amphora.css';

const Amphora = props => {


    return (
        <div>
            <Header />
            <SongContainer songs={props.songs} />
            <Footer songs={props.songs} />
        </div>
    )
};

export default Amphora;