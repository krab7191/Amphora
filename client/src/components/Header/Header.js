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
                    name: "Havok"
                },
                {
                    name: "Lamb of God"
                }
            ],
            currStation: "Metallica"
        };
    }

    changeStation = event => {
        const { name } = event.target;
        this.setState({
            currStation: name
        })
    }

    render() {

        return (
            <Navbar fixedTop collapseOnSelect className="main-navbar">
                <Navbar.Header>
                    <Navbar.Brand>
                        <img alt="Amphora logo" className="logo pull-left" />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <h1 className="pull-left white-text margin-left-10">Amphora</h1>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem>
                            <Glyphicon glyph="cog" className="white-text" />
                            <p className="inline padding-left-10 white-text">Settings</p>
                        </NavItem>
                        <NavDropdown eventKey={1} title={this.state.currStation} id="station-dropdown">
                            {
                                this.state.stations.map((station, i) => (
                                    <MenuItem eventKey={`1.${i}`} key={i} name={station.name} onClick={this.changeStation}>{station.name}</MenuItem>
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