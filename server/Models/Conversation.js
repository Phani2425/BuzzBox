//model for two people chats which will have participants,created at and messages


const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
}, {
    timestamps: true // Adds createdAt and updatedAt
});

// Validate exactly 2 participants
ConversationSchema.pre('save', function(next) {
    if (this.participants.length !== 2) {
        next(new Error('Conversation must have exactly 2 participants'));
    }
    next();
});

// Index for faster participant lookups
ConversationSchema.index({ participants: 1 });

module.exports = mongoose.model('Conversation', ConversationSchema);