const passport = require('passport');
const PandoraStrategy = require('./pandoraStrategy');

passport.serializeUser((user, done) => {
	console.log('Serialize called');
	console.log('---------');
	done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
	console.log('Deserialize called');
});

// Register Strategies
passport.use(PandoraStrategy);

module.exports = passport;
