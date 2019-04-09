import React from "react";
import "./Row.css";

class Row extends React.Component {
  formatSongLength = seconds => {
    const mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    // If less than 10, prepend 0
    if (secs[0] === 0) {
      secs = "0" + secs;
    }
    // If divisible by 10, append 0
    else if (secs[1] === 0) {
      secs = secs + "0";
    }
    return `${mins}:${secs}`;
  };

  render() {
    return (
      <div className={`row song ${this.props.isPlay}`}>
        <div>
          {/* TypeError: Cannot read property 'url' of undefined
    at t.value (Row.js:24)
    at si (react-dom.production.min.js:3418)
    at li (react-dom.production.min.js:3409)
    at hi (react-dom.production.min.js:3593)
    at Ki (react-dom.production.min.js:4600)
    at qi (react-dom.production.min.js:4620)
    at Ma (react-dom.production.min.js:5017)
    at Oa (react-dom.production.min.js:4983)
    at _a (react-dom.production.min.js:4927)
    at Qi (react-dom.production.min.js:4847)
    at Object.enqueueSetState (react-dom.production.min.js:2844)
    at t.x.setState (react.production.min.js:72)
    at Amphora.js:63 */}
          {console.log(this.props.art)}
          <img
            src={this.props.art && this.props.art[2].url}
            alt={this.props.title}
            className="album-art"
          />
        </div>
        <div className="song-details">
          <p>
            <strong>{this.props.title || "Getting songs..."}</strong>
          </p>
          <p>
            by <strong>{this.props.artist}</strong>
          </p>
          <p>
            from <em>{this.props.album}</em>
          </p>
          {this.props.isPlaying && (
            <p className="row">
              0:00 / {this.formatSongLength(this.props.length)}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Row;
