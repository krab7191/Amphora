import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import SongContainer from "../SongContainer";
import API from "../../utils/API";
import ReactAudioPlayer from "react-audio-player";

import "./Amphora.css";

class Amphora extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      stations: [],
      currStation: "Getting stations...",
      songs: [],
      currSong: null,
      playing: "play",
      volume: 0.5,
      started: false
    };
  }

  componentDidUpdate() {
    if (this.state.songs.length === 0 && this.state.stations.length !== 0) {
      this.getSongs(this.state.currStation);
    }
  }

  changeStation = event => {
    const { name } = event.target;
    this.playPause();
    this.setState(
      {
        currStation: name,
        currSong: null,
        songs: []
      },
      () => {
      }
    );
  };

  getStations = () => {
    API.getStations()
      .then(resp => {
        this.setState({
          stations: resp.data.stations,
          currStation: resp.data.stations[0]
        });
      })
      .catch(err => {
        console.error({ err });
      });
  };

  getSongs = name => {
    API.getSongs(name)
      .then(resp => {
        if (resp.data.error) {
          this.getSongs(this.state.currStation);
        } else {
          this.setState(
            {
              songs: [...this.state.songs.concat(resp.data.songs)]
            },
            () => {
              // Set the very first song
              if (this.state.currSong === null) {
                this.setState({
                  currSong: this.state.songs[0]
                });
              }
            }
          );
        }
      })
      .catch(err => {
        console.log(`Error getting songs: ${err}`);
        const retry = window.confirm("Error getting songs. Try again?");
        if (retry) {
          this.getSongs(this.state.currStation);
        }
      });
  };

  getSongCurrTime = event => {
    console.log(event.timeStamp);
  };

  nextSong = () => {
    this.setState(
      {
        playing: "pause"
      },
      () => {
        const i = this.state.songs.findIndex(song => {
          return song.title === this.state.currSong.title;
        });
        if (i === this.state.songs.length - 2) {
          // Get new songs...
          this.getSongs(this.state.currStation);
          this.setState({
            currSong: this.state.songs[i + 1]
          });
        } else {
          this.setState({
            currSong: this.state.songs[i + 1]
          });
        }
      }
    );
  };

  readyToPlay = () => {
    this.setState({
      playing: "pause"
    });
  };

  playPause = () => {
    const val = this.state.playing;
    if (val === "pause") {
      // Song is playing...
      this.rap.audioEl.pause();
      this.setState({
        playing: "play"
      });
    } else {
      // Song is paused
      this.rap.audioEl
        .play()
        .then(() => {
          this.setState({
            playing: "pause"
          });
        })
        .catch(err => {
          console.log(`${err} : .play() method failed.`);
        });
    }
  };

  audioError = e => {
    console.info("Audio error: ");
    console.error(e);
  };

  render() {
    return (
      <React.Fragment>
        <Header
          getStations={this.getStations}
          changeStation={this.changeStation}
          stations={this.state.stations}
          currStation={this.state.currStation}
        />
        <SongContainer
          songs={this.state.songs}
          curr={this.state.songs.indexOf(this.state.currSong)}
        />
        <Footer
          nextSong={this.nextSong}
          playing={this.state.playing}
          playPause={this.playPause}
        />
        <ReactAudioPlayer
          ref={elem => {
            this.rap = elem;
          }}
          src={this.state.currSong ? this.state.currSong.audioURL : ""}
          onCanPlay={this.readyToPlay}
          onEnded={this.nextSong}
          onError={this.audioError}
          volume={this.state.volume}
          autoPlay
        />
        <div id="version-tag">v{this.props.releaseVersion}</div>
      </React.Fragment>
    );
  }
}

export default Amphora;
