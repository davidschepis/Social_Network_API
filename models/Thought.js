const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

reactionSchema.methods.getDate = () => {
    return "CHABS";
}

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
});

thoughtSchema.methods.getDate = () => {
    return "CHABS";
};

thoughtSchema.virtual('reactionCount').get(() => {
    return reactions.length;
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;