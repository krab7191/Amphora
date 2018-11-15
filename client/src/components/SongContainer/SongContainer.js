import React from 'react';
import Row from "../Row";

import './SongContainer.css';

class SongContainer extends React.Component {

    componentDidMount() {
        console.log("SongContainer mounted");
    }

    render() {

        return (
            <div id="song-container" className="container" >
                {
                    this.props.songs.map((song, i) => (
                        <Row
                            {...song}
                            key={i}
                            isPlay={i === this.props.curr ? 'playing' : ''}
                        />
                    ))
                }
            </div >
        );
    }

};

export default SongContainer;