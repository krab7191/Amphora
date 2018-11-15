import React from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Slider, { createSliderWithTooltip } from 'rc-slider';

import 'rc-slider/assets/index.css';
import './Footer.css';

const TooltipSlider = createSliderWithTooltip(Slider);

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.audio = React.createRef();
        this.state = {
            playing: 'pause',
            volumeIcon: "volume-down",
            volume: 50
        };
    };

    playPause = () => {
        const val = this.state.playing;
        if (val === "pause") {
            // Song is playing...
            this.audio.current.pause();
            this.setState({
                playing: 'play'
            });
        }
        else {
            // Song is paused
            this.audio.current.play();
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
                        <Glyphicon glyph="fast-forward" onClick={this.props.songSkip} />
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
                <audio
                    onTimeUpdate={this.props.getSongTime}
                    onEnded={this.props.nextSong}
                    ref={this.audio}
                    src={this.props.song ? this.props.song.audioURL : ""}
                    id="audio-tag"
                    autoPlay
                />
            </div>
        )
    }
};

export default Footer;