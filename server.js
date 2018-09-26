require('dotenv').config();
const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

const UserRouter = require('./User/UserRouter');
const ArticleRouter = require('./Article/ArticleRouter');
// const ArticleRouterDS = require('./Article/ArticleRouterDS');

// const authMiddleware = (req, res, next) => {
// 	// TODO: Implement Authentication and Authorization
// 	// const {token, uid} = req.headers;
// 	// Will require Front-End Caching of Data to save spot
// 	// So data is back if user's token expires while they are not done.
// 	next();
// };

const corsOptions = {
	origin: '*',
	credentials: true
};

server.use(cors(corsOptions));
server.use(helmet());
server.use(express.json());

// passport-twitter
const { getProfileTwitter, logoutTwitter, authTwitter } = require('./passport/twitter');
const session = require('express-session');
const passport = require('passport');
const { isLoggedIn } = require('./controllers/auth');
const cookieParser = require('cookie-parser');
server.use(cookieParser()); // read cookies (needed for auth)
// server.use(bodyParser()); // get information from html forms
// required for passport
server.use(session({ secret: 'SECRET', resave: false, saveUninitialized: false, cookie: { secure: false }})); // session secret
server.use(passport.initialize());
server.use(passport.session()); // persistent login sessions
// server.use(flash()); // use connect-flash for flash messages stored in session
// route for showing the profile page
server.get('/twitter/profile', isLoggedIn, getProfileTwitter);
// route for logging out
server.get('/twitter/logout', logoutTwitter);
// Twitter routes
server.get('/auth/twitter', passport.authenticate('twitter'));
// handle the callback after twitter has authenticated the user
server.get('/auth/twitter/callback',
	passport.authenticate('twitter'),
	authTwitter);

// passport-facebook
const { getProfileFacebook, logoutFacebook, authFacebook } = require('./passport/facebook');
// route for showing the profile page
server.get('/facebook/profile', isLoggedIn, getProfileFacebook);
// route for logging out
server.get('/facebook/logout', logoutFacebook);
// Facebook routes
server.get('/auth/facebook', passport.authenticate('facebook'));
// handle the callback after facebook has authenticated the user
server.get('/auth/facebook/callback',
	passport.authenticate('facebook'),
	authFacebook);

// passport-google-oauth
const { getProfileGoogle, logoutGoogle, authGoogle } = require('./passport/google');
// route for showing the profile page
server.get('/google/profile', isLoggedIn, getProfileGoogle);
// route for logging out
server.get('/google/logout', logoutGoogle);
// Google routes
server.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
// handle the callback after google has authenticated the user
server.get('/auth/google/callback',
	passport.authenticate('google'),
	authGoogle);

// User and Article API Routes
server.use('/api/article', ArticleRouter);
server.use('/api/user', UserRouter);

module.exports = server;