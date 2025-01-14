const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        default: ''
    },
    attachments: {
        type: [{
            resource_type: {
                type: String
            },
            public_id: {
                type: String
            },
            url: {
                type: String
            }
        }], // Assuming attachments are stored as URLs or file paths
        default: []
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chat',
        required:true5
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);