const User = require('../models/User');
const mongoose = require("mongoose");

module.exports = {
    getUsers(req, res) {
        User.find().then((users) => res.json(users)).catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({
            _id: new mongoose.Types.ObjectId(req.params.id)
        }).then((user) => !user ? res.status(404).json({ message: 'Unable to find a user with that id' }) : res.json(user)
        )
    },
    createUser(req, res) {
        User.create(req.body).then((userData) => res.json(userData)).catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.body.id) },
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    thoughts: req.body.thoughts,
                    friends: req.body.friends
                }
            },
            { runValidators: true, new: true }
        ).then((user) => {
            !user ? res.status(404).json({ message: 'Unable to update a user with that id' }) : res.json(user)
        }).catch((err) => { console.log(err); res.status(500).json(err) })
    },
    deleteUser(req, res) {
        User.findOneAndRemove(
            { _id: new mongoose.Types.ObjectId(req.body.id) }
        ).then((data) => {
            !data ? res.status(404).json({ message: 'Unable to delete a user with that id' }) : res.json(data)
        }).catch((err) => { console.log(err); res.status(500).json(err) })
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            { $push: { friends: new mongoose.Types.ObjectId(req.params.fid) } }
        ).then((data) => {
            !data ? res.status(404).json({ message: 'Unable to add a friend with the given ids' }) : res.json(data)
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            { $pull: { friends: new mongoose.Types.ObjectId(req.params.fid) } }
        ).then((data) => {
            !data ? res.status(404).json({ message: 'Unable to add a friend with the given ids' }) : res.json(data)
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });
    }
};