const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../User/User');

passport.use(new GoogleStrategy({
    clientID: '475445850164-qj7pa4i4di60eqv8rd6nudpi8ba04vkp.apps.googleusercontent.com',
    clientSecret: 'XiVvNnMv8uoJmvuPgFV93oL9',
    callbackURL: "http://localhost:5000/auth/google/callback"
    },
    function(token, tokenSecret, profile, done) {
		// console.log(profile);
        process.nextTick(function() {
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err) return done(err);
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    const newUser = new User();
                    newUser.google.id = profile.id;
					newUser.google.token = token;
					// newUser.google.tokenSecret = tokenSecret;
                    newUser.google.displayName = profile.displayName;
                    newUser.username = profile.displayName;
                    newUser.name.first = profile.name.givenName;
                    newUser.name.last = profile.name.familyName;
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

const getProfileGoogle = (req, res) => {
	// console.log(req);
    res.status(200).json({
        user : req.user // get the user out of session and pass to template
    })
}

const logoutGoogle = (req, res) => {
    req.logout();
    res.redirect('/');
}

const authGoogle = (req, res) => {
    // console.log(req.user._id);
    req.session.save(() => {
        // res.redirect('/success');
        res.status(200).json({
            user : req.user // get the user out of session and pass to res
        });
    })
}

module.exports = {
    getProfileGoogle,
    logoutGoogle,
    authGoogle
};