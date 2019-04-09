import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./pages/Auth/LoginForm";
import NoMatch from "./pages/NoMatch";
import AUTH from "./utils/AUTH";
import Amphora from "./components/Amphora";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      user: null,
      releaseVersion: "0.44.02",
      lastLocalVersion: null,
      showChangelog: true,
      changelogHidden: false
    };
  }

  changelogHandler = e => {
    localStorage.setItem("showChangelog", !e.target.checked);
  };
  closeChangelog = e => {
    e.preventDefault();
    localStorage.setItem("releaseVersion", this.state.releaseVersion);
    if (!localStorage.getItem("showChangelog")) {
      localStorage.setItem("showChangelog", this.state.showChangelog);
    }
    this.setState({
      // Convert string 'true' from localStorage to true boolean, otherwise null
      showChangelog:
        localStorage.getItem("showChangelog") === "true" ? true : null,
      changelogHidden: true
    });
  };

  logout = event => {
    event.preventDefault();
    if (this.state.user.Email === "Guest") {
      this.setState({
        loggedIn: false,
        user: null
      });
    } else {
      AUTH.logout().then(response => {
        if (response.status === 200) {
          this.setState({
            loggedIn: false,
            user: null
          });
        } else {
          alert("error logging out");
        }
      });
    }
  };

  login = (username, password) => {
    AUTH.login(username, password).then(response => {
      if (response.status === 200 && response.data.user) {
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      } else {
        console.log(`Authentication failed: ${response.data.message}`);
        this.triggerModal("Incorrect username or password");
      }
    });
  };

  triggerModal = text => {
    alert(text);
  };

  loginGuest = () => {
    this.setState({
      loggedIn: true,
      user: {
        Name: "Guest",
        Email: "Guest"
      }
    });
  };

  validateLength = val => {
    if (val.trim().length > 0) {
      return "success";
    } else if (val.trim().length === 0) {
      return "error";
    }
    return null;
  };

  validateEmail = email => {
    const emailRegex = new RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    );
    const test = emailRegex.test(email);
    if (test) {
      return "success";
    } else if (!test) {
      return "error";
    }
    return null;
  };

  componentDidMount = () => {
    // Handle displaying changelog
    if (typeof Storage !== "undefined") {
      const version = localStorage.getItem("releaseVersion");
      // Convert string 'true' / 'false' from localStorage to true boolean
      let show = localStorage.getItem("showChangelog");
      if (show === "true") {
        show = true;
      } else if (show === "false") {
        show = false;
      }
      this.setState({
        lastLocalVersion: version
      });
      if (show !== null) {
        this.setState({
          showChangelog: show
        });
      }
    } else {
      console.warn("No localStorage support!");
    }
  };

  render() {
    return (
      <div className="App">
        {/* Logged in users receive: */}
        {!this.state.loggedIn && (
          <div className="main-view">
            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <Amphora
                    user={this.state.user}
                    releaseVersion={this.state.releaseVersion}
                  />
                )}
              />
              <Route component={NoMatch} />
            </Switch>
          </div>
        )}
        {/* Non-authed users receive login page */}
        {this.state.loggedIn && (
          <Route
            exact
            path="/"
            component={() => (
              <LoginForm
                login={this.login}
                loginGuest={this.loginGuest}
                validateLength={this.validateLength}
                validateEmail={this.validateEmail}
                showChangelog={
                  this.state.showChangelog &&
                  this.state.releaseVersion !== this.state.lastLocalVersion
                    ? true
                    : false
                }
                changelogHidden={this.state.changelogHidden}
                setReleaseVersion={this.setReleaseVersion}
                changelogHandler={this.changelogHandler}
                closeChangelog={this.closeChangelog}
              />
            )}
          />
        )}
      </div>
    );
  }
}

export default App;
