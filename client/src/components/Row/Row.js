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
          <img
            // Only render the art if it exists (Image path error on Pandora's end)
            src={
              this.props.art[2].url
                ? this.props.art[2].url
                : "https://via.placeholder.com/120"
            }
            alt={this.props.title ? this.props.title : "Can't find image"}
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
          {/* {this.props.isPlaying && (
            <p className="row">
              0:00 / {this.formatSongLength(this.props.length)}
            </p>
          )} */}
        </div>
      </div>
    );
  }
}

export default Row;
