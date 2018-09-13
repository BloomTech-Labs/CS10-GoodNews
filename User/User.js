const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcrypt');
const SALT = parseInt(process.env.SALT_ROUNDS, 10);

const User = mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    saved_articles: [{
        type: ObjectId,
        ref: 'Article'
    }],
    account_type: {
        free: Boolean,
        paid: Boolean
    }
})

User.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, SALT, (err, hashed) => {
        if(err) throw new Error(err);

        user.password = hashed;
        next();
    })
});
  
User.methods.checkPassword = (user, potentialPassword) => {
    return new Promise((resolve, reject) => {
        return bcrypt.compare(potentialPassword, user.password)
        .then((isMatch) => {
            resolve(isMatch);
        }).catch((err) => reject(err));
    }).catch((err) => err);
};

module.exports = mongoose.model('User', User);