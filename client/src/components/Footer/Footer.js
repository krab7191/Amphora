import React, { Component } from "react";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import "./Footer.css";

const FontAwesome = require("react-fontawesome");
const TooltipSlider = createSliderWithTooltip(Slider);

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer">
        <div className="hCenter">
          <div className="controlBox" onClick={this.props.playPause}>
            <FontAwesome
              name={this.props.playing}
              onClick={this.props.playPause}
              size="2x"
            />
          </div>
          <div className="controlBox" onClick={this.props.nextSong}>
            <FontAwesome
              name="step-forward"
              onClick={this.props.nextSong}
              size="2x"
            />
          </div>
          <div className="controlBox" id="volume-button">
            <FontAwesome name={this.props.volumeIcon} size="2x" />
          </div>
          <div id="volume-slider">
            <TooltipSlider
              defaultValue={this.props.volume * 100}
              onChange={e => this.props.volumeHandler(e/100)}
              vertical={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
