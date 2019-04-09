import React, { Component } from "react";
import "./Changelog.css";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";

class Changelog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [
        {
          version: "0.46",
          changes: [
            "Get next 4 songs when playing next to last song",
            "Audio volume slider bugfixes",
            "Prompt user to retry on audio fetch error",
            "Add native scroll bounce to legalBox"
          ]
        },
        {
          version: "0.45",
          changes: [
            "Make up / down keys change volume",
            "Fix arrow keybindings, and other minor bugfixes"
          ]
        },
        {
          version: "0.44.02",
          changes: ["Bugfixes to displaying changeLog", "Audit dependencies"]
        },
        {
          version: "0.44.01",
          changes: ["Prevent page scroll on spacebar keydown"]
        },
        {
          version: "0.44",
          changes: [
            "Double size of audio controls",
            "Remove borders and other minor style tweaks",
            "Add audio control keybindings for desktop."
          ]
        },
        {
          version: "0.43.01",
          changes: [
            "Fix media control bug. 'Play', 'skip', and 'volume' icons are back!"
          ]
        },
        {
          version: "0.43",
          changes: [
            "Changelog added. Upon every new release, changelog will show unless user specifies to never show changelog again.",
            "Migrate to Bootstrap 4. All components were updated to reflect the changes from BS 3 to BS 4.",
            "Removed unused 'Settings' tab and corresponding gear icon"
          ]
        }
      ]
    };
  }

  render() {
    const hide = this.props.hidden;

    return (
      <div id="changelog-container" className={hide}>
        <h3 style={{ textAlign: "center" }}>Changelog</h3>
        {this.state.logs.map((entry, i) => (
          <div key={i}>
            <p>
              Version <strong>{entry.version}</strong>
            </p>
            <ul>
              {entry.changes.map((change, i) => (
                <li key={i}>{change}</li>
              ))}
            </ul>
            <hr />
          </div>
        ))}
        <Form>
          <FormGroup>
            <Form.Check
              type="checkbox"
              id="changelog-checkbox"
              label="Hide changelog for future releases"
              onChange={e => this.props.changelogHandler(e)}
            />
            <Button
              onClick={this.props.closeChangelog}
              className="justify-content-right"
              bsstyle="info"
            >
              Ok
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Changelog;
