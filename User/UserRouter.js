const router = require('express').Router();
const User = require('./User');

// Router to /api/user endpoint
router
    .route('/')
    .get(get)
    .post(post);

router
    .route('/:id')
    .put(put)
    .get(getid)
    .delete(deleteid);

// GET request PostmanResult=Works
function get(req, res) {
    User.find()
        .then(expected => {
            res.status(200).json(expected);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
}

// POST request PostmanResult=Works
function post(req, res) {
    const user = new User(req.body);
    user.save()
        .then(expected => {
            res.status(201).json(expected);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
}

// GET specific User by its id
function getid(req, res) {
    const id = req.params.id;
    User.findById(id)
        .populate('Article')
        .then(expected => {
            res.status(200).json(expected);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
}

// PUT request
function put(req, res) {
    const id = req.params.id;
    const { name, email, password, saved_articles, account_type } = req.body;
    // if (!User.findById(id)) {
    //     res.status(404).json({ message: 'User not found' });
    // }
    User.findByIdAndUpdate(id, req.body)
        .then(expected => {
            res.status(201).json(expected);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
}

// DELETE request
function deleteid(req, res) {
    const id = req.params.id;
    // if (!User.findById(id)) {
    //     res.status(404).json({ message: 'User not found' });
    // }
    User.findByIdAndRemove(id)
        .then(expected => {
            res.status(204).json(expected);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
}

module.exports = router;