const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({

    name:{
        type:String
    },
    groupChat:{
        type:Boolean,
        default:false
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    members:{
        //remember this how to do this 
        //when any field stors an array of references
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        ]
    }

},{timestamos:true});

module.exports = mongoose.model('Chat',ChatSchema);