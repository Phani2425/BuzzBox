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
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chat',
        required:true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);