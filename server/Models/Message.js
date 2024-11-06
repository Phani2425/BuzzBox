const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    attachments: {
        type: [{
            publi_id: {
                typr: String,
                required: true
            },
            url: {
                typr: String,
                required: true
            }
        }], // Assuming attachments are stored as URLs or file paths
        default: []
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: false
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: false
    }
}, {
    timestamps: true
});

// Custom validation to ensure either conversation or group is provided
MessageSchema.pre('save', function (next) {
    if (!this.conversation && !this.group) {
        next(new Error('A message must belong to either a conversation or a group.'));
    } else {
        next();
    }
});

module.exports = mongoose.model('Message', MessageSchema);