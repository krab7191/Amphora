import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./Header.css";
// import FontAwesome from 'react-fontawesome';

class Header extends Component {

  componentDidMount() {
    if (this.props.stations.length === 0) {
      this.props.getStations();
    }
  }

  render() {
    return (
      <Navbar fixed="top" expand="sm" className="main-navbar">
        <Navbar.Brand>
          <img alt="Amphora logo" className="logo pull-left" />
        </Navbar.Brand>
        <h1 className="pull-left white-text margin-left-10">Amphora</h1>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end ml-auto">
          <Nav className="ml-auto">
            <NavDropdown
              eventkey={1}
              title={this.props.currStation}
              id="station-dropdown"
              alignRight
              className="white-text"
            >
              {this.props.stations.map((station, i) => (
                <NavDropdown.Item
                  eventkey={`1.${i}`}
                  key={i}
                  name={station}
                  onClick={this.props.changeStation}
                >
                  {station}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
