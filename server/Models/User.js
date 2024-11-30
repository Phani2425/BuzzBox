const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')

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

UserScema.pre('save', async function (next){
    //we will have a feature in which user can update its informations like profile pic,bio etc in those cases it will get again saved
    //if here we dont checj that the incoming data is mofified or not then the hashed password will hashed again and will result to unwanted behaviour
    //for this we have a method called:isModified('field we want to check if that got modified or not')

    if (!this.isModified('password')) {
        return next();
    }
    else {
        try {
            this.password = await bcryptjs.hash(this.password, 10);
            next();
        }catch(err){
            console.log('error occured while hashing the password');
            console.error(err.message);
            next(err); // Pass the error to Mongoose's error handling middleware
        }
    }
})

module.exports = mongoose.model('User', UserScema);