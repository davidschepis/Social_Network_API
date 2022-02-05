const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find().then((users) => res.json(users)).catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({
            _id: req.params.userId
        }).then((user) => !user ? res.status(404).json({ message: 'Unable to find a user with that id' }) : res.json(user)
        )
    },
    createUser(req, res) {
        User.create(req.body).then((userData) => res.json(userData)).catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((user) => {
            !user ? res.status(404).json({ message: 'Unable to find a user with that id' }) : res.json(user)
        }).catch((err) => { console.log(err); res.status(500).json(err) })
    },
    deleteUser(req, res) {
        User.findOneAndRemove(
            { _id: req.params.id }
        ).then((data) => {
            console.log(data);
        })
    }
};