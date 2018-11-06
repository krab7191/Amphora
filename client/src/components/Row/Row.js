import React from 'react';
import './Row.css';

class Row extends React.Component {

    formatSongLength = seconds => {
        const mins = Math.floor(seconds / 60);
        let secs = Math.floor(seconds % 60);
        if (secs.length === 1) {
            secs = '0' + secs;
        }
        return `${mins}:${secs}`;
    };

    render() {
        return (
            <div className={`row song ${this.props.class}`} >
                <div className="col-md-2">
                    <img src={this.props.art[2].url} alt={this.props.title} className="album-art" />
                </div>
                <div className="col-xs-6 container">
                    <p className="row"><strong>{this.props.title}</strong></p>
                    <p className="row">by <strong>{this.props.artist}</strong></p>
                    <p className="row">from <em>{this.props.album}</em></p>
                    <p className="row">0:00 / {this.formatSongLength(this.props.length)}</p>
                </div>
            </div >
        );
    }
};

export default Row;