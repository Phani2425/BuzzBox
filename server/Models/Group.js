// group model wh9ich will have name of group,members array,admin,created at,messages

const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
}, {
    timestamps: true // This will automatically add createdAt and updatedAt fields
});

// Validation to ensure group has at least one member
GroupSchema.pre('save', function(next) {
    if (this.members.length < 3) {
        next(new Error('Group must have at least three member'));
    }
    next();
});

module.exports = mongoose.model('Group', GroupSchema);