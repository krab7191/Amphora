import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import SongContainer from '../SongContainer';
import API from '../../utils/API';
import ReactAudioPlayer from 'react-audio-player';

import './Amphora.css';

class Amphora extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            stations: [],
            currStation: "Getting stations...",
            songs: [],
            currSong: null,
            playing: 'play',
            volume: .5
        };
    }

    componentDidUpdate() {
        if (this.state.songs.length === 0 && this.state.stations.length !== 0) {
            this.getSongs(this.state.currStation);
        }
    }

    // componentDidMount() {
    //     console.log(this.state.user);
    // }

    changeStation = event => {
        const { name } = event.target;
        this.setState({
            currStation: name
        })
    }

    getStations = () => {
        console.log("Getting stations");
        API.getStations().then(resp => {
            this.setState({
                stations: resp.data.stations,
                currStation: resp.data.stations[0]
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    getSongs = name => {
        console.log(`Getting songs for ${name}`);
        API.getSongs(name).then(resp => {
            this.setState({
                songs: [...this.state.songs.concat(resp.data.songs)]
            }, () => {
                // Set the very first song
                if (this.state.currSong === null) {
                    this.setState({
                        currSong: this.state.songs[0]
                    });
                }
            });
            console.log("Songs received");
        }).catch(err => {
            console.log(`Error getting songs: ${err}`);
        });
    }

    getSongCurrTime = event => {
        console.log(event);
        console.log(event.timeStamp);
    }

    nextSong = () => {
        console.log("Getting next song.");
        this.setState({
            playing: 'pause'
        }, () => {
            const i = this.state.songs.indexOf(this.state.currSong);
            if (i === this.state.songs.length - 1) {
                // Get new songs...
                this.getSongs(this.state.currStation);
            }
            else {
                this.setState({
                    currSong: this.state.songs[i + 1]
                });
            }
        });
    }

    // Use to decide when to get more songs.
    isEndSongArray = () => {

    }

    readyToPlay = () => {
        console.log("Ready to play");
        this.setState({
            playing: 'pause'
        });
    }

    playPause = () => {
        const val = this.state.playing;
        if (val === "pause") {
            // Song is playing...
            this.rap.audioEl.pause();
            this.setState({
                playing: 'play'
            });
        }
        else {
            // Song is paused
            this.rap.audioEl.play();
            this.setState({
                playing: 'pause'
            });
        }
    }

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
                />
                <Footer
                    nextSong={this.nextSong}
                    playing={this.state.playing}
                    playPause={this.playPause}
                />
                <ReactAudioPlayer
                    ref={elem => { this.rap = elem; }}
                    src={this.state.currSong ? this.state.currSong.audioURL : ""}
                    onCanPlay={this.readyToPlay}
                    onEnded={this.nextSong}
                    volume={this.state.volume}
                    autoPlay
                />
                {/* <audio
                    onTimeUpdate={this.props.getSongTime}
                    onEnded={this.props.nextSong}
                    ref={this.audio}
                    src={this.props.song ? this.props.song.audioURL : ""}
                    id="audio-tag"
                    autoPlay
                /> */}
            </React.Fragment>
        );
    }
};

export default Amphora;