import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

import SimpleHeader from '../../components/SimpleHeader';

import "./auth.css";

class LoginForm extends React.Component {

	constructor() {
		super();

		this.state = {
			username: '',
			password: '',
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
		console.log('Submit login form');
		this.props.login(this.state.username, this.state.password);
		this.setState({
			redirectTo: '/'
		});
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<>
					<SimpleHeader />
					<Form className="abs-center container width-40" >
						<FormGroup className="row">
							<p
								className="white-text"
							>Login to Pandora</p>
							<FormControl
								type="text"
								name="username"
								value={this.state.username}
								placeholder="Username"
								onChange={this.handleChange}
							/>
							<FormControl
								type="password"
								name="password"
								value={this.state.password}
								placeholder="Password"
								onChange={this.handleChange}
							/>
							<Link
								to="/signup"
								className="white-text col-md-5 pull-left"
							>Create Pandora account</Link>
							<Button
								type="submit"
								onClick={this.handleSubmit}
								className="col-md-3 pull-right"
								bsStyle="info"
							>
								Log in
						</Button>
						</FormGroup>
					</Form>
				</>
			)
		}
	}
}

export default LoginForm;
