const { ALERT, FETCH_CHAT } = require("../../Constants/events");
const Group = require("../../Models/Group");
const { emitEvent } = require("../../Utils/emitEvent");

exports. newgroupChat = async(req,resp) => {
try{

    const {GrpName,members} = req.body;
    if(members.length < 2){
        console.log('group creation can not be possible with less than 3 members')
        return resp.status(400).json({
            success:false,
            message:"group creation is not possible with less than 3 members"
        })
    }

    const newGroup = await Group.create({
        name:GrpName,
        members:members,
        admin:req.user.id,

    })

    const allmembers = [...members,req.user.id]

    console.log('new group created with members',allmembers)

    //now as group is created so we have to do two things we have to send alert to all the members including me about it 
    emitEvent(req,ALERT,allmembers,`welcome to the ${GrpName} Group`)
    //and as we created the group we will add that group to our screen but the other members should see the group so i have to emit a event for that also
    emitEvent(req,FETCH_CHAT,members)

    return resp.status(201).json({
        success:true,
        message:`group created with id${newGroup._id}`
    })

}catch(err){
console.log('error occured while creating a group',err.message)
console.error(err.message);
}
}

//controller for fetching my chats

exports. getMyChats = async (req,resp) => {
    try{

    }catch(err){
    console.log('error occured while fetching my chats',err.message);
    console.error(err.message);
    }
}