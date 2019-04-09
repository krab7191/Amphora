import React, { Component } from "react";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import "./Footer.css";

const FontAwesome = require("react-fontawesome");
const TooltipSlider = createSliderWithTooltip(Slider);

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volumeIcon: "volume-down",
      volume: 50
    };
  }

  volumeHandler = e => {
    if (e === 0) {
      this.setState({
        volumeIcon: "volume-mute"
      });
    } else if (e >= 60) {
      this.setState({
        volumeIcon: "volume-up"
      });
    } else {
      this.setState({
        volumeIcon: "volume-down"
      });
    }
  };

  componentDidMount() {
    console.log("Footer mounted");
    document.onkeyup = e => {
      switch (e.key) {
        case " ":
          console.log("space!");
          break;
        case "ArrowUp":
          let v = this.state.volume + 10;
          if (v > 100) {
            v = 100;
          }
          this.setState({
            volume: v
          });
          break;
        case "ArrowDown":
          let v = this.state.volume - 10;
          if (v < 0) {
            v = 0;
          }
          this.setState({
            volume: v
          });
          break;
        case "ArrowRight":
          console.log("right");
          break;
        default:
          break;
      }
    };
  }

  render() {
    console.log(this.props.playing);

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
            <FontAwesome name={this.state.volumeIcon} size="2x" />
          </div>
          <div id="volume-slider">
            <TooltipSlider
              defaultValue={this.state.volume}
              onChange={this.volumeHandler}
              vertical={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
