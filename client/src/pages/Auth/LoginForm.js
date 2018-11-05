import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

import SimpleHeader from '../../components/SimpleHeader';

import "./auth.css";

class LoginForm extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.handleChange = this.handleChange.bind(this);

		this.state = {
			email: '',
			password: '',
			redirectTo: null
		};
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		console.log('Sending login to Pandora');
		this.props.login(this.state.email, this.state.password);
		this.setState({
			redirectTo: '/'
		});
	}

	render() {
		const p = this.props;
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<>
					<SimpleHeader />
					<Form className="abs-center container width-40" >
						<p className="white-text">Login to Pandora</p>
						<FormGroup
							controlId="loginEmail"
							className="row"
							validationState={this.props.validateEmail(this.state.email)}
						>

							<FormControl
								type="text"
								name="email"
								value={this.state.email}
								placeholder="Email"
								onChange={this.handleChange}
							/>
							<FormControl.Feedback />
						</FormGroup>
						<FormGroup
							controlId="loginPassword"
							className="row"
							validationState={this.props.validateLength(this.state.password)}
						>
							<FormControl
								type="password"
								name="password"
								value={this.state.password}
								placeholder="Password"
								onChange={this.handleChange}
							/>
							<FormControl.Feedback />
						</FormGroup>
						<div className="row">
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://www.pandora.com/account/register"
								className="white-text col-md-8 pull-left"
							>Create Pandora account</a>
							<Button
								type="submit"
								onClick={this.handleSubmit}
								className="pull-right col-md-4"
								bsStyle="info"
							>
								Log in
						</Button>
						</div>
						{/* <Link
							to="/"
							onClick={this.props.loginGuest}
							className="white-text"
						>Test (proposed layout)</Link> */}
					</Form>
				</>
			)
		}
	}
}

export default LoginForm;
