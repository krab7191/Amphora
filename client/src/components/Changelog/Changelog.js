import React, { Component } from 'react';
import './Changelog.css';
import Form from "react-bootstrap/Form";
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';

class Changelog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: [
                {
                    version: '0.43',
                    changes: [
                        "Changelog added. Upon every new release, changelog will show unless user specifies to never show changelog again."
                    ]
                }
            ]
        };
    };

    render() {
        return (
            <div id="changelog-container">
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
                        <Form.Label htmlFor='showChangelog'>Show Changelog?</Form.Label>
                        <FormControl
                            type="checkbox"
                            id="showChangelog"
                            onChange={this.props.changelogHandler}
                        ></FormControl>
                    </FormGroup>
                </Form>
            </div >
        )
    }
};

export default Changelog;