const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([A-Za-z0-9_\.-]+)@([\dA-Za-z\.-]+)\.([A-Za-z\.]{2,6})$/, "Invalid Email"]
    },
    thoughts: {
        type: Array,
        ref: "Thought"
    },
    friends: {
        type: Array,
        ref: "User"
    }
});

userSchema.virtual('friendCount').get(() => {
    return friends.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;