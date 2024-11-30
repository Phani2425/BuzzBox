// newgroupChat, getMyChats

const Chat = require('../../Models/Chat');
const {FETCH_CHAT,ALERT} = require('../../Constants/events');
const { emitEvent } = require('../../Utils/emitEvent');

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