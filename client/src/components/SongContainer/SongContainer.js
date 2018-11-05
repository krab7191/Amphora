import React from 'react';
import Row from "../Row";

import './SongContainer.css';

class SongContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlaying: ""
        };
    }


    componentDidMount() {
        console.log("SongContainer mounted");
        console.log(`Songs: ${this.props.songs}`);
    }

    render() {
        console.log(this.props.songs);

        return (
            <div id="song-container" className="container" >
                {
                    this.props.songs.map((song, i) => (
                        <Row
                            {...song}
                            key={i}
                            className={song.name === this.state.currentPlaying ? "playing" : ''}
                        />
                    ))
                }
            </div >
        );
    }

};

export default SongContainer;