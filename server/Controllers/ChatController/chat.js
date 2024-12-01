// newgroupChat, getMyChats

const Chat = require('../../Models/Chat');
const {FETCH_CHAT,ALERT} = require('../../Constants/events');
const { emitEvent } = require('../../Utils/emitEvent');
const { getOtherMember } = require('../../Utils/utilityFunctions');

//controller for creating new group
exports. CreateNewGroup = async(req,resp) => {
    try{

        const {name,members} = req.body;

        if(members.length < 2){
            console.log('group can not be created with ;ess than 3 members');
            return resp.status(400).json({
                success:false,
                message:'group creation require more than equals to 2 members'
            })
        }

        //as gorupchat will contain me with other members so i have to create that first
        const allMemebers = [...members,req.user.id];

        //creating a group chat
        const newChat = new Chat({
            name,
            groupChat:true,
            creator:req.user.id,
            members:allMemebers
        })

        const createdGroup = await newChat.save();

        //emiting event to send alert to allmembers of the group
        //before that i will create an "emitEvent" funation which will take four things:- req,event,users,data and emit the event to them...i will create that in utils folder as i will use that everywhere

        emitEvent(req,ALERT,allMemebers,`Welcome to ${name} group..🤗`);

        //now i will emit another event to the members of the group expect the creator or me as i can make changes in my frontend by myself but  i can change their frontend and showcase the group there only byy emiting event to them

        emitEvent(req,FETCH_CHAT,members);//no message required

        resp.status(200).json({
            success:true,
            message:'Group Created',
            group:createdGroup
        })


    }catch(err){
        console.log('error occured while creating new group',err.message);
        resp.status(500).json({
            success:false,
            message:'internal server error',
            error:err.message
        })
    }
}

//get my chats controller
//agr me user ke andar friends ka ek field rakhta which would have all the friends then mujhe ye controller ki jaroorat na hota mujhe bas group chts dhundne hote

//but as hamne friend ka aary nehi rakha hai isiliye kuch complex query ki madad se hame abhi chats ko dhundna padega

exports. getMyChats = async(req,resp) => {
    try{

        const chats = await Chat.find({members: {$in:[req.user.id]}}).populate('members', 'userName profilePic');

        const transfomedChat = chats.map(({_id,name,members,groupChat}) => {

            //calling the function to get the other member data if the chat is not  a group chat
            const otherMemeber = getOtherMember(members,req.user.id);

            return {
                _id,
                groupChat,
                name:groupChat?name:otherMemeber.userName,
                //here in stead of all memers i only need memebers except me or the person making request to this api and also i only need their id not other data
                //i can pull this out by filter method and reduce method too

                //i know here that reduce method is not only used to sum the value of array it can be used like this too and i knew that the reduce methood calls the passed callback function for each element by  putting that in place of curr and whtever the callback function returns it store that in prev variable
                members:members.reduce((prev,curr)=>{

                    if(curr._id.toString() !== req.user.id.toString()){
                        prev.push(curr._id);
                    }

                    return prev;

                },[]),
                grpAvatar:groupChat ? members.slice(0,3).map((member)=> member.profilePic) : [otherMemeber.profilePic]
            }

        })

        resp.status(200).json({
            success:true,
            chats:transfomedChat,
            message:'all chats fetched'
        })

    }catch(err){
        console.error(err);
        console.log('error occured while fetching my chats',err.message);
        resp.status(500).json({
            success:false,
            message:'internal server error',
            error:err.message
        })

    }
}

//controller for fetching group chats which is created by me
exports. getMyGroupChats = async(req,resp) => {
    try{

        const groupChats = await Chat.find({creator:req.user.id,groupChat:true}).populate('members','userName profilePic');

        const transfomedChat = groupChats.map(({_id,name,members}) => {

            return {
                _id,
                name,
                members:members.reduce((prev,curr)=>{

                    if(curr._id.toString() !== req.user.id.toString()){
                        prev.push(curr._id);
                    }

                    return prev;

                },[]),
                grpAvatar:members.slice(0,3).map((member)=> member.profilePic)
            }

        })

        resp.status(200).json({
            success:true,
            transfomedChat,
            message:'all group chats fetched'
        })

    }catch(err){
        console.error(err);
        console.log('error occured while fetching my group chats',err.message);
        resp.status(500).json({
            success:false,
            message:'internal server error',
            error:err.message
        })

    }
}

//controller for  adding members to a group

exports. addMembers = async(req,resp) => {
    try{

        const {members,chatId} = req.body;

        //check if members are sent
        if(!members || members.length === 0){
            return resp.status(422).json({
               message:'select members to add them'
            })
        }

        //fetch the chat
        const chat = await Chat.findById(chatId);

        if(!chat || !chat.groupChat){
            return resp.status(404).json({
                success:false,
                message:'chat not found or chat is not a groupchat'
            })
        }

        //checking if the user is the creator of the group
        if(chat.creator.toString() !== req.user.id.toString()){
            return resp.status(401).json({
                success:false,
                message:'you are not authorized to add members'
            })
        }

        //before adding the members i have to check the member count must not exceed 100
        if(chat.members.length+members.length > 100){
            console.log('group can not have more that 100 members');
            return resp.status(422).json({
                message:'member count exceeded'
            })
            //422 means: unprocessable entity ..it reaches the client unlikely the 500 series codes which don't as they are considered as technical error
        }

        //before adding the members we have to ensure that only those mebers which are not previously present int the group shoulld only get added 

        const uniqueMembers = members.filter((member) => !chat.members.includes(member));

        //adding the members
        chat.members.push(...uniqueMembers);

        const updatedChat = await chat.save();

        //emiting event to send alert to allmembers of the group
        emitEvent(req,ALERT,uniqueMembers,`You are added to ${chat.name} group..🤗`);

        //now i will emit another event to the members of the group expect the creator or me as i can make changes in my frontend by myself but  i can change their frontend and showcase the group there only byy emiting event to them

        emitEvent(req,FETCH_CHAT,uniqueMembers);//no message required

        resp.status(200).json({
            success:true,
            message:'members added',
            chat:updatedChat
        })

    }catch(err){
        console.log('error occured while adding members to group',err.message);
        resp.status(500).json({
            success:false,
            message:'internal server error',
            error:err.message
        })
    }
}

//controller for removing members
exports. removeMember = async(req,resp) => {
    try{

        const {members,chatId} = req.body;

        const group = await Chat.findById(chatId);
        if(!group || !group.groupChat){
            return resp.status(404).json({
                success:false,
                message:'chat with passed id is not found or the chat is not a group chat'
            })
        }

        if(group.creator.toString() !== req.user.id.toString()){
            return resp.status(401).json({
                success:false,
                message:'you are not creator of the group'
            })
        }

        group.members = group.members.filter((member) => !members.includes(member.toString()));

        const updatedGroup = await group.save();

        //here in the data part i can notify remaing members about the removed members
        emitEvent(req,FETCH_CHAT,updatedGroup.members);

        resp.status(200).json({
            success:true,
            group:updatedGroup,
            message:'members removed'
        })

    }catch(err){
        console.log('error occured while removing members',err.message);
        console.error(err.message);
        resp.status(500).json({
            success:false,
            message:'internal server error'
        })
    }
}