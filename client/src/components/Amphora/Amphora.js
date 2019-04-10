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
      volume: 0.8,
      started: false,
      volumeIcon: "volume-up"
    };
  }

  componentDidUpdate() {
    if (this.state.songs.length === 0 && this.state.stations.length !== 0) {
      this.getSongs(this.state.currStation);
    }
  }

  componentDidMount() {
    document.onkeydown = e => {
      if (e.key === " " || e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    };
    document.onkeyup = e => {
      switch (e.key) {
        case " ":
          this.playPause();
          break;
        case "ArrowUp":
          this.triggerShowVolumeSlider();
          let vup = Math.round((this.state.volume + 0.1) * 100) / 100;
          if (vup > 1) {
            vup = 1;
          }
          this.volumeHandler(vup);
          break;
        case "ArrowDown":
          this.triggerShowVolumeSlider();
          let v = Math.round((this.state.volume - 0.1) * 100) / 100;
          if (v < 0) {
            v = 0;
          }
          this.volumeHandler(v);
          break;
        case "ArrowRight":
          this.nextSong();
          break;
        default:
          break;
      }
    };
  }

  triggerShowVolumeSlider = () => {
    if (window.TO) {
      clearTimeout(window.TO);
    }
    const volSlider = document.getElementById("volume-slider");
    volSlider.style.display = "block";
    window.TO = setTimeout(() => {
      volSlider.style.display = "none";
    }, 1800);
  };

  changeStation = event => {
    const { name } = event.target;
    if (this.state.currStation === name) {
      return;
    } else {
      this.playPause();
      this.setState({
        currStation: name,
        currSong: null,
        songs: []
      });
    }
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
          const conf = window.confirm("Error getting songs, retry?");
          if (conf) {
            this.getSongs(this.state.currStation);
          }
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
        if (i === this.state.songs.length - 3) {
          // Get new songs at second to last index
          this.getSongs(this.state.currStation);
        }
        if (i < this.state.songs.length - 1) {
          this.setState({
            currSong: this.state.songs[i + 1]
          });
        } else {
          console.warn(`Wait to get new songs before skipping again!`);
          return;
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

  volumeHandler = e => {
    this.setState({ volume: e });
    if (e === 0) {
      this.setState(
        {
          volumeIcon: "volume-mute",
          playing: "pause"
        },
        () => {
          this.playPause();
        }
      );
    } else if (e >= 0.75) {
      this.setState({
        volumeIcon: "volume-up"
      });
    } else {
      this.setState({
        volumeIcon: "volume-down"
      });
    }
  };

  audioError = e => {
    const { target } = e;
    const { error } = target;
    console.log("Audio error: ");
    console.warn(e.type);
    console.error({ error });
    console.log(`Audio state: ${e.target.remote.state}`);
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
          volumeHandler={this.volumeHandler}
          volumeIcon={this.state.volumeIcon}
          volume={this.state.volume}
        />
        <ReactAudioPlayer
          ref={elem => {
            this.rap = elem;
          }}
          src={this.state.currSong ? this.state.currSong.audioURL : null}
          onCanPlay={this.readyToPlay}
          onEnded={this.nextSong}
          onPause={() => {
            this.setState({ playing: "pause" });
          }}
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
