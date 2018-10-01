const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../User/User');

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
    },
    function(token, tokenSecret, profile, done) {
        // console.log(profile);
        process.nextTick(function() {
            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                if (err) return done(err);
                if (user) {
                    return done(err, user); // user found, return that user
                } else {
                    const newUser = new User();
                    newUser.twitter.id = profile.id;
                    newUser.twitter.token = token;
                    newUser.twitter.tokenSecret = tokenSecret;
                    newUser.twitter.twittername = profile.username;
                    newUser.twitter.displayName = profile.displayName;
                    newUser.email = profile.emails[0].value,
                    newUser.save(function(err) {
                        if (err) throw err;
                        return done(err, newUser);
                    });
                }
            });
        }
)}));

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });
// passport.deserializeUser(function(id, done) {
//     User.findById({ _id: id}, function(err, user) {
//         done(err, user);
//     });
// });

// const getProfileTwitter = (req, res) => {
// 	// console.log(req);
//     res.status(200).json({
//         user : req.user // get the user out of session and pass to template
//     })
// }

// const authTwitter = (req, res) => {
//     console.log(req.user);
//     req.session.save(() => {
//         res.status(200).json({
//             user : req.user, // get the user out of session and pass to res
//             token: req.user.token
//         });
//         // const token = req.user.token;
//         // res.redirect('http://127.0.0.1:3000'+token);
//     });
// }

// res.redirect('/api/article/get-articles/0'));

// module.exports = {
//     getProfileTwitter
// };