import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';
import Amphora from './components/Amphora';

class App extends React.Component {

	constructor() {
		super();

		this.state = {
			loggedIn: false,
			user: null,
			releaseVersion: "0.43",
			lastLocalVersion: null,
			showChangelog: null
		};
	}

	changelogHandler = e => {
		console.log(e.target);
		localStorage.setItem('releaseVersion', this.state.releaseVersion);
	}

	logout = (event) => {
		event.preventDefault();
		if (this.state.user.Email === "Guest") {
			this.setState({
				loggedIn: false,
				user: null
			});
		}
		else {
			AUTH.logout().then(response => {
				console.log(response.data);
				if (response.status === 200) {
					this.setState({
						loggedIn: false,
						user: null
					});
				}
				else {
					alert("error logging out");
				}
			});
		}

	}

	login = (username, password) => {
		AUTH.login(username, password).then(response => {
			if (response.status === 200 && response.data.user) {
				// console.log(response.data.user);
				// update the state
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			}
			else {
				console.log(`Authentication failed: ${response.data.message}`);
				this.triggerModal("Incorrect username or password");
			}
		});
	}

	triggerModal = text => {
		alert(text);
	}

	loginGuest = () => {
		this.setState({
			loggedIn: true,
			user: {
				Name: "Guest",
				Email: "Guest"
			}
		});
	}

	validateLength = val => {
		if (val.trim().length > 0) {
			return 'success';
		}
		else if (val.trim().length === 0) {
			return 'error';
		}
		return null;
	}

	validateEmail = email => {
		const emailRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
		const test = emailRegex.test(email);
		if (test) {
			return 'success';
		}
		else if (!test) {
			return 'error';
		}
		return null;
	}

	componentDidMount = () => {
		// Handle displaying changelog
		if (typeof (Storage) !== "undefined") {
			// Set it if it has been cleared or never set.
			if (localStorage.getItem('showChangelog') === null) {
				localStorage.setItem('showChangelog', true);
				localStorage.setItem('releaseVersion', this.state.releaseVersion);
			}
			this.setState({
				showChangelog: localStorage.getItem('showChangelog'),
				lastLocalVersion: localStorage.getItem('releaseVersion')
			});
		} else {
			console.log("No local storage support");
		}
	}

	render() {
		console.log(this.state.showChangelog, this.state.releaseVersion, this.state.lastLocalVersion);

		return (
			<div className="App">
				{/* Logged in users receive: */}
				{!this.state.loggedIn && (
					<div className="main-view">
						<Switch>
							<Route exact path="/" component={() => <Amphora user={this.state.user} />} />
							<Route component={NoMatch} />
						</Switch>
					</div>
				)}
				{/* Non-authed users receive login page */}
				{this.state.loggedIn && (
					<Route exact path="/" component={() => <LoginForm
						login={this.login}
						loginGuest={this.loginGuest}
						validateLength={this.validateLength}
						validateEmail={this.validateEmail}
						showChangelog={((this.state.showChangelog === false) || (this.state.releaseVersion === this.state.lastLocalVersion)) ? false : true}
						setReleaseVersion={this.setReleaseVersion}
						changelogHandler={this.changelogHandler}
					/>} />
				)}
			</div>
		);
	}
}

export default App;
