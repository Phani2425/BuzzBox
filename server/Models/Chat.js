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

//creating index for  faster query whhile searching for all the group in which a user is memeber , this  query takes  place when a user reconnects a socket and we need to join him in all the rooms he is a member of
ChatSchema.index({members:1, groupChat:1});

module.exports = mongoose.model('Chat',ChatSchema);