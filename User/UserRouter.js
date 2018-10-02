const router = require('express').Router();
const User = require('./User');
const { newToken, isLoggedIn } = require('../controllers/auth');

// Router to /api/user endpoint
router.route('/').get(isLoggedIn, getAll);
router.route('/register').post(postRegister);
router.route('/login').post(postLoginUser);

// Routes to /api/user/userid endpoint
router
    .route('/logged')
    .get(isLoggedIn, getById)
    .put(isLoggedIn, put)
    .delete(isLoggedIn, deleteById);

// GET request to get all users
function getAll(req, res) {
    // console.log(req);
    User.find()
        .then(expected => {
            res.status(200).json(expected);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
}

// POST request to create a new user
function postRegister(req, res) {
    const { name, username, email, password }  = req.body;
    const reqUser = { name, username, email, password };
    if (!username || !password) {
        res.status(422).json({ error: 'Username and Password required' });
    } else {
        const newUser = new User(reqUser);
        // console.log(`newUser ${newUser}`);
        newUser.save().then((savedUser) => {
            let userInfo = {
            _id: savedUser._id,
            username: savedUser.username,
            };
            const token = newToken(userInfo);
            const userObj = {
              token,
              user: userInfo,
          };
            res.status(201).json(userObj);
        })
        .catch((err) => res.send({message: err.message}));
    }
}
// function postRegister(req, res) {
//     const user = new User(req.body);
//     user.save()
//         .then(expected => {
//             res.status(201).json(expected);
//         })
//         .catch(err => {
//             res.status(500).json(err.message);
//         });
// }

// POST request to login User
function postLoginUser(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(422).json({ error: 'Username and Password required' });
    }
    User.findOne({ username }).select('username _id password')
        .then((user) => {
        if (user) {
            // console.log(user);
            user.checkPassword(user, password)
            .then((isMatch) => {
            if (isMatch) {
                let userInfo = user.toObject();
                const token = newToken(userInfo);
                res.status(200).json({
                token,
                user: userInfo,
                });
            } else {
                res.status(422).json({ error: 'Wrong Password or Username' });
            }
            }).catch(err => res.status(501).json(err));
        } else {
            res.status(422).json({ error: 'Wrong Password or Username' });
        }
        })
        .catch((err) => {
        res.status(500).json({ error: err });
        });
}

// GET specific user by its id
function getById(req, res) {
    // const userid = req.params.userid;
    const userid = req.headers.userid;
    User.findById(userid)
        .populate('saved_articles')
        .then(expected => {
            res.status(200).json(expected);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
}

// PUT request
function put(req, res) {
    const userid = req.headers.userid;
    const user = { name, username, email, currentPassword, password } = req.body;
    // console.log(req.body);
    // if (!User.findById(id)) {
    //     res.status(404).json({ message: 'User not found' });
    // }
    if (user.password) {
      User.findById(userid)
          .then(foundUser => {
              foundUser.checkPassword(foundUser, currentPassword)
              .then(isMatch => {
                  if (isMatch) {
                      foundUser.password = user.password;
                      foundUser.save();
                      User.findById(userid)
                          .then(updatedUser => res.status(201).json(updatedUser))
                  } else {
                      res.status(401).json({ message: 'Unable to change password'});
                  }
              })
              .catch(err => res.status(500).json(err.message))
          })
          .catch(err => res.status(404).json(err.message));
    } else {
        User.findByIdAndUpdate(userid, user)
            .then(expected => {
                User.findById(userid)
                    .then(updatedUser => res.status(201).json(updatedUser))
            })
            .catch( err => res.status(500).json(err.message))
    }
}

// DELETE request
function deleteById(req, res) {
    const userid = req.headers.userid;
    // if (!User.findById(id)) {
    //     res.status(404).json({ message: 'User not found' });
    // }
    User.findByIdAndRemove(userid)
        .then(expected => {
            res.status(204).json(expected);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
}

module.exports = router;