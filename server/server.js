// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments');
	require('dotenv').config();
}
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const routes = require("./routes");
const passport = require('./passport');
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
  secret: process.env.APP_SECRET || 'this is the default passphrase',
  resave: false,
  saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

// Redirect all incoming insecure requests to HTTPS
app.use((req, res, next) => {
  const { headers, url } = req;
  console.log(headers['x-forwarded-proto']);
  if (headers['x-forwarded-proto'] !== 'https') {
    res.redirect('https://' + headers.host + url);
  } else {
    next();
  }
});

// If its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path');
	console.log('YOU ARE IN THE PRODUCTION ENV');
	app.use('/static', express.static(path.join(__dirname, '../client/build/static')));
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build/'))
	});
}

// Add routes, both API and view
app.use(routes);

// Error handler
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======');
	console.error(err.stack);
	res.status(500);
});

// Starting Server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
