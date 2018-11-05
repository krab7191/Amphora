import React from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Slider, { createSliderWithTooltip } from 'rc-slider';

import 'rc-slider/assets/index.css';
import './Footer.css';

const TooltipSlider = createSliderWithTooltip(Slider);

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currSong: null,
            playing: 'pause',
            volumeIcon: "volume-down",
            volume: 50
        };
    };

    componentDidMount() {
        // this.setState({
        //     currSong: this.props.songs[0]
        // });
    };

    playPause = () => {
        const val = this.state.playing;
        if (val === "pause") {
            this.setState({
                playing: 'play'
            });
        }
        else {
            this.setState({
                playing: 'pause'
            });
        }
    }

    volumeHandler = e => {
        if (e === 0) {
            this.setState({
                volumeIcon: 'volume-off'
            });
        }
        else if (e >= 60) {
            this.setState({
                volumeIcon: 'volume-up'
            });
        }
        else {
            this.setState({
                volumeIcon: 'volume-down'
            });
        }
    }

    render() {
        return (
            <div
                className="footer"
            >
                <div className="hCenter">
                    <div className="controlBox" onClick={this.playPause}>
                        <Glyphicon glyph={this.state.playing} />
                    </div>
                    <div className="controlBox">
                        <Glyphicon glyph="fast-forward" />
                    </div>
                    <div className="controlBox" id="volume-button">
                        <Glyphicon glyph={this.state.volumeIcon} />
                    </div>
                    <div id="volume-slider" >
                        <TooltipSlider
                            defaultValue={this.state.volume}
                            onChange={this.volumeHandler}
                            vertical={true}
                        />
                    </div>
                </div>
            </div>
        )
    }
};

export default Footer;