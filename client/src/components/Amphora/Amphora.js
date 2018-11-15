import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import SongContainer from '../SongContainer';
import API from '../../utils/API';

import './Amphora.css';

class Amphora extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            stations: [],
            currStation: "Getting stations...",
            songs: [],
            currSong: null
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

    songSkip = () => {
        console.log("Skipping to next song.");
    }

    // Use to decide when to get more songs.
    isEndSongArray = () => {

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
                    getSongTime={this.getSongCurrTime}
                    song={this.state.currSong}
                    songSkip={this.songSkip}
                />
            </React.Fragment>
        );
    }
};

export default Amphora;