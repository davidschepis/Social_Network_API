const { User, Thought } = require('../models');

const mongoose = require("mongoose");

module.exports = {
    getThoughts(req, res) {
        Thought.find().then((data) => res.json(data)).catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({
            _id: new mongoose.Types.ObjectId(req.params.id)
        }).then((thought) => !thought ? res.status(404).json({ message: 'Unable to find a thought with that id' }) : res.json(thought));
    },
    createThought(req, res) {
        Thought.create({
            thoughtText: req.body.thoughtText,
            username: req.body.username
        }).then((data) => {
            User.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(req.body.id) },
                { $push: { thoughts: mongoose.Types.ObjectId(data._id) } }
            ).then((response) => {
                //do nothing
            }).catch((err) => {
                console.log(err);
            });
            res.json(data);
        }).catch((err) => { console.log(err); res.status(500).json(err) })
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            {
                $set: {
                    thoughtText: req.body.thoughtText,
                    username: req.body.username,
                    reactions: req.body.reactions
                }
            },
            { runValidators: true, new: true }
        ).then((thought) => {
            !thought ? res.status(404).json({ message: 'Unable to update a thought with that id' }) : res.json(thought)
        }).catch((err) => { console.log(err); res.status(500).json(err) })
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove(
            { _id: new mongoose.Types.ObjectId(req.params.id) }
        ).then((data) => {
            !data ? res.status(404).json({ message: 'Unable to delete a thought with that id' }) : res.json(data)
        }).catch((err) => { console.log(err); res.status(500).json(err) })
    },
    addReaction(req, res) {
        const reaction = {
            reactionBody: req.body.reactionBody,
            username: req.body.username
        }
        Thought.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            { $push: { reactions: reaction } }
        ).then((data) => {
            !data ? res.status(404).json({ message: 'Unable to add a friend with the given ids' }) : res.json(data)
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            { $pull: { reactions: { reactionID: req.body.reaction_id } } }
        ).then((data) => {
            !data ? res.status(404).json({ message: 'Unable to add a friend with the given ids' }) : res.json(data)
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};