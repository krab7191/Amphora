
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
    authenticate: (req, res) => {
        console.log('Authenticate method hit');
        const {user} = req;
        const cleanUser = Object.assign({}, user);
        if (cleanUser) {
            console.log(`Deleting ${cleanUser.password}`);
            delete cleanUser.password;
        }
        res.json({ user: cleanUser });
    }
};