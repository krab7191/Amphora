// Need inspector for circular Object
const util = require("util");

// pandoraJS
// Old way...
// const { Client } = require('../pandora-js');
// Now that NPM package is published:
const { Client } = require("pandora.js");
const pandoraClient = new Client();

pandoraClient.on("ready", () => {
});

// Defining methods for the userController
module.exports = {
  getUser: (req, res, next) => {
    console.log("===== user!!======");
    console.log(req.user);
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.json({ user: null });
    }
  },
  logout: (req, res) => {
    if (req.user) {
      req.session.destroy();
      res.clearCookie("connect.sid"); // clean up!
      return res.json({ msg: "logging you out" });
    } else {
      return res.json({ msg: "no user to log out!" });
    }
  },
  auth: function(req, res, next) {
    console.log(req.body);
    next();
  },
  // controller for pandoraJS
  pandoraAuth: function(req, res) {
    const { username, password } = req.body;
    pandoraClient
      .login(username, password)
      .then(() => {
        res.json({ user: parseUserCredentials(pandoraClient.user) });
      })
      .catch(err => {
        console.log(`pandoraJS error: ${err}`);
        res.json({ message: "Authentication failed" });
      });
  },
  authenticate: (req, res) => {
    console.log(`authenticate: ${req}`);
    const { user } = req;
    const cleanUser = Object.assign({}, user);
    if (cleanUser) {
      delete cleanUser.password;
    }
    res.json({ user: cleanUser });
  },
  pandoraClient: pandoraClient
};

parseUserCredentials = obj => {
  const { username, email, token, kruxToken, listenerToken } = obj.client.user;
  const user = {
    username: username,
    email: email,
    token: token,
    kruxToken: kruxToken,
    listenerToken: listenerToken
  };
  return user;
};
