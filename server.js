require('dotenv').config();
const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

const UserRouter = require('./User/UserRouter');
const ArticleRouter = require('./Article/ArticleRouter');
// const ArticleRouterDS = require('./Article/ArticleRouterDS');

const authMiddleware = (req, res, next) => {
	// TODO: Implement Authentication and Authorization
	// const {token, uid} = req.headers;
	// Will require Front-End Caching of Data to save spot
	// So data is back if user's token expires while they are not done.
	next();
};

const corsOptions = {
	origin: '*',
	credentials: true
};

server.use(cors(corsOptions));
server.use(helmet());
server.use(express.json());

// User and Article API Routes
server.use('/api/article', authMiddleware, ArticleRouter);
server.use('/api/user', authMiddleware, UserRouter);


// passport-twitter
const session = require('express-session');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('./User/User');
const isLoggedIn = require('./controllers/auth').isLoggedIn;
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
passport.use(new TwitterStrategy({
    consumerKey: 'GeKCRHI0GC7KdtThqVMxgbYgf',
    consumerSecret: '40yDP2EytK69DhdMKb7ojVzkCaGTi769FjjJr1SPlzQuZt8z9C',
    callbackURL: "http://localhost:5000/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
		console.log(profile);
        process.nextTick(function() {
            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                if (err) return done(err);
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    const newUser = new User();
                    newUser.twitter.id = profile.id;
					newUser.twitter.token = token;
					newUser.twitter.tokenSecret = tokenSecret;
                    newUser.twitter.username = profile.username;
                    newUser.twitter.displayName = profile.displayName;
                    newUser.save(function(err) {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        }
)}));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
// server.use(cookieParser()); // read cookies (needed for auth)
// server.use(bodyParser()); // get information from html forms
// required for passport
server.use(session({ secret: 'SECRET' })); // session secret
server.use(passport.initialize());
server.use(passport.session()); // persistent login sessions
// server.use(flash()); // use connect-flash for flash messages stored in session
// route for showing the profile page
server.get('/profile', isLoggedIn, function(req, res) {
	// console.log(req);
    res.status(200).json({
        user : req.user // get the user out of session and pass to template
    });
});
// route for logging out
server.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
// Twitter routes
server.get('/auth/twitter', passport.authenticate('twitter'));
// handle the callback after twitter has authenticated the user
server.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect : '/profile',
        failureRedirect : '/api/user'
}));


module.exports = server;