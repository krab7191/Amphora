import React, { Component } from 'react';
import './Changelog.css';
import Form from "react-bootstrap/Form";
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';

class Changelog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: [
                {
                    version: '0.43',
                    changes: [
                        "Changelog added. Upon every new release, changelog will show unless user specifies to never show changelog again.",
                        "Migrate to Bootstrap 4. All components were updated to reflect the changes from BS 3 to BS 4.",
                        "Removed unused 'Settings' tab and corresponding gear icon"
                    ]
                }
            ]
        };
    };

    render() {
        const hide = this.props.hidden;

        return (
            <div id="changelog-container" className={hide}>
                <h3 style={{ textAlign: 'center' }}>Changelog</h3>
                {this.state.logs.map((entry, i) => (
                    <div key={i} >
                        <p>Version <strong>{entry.version}</strong></p>
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
                        >Ok</Button>
                    </FormGroup>
                </Form>
            </div >
        )
    }
};

export default Changelog;