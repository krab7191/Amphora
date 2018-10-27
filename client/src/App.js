import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
// import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';


class App extends React.Component {

	constructor() {
		super();

		this.state = {
			loggedIn: false,
			user: null
		};
	}

	componentDidMount() {
		AUTH.getUser().then(response => {
			console.log(response.data);
			// !! coerce falsy object value to true boolean
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	logout = (event) => {
		event.preventDefault();

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

	login = (username, password) => {
		AUTH.login(username, password).then(response => {
			console.log(response);
			if (response.status === 200) {
				// update the state
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			}
		});
	}

	render() {

		return (
			<div className="App">
			 {/* Logged in users receive: */}
				{this.state.loggedIn && (
					<div>
						{/* <Nav user={this.state.user} logout={this.logout} /> */}
						<div className="main-view">
							<Switch>
								{/* <Route exact path="/" component={() => <Books user={this.state.user} />} /> */}
								{/* <Route exact path="/books" component={() => <Books user={this.state.user} />} /> */}
								{/* <Route exact path="/books/:id" component={Detail} /> */}
								{/* <Route component={NoMatch} /> */}
							</Switch>
						</div>
					</div>
				)}
				{/* Non-authed users receive login / sign up pages */}
				{!this.state.loggedIn && (
					<div className="auth-wrapper" >
						<Route exact path="/" component={() => <LoginForm login={this.login} />} />
						<Route exact path="/signup" component={SignupForm} />
					</div>
				)}
			</div>
		);
	}
}

export default App;
