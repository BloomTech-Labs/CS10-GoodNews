const jwt = require('jsonwebtoken');

const newToken = (user) => {
  return jwt.sign(user, process.env.SECRET, {
    expiresIn: 10800, // in seconds
  });
};

const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(403).json({ error: 'Please log in.', message: err });
      return;
    } else if (decoded._id === req.headers.userid) {
    req.decoded = decoded;
    next();
    } else { 
      res.status(403).json({ error: 'User ids don\'t match. Please log in again.', message: err });
    }
  });
};

module.exports = {
    newToken,
    isLoggedIn
}