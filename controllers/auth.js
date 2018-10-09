const jwt = require('jsonwebtoken');

const newToken = (user) => {
  return jwt.sign(user, process.env.SECRET);
};

// { expiresIn: '3h', // in 3 hours }

const isLoggedIn = (req, res, next) => {
  if (req.headers.authorization) {
    // JWT local auth
    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
      // console.log(err);
      res.status(403).json({ error: 'Please log in.', message: err });
      return;
    } else if (decoded._id === req.headers.userid) {
      // console.log(decoded);
    req.decoded = decoded;
    next();
    } else { 
      res.status(403).json({ error: 'User ids don\'t match. Please log in again.', message: err });
    }
  });
  } else {
    // console.log(req);
    if (req.isAuthenticated()) return next();
    // if they aren't redirect them to the home page
    // res.redirect('/');
    res.status(403).json({ error: 'Please log in.', message: err });
  }
};

module.exports = {
    newToken,
    isLoggedIn
}