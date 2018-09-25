// const express = require('express');
const session = require('express-session');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../User/User');
// const app = express();
const isLoggedIn = require('../controllers/auth').isLoggedIn;
// const app = require('../server');

// Configure the Twitter strategy for use by Passport.
//
// OAuth 1.0-based strategies require a `verify` function which receives the
// credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
// user's behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new TwitterStrategy({
    consumerKey: 'GeKCRHI0GC7KdtThqVMxgbYgf',
    consumerSecret: '40yDP2EytK69DhdMKb7ojVzkCaGTi769FjjJr1SPlzQuZt8z9C',
    callbackURL: "http://localhost:5000/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
        process.nextTick(function() {
            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                if (err) return done(err);
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    const newUser = new User();
                    newUser.twitter.id = profile.id;
                    newUser.twitter.token = token;
                    newUser.twitter.username = profile.username;
                    newUser.twitter.displayName = profile.displayName;
                    newUser.password = '123';
                    newUser.save(function(err) {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        }
)}));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// app.use(express.cookieParser()); // read cookies (needed for auth)
// app.use(express.bodyParser()); // get information from html forms
// required for passport
app.use(session({ secret: 'SECRET' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

// route for home page
app.get('/', function(req, res) {
    res.send('HOME PAGE');
});

// route for login form
// route for processing the login form
// route for signup form
// route for processing the signup form

// route for showing the profile page
app.get('/profile', isLoggedIn, function(req, res) {
    res.send({
        user : req.user // get the user out of session and pass to template
    });
});

// route for logging out
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// Twitter routes
app.get('/auth/twitter', passport.authenticate('twitter'));
// handle the callback after twitter has authenticated the user
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect : '/get-articles/0',
        failureRedirect : '/api/user'
}));

// moved to ../controllers/auth
// route middleware to make sure a user is logged in
// function isLoggedInTwitter(req, res, next) {

//     // if user is authenticated in the session, carry on
//     if (req.isAuthenticated())
//         return next();

//     // if they aren't redirect them to the home page
//     res.redirect('/');
// }
// console.log(app);
module.exports = app;