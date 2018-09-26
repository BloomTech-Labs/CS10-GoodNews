const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../User/User');

passport.use(new FacebookStrategy({
    clientID: '1566875683417685',
    clientSecret: '8c6f1b6eb2f2680aee7ea8d64818ce5c',
    callbackURL: "http://localhost:5000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
		console.log(profile);
        process.nextTick(function() {
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                if (err) return done(err);
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    const newUser = new User();
                    newUser.facebook.id = profile.id;
					newUser.facebook.accessToken = accessToken;
					newUser.facebook.refreshToken = refreshToken;
                    newUser.facebook.username = profile.username;
                    newUser.facebook.displayName = profile.displayName;
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
    User.findById({ _id: id}, function(err, user) {
        done(err, user);
    });
});

const getProfileFacebook = (req, res) => {
	// console.log(req);
    res.status(200).json({
        user : req.user // get the user out of session and pass to template
    })
}

const logoutFacebook = (req, res) => {
    req.logout();
    res.redirect('/');
}

const authFacebook = (req, res) => {
    // console.log(req.user._id);
    req.session.save(() => {
        // res.redirect('/success');
        res.status(200).json({
            user : req.user // get the user out of session and pass to res
        });
    })
}

module.exports = {
    getProfileFacebook,
    logoutFacebook,
    authFacebook
};