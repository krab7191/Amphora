import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

import SimpleHeader from '../../components/SimpleHeader';


import AUTH from '../../utils/AUTH';

import "./auth.css";

class SignupForm extends Component {

  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      redirectTo: null
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // TODO - validate!
    AUTH.signup({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }).then(response => {
      console.log(response);
      if (!response.data.errmsg) {
        console.log('youre good');
        this.setState({
          redirectTo: '/'
        });
      } else {
        console.log('duplicate');
      }
    });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    }

    return (
      <>
        <SimpleHeader />
        <Form className="abs-center container width-40">
          <FormGroup className="row">
            <p
              className="white-text"
            >
              Sign up for a Pandora account
            </p>
            <FormControl
              type="text"
              name="firstName"
              value={this.state.firstName}
              placeholder="First Name"
              onChange={this.handleChange}
            />
            <FormControl
              type="text"
              name="lastName"
              value={this.state.lastName}
              placeholder="Last Name"
              onChange={this.handleChange}
            />
            <FormControl
              type="text"
              name="email"
              value={this.state.email}
              placeholder="Email"
              onChange={this.handleChange}
            />
            <FormControl
              type="password"
              name="password"
              value={this.state.password}
              placeholder="password"
              onChange={this.handleChange}
            />
            <FormControl
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              placeholder="confirm password"
              onChange={this.handleChange}
            />
            <Link
              to="/"
              className="white-text col-md-3 pull-left"
            >Login</Link>
            <Button
              type="submit"
              onClick={this.handleSubmit}
              className="col-md-3 pull-right"
              bsStyle="info"
            >Sign up</Button>
          </FormGroup>
        </Form>
      </>
    )
  }
}

export default SignupForm;
