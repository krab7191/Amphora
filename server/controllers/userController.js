
// pandoraJS
const { Client } = require('../pandoraJS/Pandora.js');
const pandoraClient = new Client();
console.log(pandoraClient);
pandoraClient.on('ready', () => {
    console.log("Pandora client ready");
});

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
        console.log('Auth function hit, next');
        next();
    },
    // controller for pandoraJS
    pandoraAuth: function (req, res) {
        console.log("pandora auth controller");
        const { username, password } = req.body;
        console.log(username, password);
        pandoraClient.login(username, password).then(console.log(pandoraClient));
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
    pandoraClient: pandoraClient,

};