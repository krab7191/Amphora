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
            volumeIcon: "volume-down",
            volume: 50
        };
    };

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
                    <div className="controlBox" onClick={this.props.playPause}>
                        <Glyphicon glyph={this.props.playing} />
                    </div>
                    <div className="controlBox">
                        <Glyphicon glyph="fast-forward" onClick={this.props.nextSong} />
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