import React from 'react';
import './Row.css';

class Row extends React.Component {

    formatSongLength = seconds => {
        const mins = Math.floor(seconds / 60);
        let secs = Math.floor(seconds % 60);
        // If less than 10, prepend 0
        if (secs[0] === 0) {
            secs = '0' + secs;
        }
        // If divisible by 10, append 0
        else if (secs[1] === 0) {
            secs = secs + '0';
        }
        return `${mins}:${secs}`;
    };

    render() {
        return (
            <div className={`row song ${this.props.isPlay}`} >
                <div className="col-xs-2">
                    <img src={this.props.art && this.props.art[2].url} alt={this.props.title} className="album-art" />
                </div>
                <div className="col-xs-6 container">
                    <p className="row"><strong>{this.props.title || "Getting songs..."}</strong></p>
                    <p className="row">by <strong>{this.props.artist}</strong></p>
                    <p className="row">from <em>{this.props.album}</em></p>
                    {
                        this.props.isPlaying && <p className="row">0:00 / {this.formatSongLength(this.props.length)}</p>
                    }
                </div>
            </div >
        );
    }
};

export default Row;