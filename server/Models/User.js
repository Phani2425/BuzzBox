const mongoose = require('mongoose');

const UserScema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {

        type: String,
        required: true

    },
    bio: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserScema);