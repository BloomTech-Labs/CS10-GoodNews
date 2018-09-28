require('dotenv').config();
const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

// const authMiddleware = (req, res, next) => {
// 	// TODO: Implement Authentication and Authorization
// 	// const {token, uid} = req.headers;
// 	// Will require Front-End Caching of Data to save spot
// 	// So data is back if user's token expires while they are not done.
// 	next();
// };

const corsOptions = {
	origin: '*',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
	preflightContinue: false,
	optionsSuccessStatus: 200
};

server.use(cors(corsOptions));
server.use(helmet());
server.use(express.json());

const UserRouter = require('./User/UserRouter');
const ArticleRouter = require('./Article/ArticleRouter');
const ArticleRouterDS = require('./Article/ArticleRouterDS');

// passport-twitter
const { getProfileTwitter, authTwitter } = require('./passport/twitter');
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
// Twitter routes
// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at /auth/twitter/callback
server.get('/auth/twitter', passport.authenticate('twitter'));
// handle the callback after twitter has authenticated the user
server.get('/auth/twitter/callback',
	passport.authenticate('twitter', 
	{ 
		successRedirect: '/api/article/get-articles/0',
		failureRedirect: '/api/user' 
	}),
	authTwitter);

// passport-facebook
const { getProfileFacebook, authFacebook } = require('./passport/facebook');
// route for showing the profile page
server.get('/facebook/profile', isLoggedIn, getProfileFacebook);
// Facebook routes
server.get('/auth/facebook', passport.authenticate('facebook'));
// handle the callback after facebook has authenticated the user
server.get('/auth/facebook/callback',
	passport.authenticate('facebook'),
	authFacebook);

// passport-google-oauth
const { getProfileGoogle, authGoogle } = require('./passport/google');
// route for showing the profile page
server.get('/google/profile', isLoggedIn, getProfileGoogle);
// Google routes
server.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
// handle the callback after google has authenticated the user
server.get('/auth/google/callback',
	passport.authenticate('google'),
	authGoogle);

server.get('/logout', function(req, res){
	req.logout();
	res.send('User logged out!');
	// res.redirect('/api/article/get-articles/0');
});

// User and Article API Routes
server.use('/api/article', ArticleRouter);
server.use('/api/user', UserRouter);

module.exports = server;