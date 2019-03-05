import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MenuItem from 'react-bootstrap/DropdownMenu';

import './Header.css';
const FontAwesome = require('react-fontawesome');

class Header extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        if (this.props.stations.length === 0) {
            this.props.getStations();
        }
    }

    render() {

        return (
            <Navbar fixedtop="true" collapseOnSelect className="main-navbar">
                <Navbar.Brand>
                    <img alt="Amphora logo" className="logo pull-left" />
                </Navbar.Brand>
                <Navbar.Toggle />
                <h1 className="pull-left white-text margin-left-10">Amphora</h1>
                <Navbar.Collapse>
                    <Nav pullright="true">
                        <NavItem>
                            <FontAwesome name='cog' />
                            <p className="inline padding-left-10 white-text">Settings</p>
                        </NavItem>
                        <NavDropdown eventkey={1} title={this.props.currStation} id="station-dropdown">
                            {
                                this.props.stations.map((station, i) => (
                                    <MenuItem
                                        eventkey={`1.${i}`}
                                        key={i}
                                        name={station}
                                        onClick={this.props.changeStation}
                                    >
                                        {station}
                                    </MenuItem>
                                ))
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );

    }

}

export default Header;