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
            currStation: "Getting stations..."
        };
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

    render() {


        return (
            <React.Fragment>
                <Header
                    getStations={this.getStations}
                    changeStation={this.changeStation}
                    stations={this.state.stations}
                    currStation={this.state.currStation}
                />
                <SongContainer songs={this.props.songs} />
                <Footer songs={this.props.songs} />
            </React.Fragment>
        );
    }
};

export default Amphora;