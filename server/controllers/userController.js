
// Need inspector for circular Object
const util = require('util');

// pandoraJS
const { Client } = require('../pandoraJS/Pandora.js/src');
const pandoraClient = new Client();

pandoraClient.on('ready', () => {
    // console.log("Pandora client ready");
});
// Connect to force client to ready
// pandoraClient.login("user", "pass").then(resp => {
//     console.log(`Getting client ready: ${resp}`);
// }).catch(err => {
//     console.log(`Getting client ready: ${err}`);
// });

// Defining methods for the userController
module.exports = {
    getUser: (req, res, next) => {
        console.log('===== user!!======');
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
            res.clearCookie('connect.sid'); // clean up!
            return res.json({ msg: 'logging you out' });
        } else {
            return res.json({ msg: 'no user to log out!' });
        }
    },
    auth: function (req, res, next) {
        console.log(req.body);
        console.log('Auth function hit, next()');
        next();
    },
    // controller for pandoraJS
    pandoraAuth: function (req, res) {
        const { username, password } = req.body;
        // console.log(username, password);

        pandoraClient.login(username, password).then(() => {
            res.json({ user: parseUserCredentials(pandoraClient.user) });
        }).catch(err => {
            console.log(`pandoraJS error: ${err}`);
            res.json({ message: "Authentication failed" });
        });
    },
    authenticate: (req, res) => {
        console.log('Authenticate method hit');
        console.log(`authenticate: ${req}`);
        const { user } = req;
        const cleanUser = Object.assign({}, user);
        if (cleanUser) {
            console.log(`Deleting ${cleanUser.password}`);
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
    // console.log(user);
    return user;
}