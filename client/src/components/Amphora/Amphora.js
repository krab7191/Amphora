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
            songs: []
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
            console.log(resp.data.stations);
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
            console.log(resp);
            // resp.data.songs.forEach(song => {
            //     this.setState({
            //         songs: [...this.state.songs, song]
            //     })
            // })
            this.setState({
                songs: [...this.state.songs.concat(resp.data.songs)]
            })
        }).catch(err => {
            console.log(`Error getting songs: ${err}`);
        });
    }

    render() {

        console.log(this.state.songs);

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
                <Footer songs={this.props.songs} />
            </React.Fragment>
        );
    }
};

export default Amphora;