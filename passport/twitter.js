const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../User/User');

passport.use(new TwitterStrategy({
    consumerKey: 'GeKCRHI0GC7KdtThqVMxgbYgf',
    consumerSecret: '40yDP2EytK69DhdMKb7ojVzkCaGTi769FjjJr1SPlzQuZt8z9C',
    callbackURL: "http://localhost:5000/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
		// console.log(profile);
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
    User.findById({ _id: id}, function(err, user) {
        done(err, user);
    });
});

const getProfileTwitter = (req, res) => {
	// console.log(req);
    res.status(200).json({
        user : req.user // get the user out of session and pass to template
    })
}

const logoutTwitter = (req, res) => {
    req.logout();
    res.redirect('/');
}

const authTwitter = (req, res) => {
    // console.log(req.user._id);
    req.session.save(() => {
        // res.redirect('/success');
        res.status(200).json({
            user : req.user // get the user out of session and pass to res
        });
    })
}

module.exports = {
    getProfileTwitter,
    logoutTwitter,
    authTwitter
};