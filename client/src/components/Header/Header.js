import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import './Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stations: [
                {
                    name: "Metallica"
                },
                {
                    name: "Chips"
                }
            ]
        };
    }

    render() {

        return (
            <Navbar fixedTop className="main-navbar">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/"><img src="images/logo.png" alt="Amphora logo" className="logo pull-left" /></a>
                    </Navbar.Brand>
                    <h1 className="pull-left white-text margin-left-10">Amphora</h1>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem>
                            <Glyphicon glyph="cog" className="white-text" />
                            <p className="inline padding-left-10 white-text">Settings</p>
                        </NavItem>
                        <NavDropdown eventKey={1} title="Stations" id="station-dropdown">
                            {
                                this.state.stations.map((station, i) => (
                                    <MenuItem eventKey={`1.${i}`}>{station.name}</MenuItem>
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