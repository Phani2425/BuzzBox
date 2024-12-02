// newgroupChat, getMyChats

const Chat = require('../../Models/Chat');
const User = require('../../Models/User')
const { FETCH_CHAT, ALERT, NEW_ATTACHMENT, NEW_MESSAGE_ALERT } = require('../../Constants/events');
const { emitEvent } = require('../../Utils/emitEvent');
const { getOtherMember } = require('../../Utils/utilityFunctions');
const Message = require('../../Models/Message');
const cloudinary = require('../../Config/cloudinary');

//controller for creating new group
exports.CreateNewGroup = async (req, resp) => {
    try {

        const { name, members } = req.body;

        if (members.length < 2) {
            console.log('group can not be created with ;ess than 3 members');
            return resp.status(400).json({
                success: false,
                message: 'group creation require more than equals to 2 members'
            })
        }

        //as gorupchat will contain me with other members so i have to create that first
        const allMemebers = [...members, req.user.id];

        //creating a group chat
        const newChat = new Chat({
            name,
            groupChat: true,
            creator: req.user.id,
            members: allMemebers
        })

        const createdGroup = await newChat.save();

        //emiting event to send alert to allmembers of the group
        //before that i will create an "emitEvent" funation which will take four things:- req,event,users,data and emit the event to them...i will create that in utils folder as i will use that everywhere

        emitEvent(req, ALERT, allMemebers, `Welcome to ${name} group..🤗`);

        //now i will emit another event to the members of the group expect the creator or me as i can make changes in my frontend by myself but  i can change their frontend and showcase the group there only byy emiting event to them

        emitEvent(req, FETCH_CHAT, members);//no message required

        resp.status(200).json({
            success: true,
            message: 'Group Created',
            group: createdGroup
        })


    } catch (err) {
        console.log('error occured while creating new group', err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error',
            error: err.message
        })
    }
}

//get my chats controller
//agr me user ke andar friends ka ek field rakhta which would have all the friends then mujhe ye controller ki jaroorat na hota mujhe bas group chts dhundne hote

//but as hamne friend ka aary nehi rakha hai isiliye kuch complex query ki madad se hame abhi chats ko dhundna padega

exports.getMyChats = async (req, resp) => {
    try {

        const chats = await Chat.find({ members: { $in: [req.user.id] } }).populate('members', 'userName profilePic');

        const transfomedChat = chats.map(({ _id, name, members, groupChat }) => {

            //calling the function to get the other member data if the chat is not  a group chat
            const otherMemeber = getOtherMember(members, req.user.id);

            return {
                _id,
                groupChat,
                name: groupChat ? name : otherMemeber.userName,
                //here in stead of all memers i only need memebers except me or the person making request to this api and also i only need their id not other data
                //i can pull this out by filter method and reduce method too

                //i know here that reduce method is not only used to sum the value of array it can be used like this too and i knew that the reduce methood calls the passed callback function for each element by  putting that in place of curr and whtever the callback function returns it store that in prev variable
                members: members.reduce((prev, curr) => {

                    if (curr._id.toString() !== req.user.id.toString()) {
                        prev.push(curr._id);
                    }

                    return prev;

                }, []),
                grpAvatar: groupChat ? members.slice(0, 3).map((member) => member.profilePic) : [otherMemeber.profilePic]
            }

        })

        resp.status(200).json({
            success: true,
            chats: transfomedChat,
            message: 'all chats fetched'
        })

    } catch (err) {
        console.error(err);
        console.log('error occured while fetching my chats', err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error',
            error: err.message
        })

    }
}

//controller for fetching group chats which is created by me
exports.getMyGroupChats = async (req, resp) => {
    try {

        const groupChats = await Chat.find({ creator: req.user.id, groupChat: true }).populate('members', 'userName profilePic');

        const transfomedChat = groupChats.map(({ _id, name, members }) => {

            return {
                _id,
                name,
                members: members.reduce((prev, curr) => {

                    if (curr._id.toString() !== req.user.id.toString()) {
                        prev.push(curr._id);
                    }

                    return prev;

                }, []),
                grpAvatar: members.slice(0, 3).map((member) => member.profilePic)
            }

        })

        resp.status(200).json({
            success: true,
            transfomedChat,
            message: 'all group chats fetched'
        })

    } catch (err) {
        console.error(err);
        console.log('error occured while fetching my group chats', err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error',
            error: err.message
        })

    }
}

//controller for  adding members to a group

exports.addMembers = async (req, resp) => {
    try {

        const { members, chatId } = req.body;

        //check if members are sent
        if (!members || members.length === 0) {
            return resp.status(422).json({
                message: 'select members to add them'
            })
        }

        //fetch the chat
        const chat = await Chat.findById(chatId);

        if (!chat || !chat.groupChat) {
            return resp.status(404).json({
                success: false,
                message: 'chat not found or chat is not a groupchat'
            })
        }

        //checking if the user is the creator of the group
        if (chat.creator.toString() !== req.user.id.toString()) {
            return resp.status(401).json({
                success: false,
                message: 'you are not authorized to add members'
            })
        }

        //before adding the members i have to check the member count must not exceed 100
        if (chat.members.length + members.length > 100) {
            console.log('group can not have more that 100 members');
            return resp.status(422).json({
                message: 'member count exceeded'
            })
            //422 means: unprocessable entity ..it reaches the client unlikely the 500 series codes which don't as they are considered as technical error
        }

        //before adding the members we have to ensure that only those mebers which are not previously present int the group shoulld only get added 

        const uniqueMembers = members.filter((member) => !chat.members.includes(member));

        //adding the members
        chat.members.push(...uniqueMembers);

        const updatedChat = await chat.save();

        //emiting event to send alert to allmembers of the group
        emitEvent(req, ALERT, uniqueMembers, `You are added to ${chat.name} group..🤗`);

        //now i will emit another event to the members of the group expect the creator or me as i can make changes in my frontend by myself but  i can change their frontend and showcase the group there only byy emiting event to them

        emitEvent(req, FETCH_CHAT, uniqueMembers);//no message required

        resp.status(200).json({
            success: true,
            message: 'members added',
            chat: updatedChat
        })

    } catch (err) {
        console.log('error occured while adding members to group', err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error',
            error: err.message
        })
    }
}

//controller for removing members
exports.removeMember = async (req, resp) => {
    try {

        const { members, chatId } = req.body;

        const group = await Chat.findById(chatId);
        if (!group || !group.groupChat) {
            return resp.status(404).json({
                success: false,
                message: 'chat with passed id is not found or the chat is not a group chat'
            })
        }

        if (group.creator.toString() !== req.user.id.toString()) {
            return resp.status(401).json({
                success: false,
                message: 'you are not creator of the group'
            })
        }

        //check that if after removing members the group must have atleast 3 members
        if (group.members.length - members.length < 3) {
            return resp.status(422).json({
                message: 'removal will cause less than 3 members in group'
            })
        }

        group.members = group.members.filter((member) => !members.includes(member.toString()));

        const updatedGroup = await group.save();

        //here in the data part i can notify remaing members about the removed members
        emitEvent(req, FETCH_CHAT, updatedGroup.members);

        resp.status(200).json({
            success: true,
            group: updatedGroup,
            message: 'members removed'
        })

    } catch (err) {
        console.log('error occured while removing members', err.message);
        console.error(err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}

//more controllers

//leavegroup

exports.leaveGroup = async (req, resp) => {
    try {
        //i will get the chat id fro the dynamic url
        const chatId = req.params.id;

        const chat = await Chat.findById(chatId);
        if (!chat) {
            return resp.status(404).json({
                message: 'chat not found'
            })
        }

        if (!chat.groupChat) {
            return resp.status(400).json({
                message: 'chat is not group chat'
            })
        }

        //finding remaing members

        const remainingMembers = chat.members.filter((member) => member.toString() !== req.user.id.toString());

        if (remainingMembers.length < 3) {
            return resp.status(422).json({
                message: 'group can not have less than 3 members'
            })
        }

        //edge case
        //agar leave karne wala insan khud creator ho to
        if (chat.creator.toString() === req.user.id.toString()) {
            let rendomIndex = Math.floor(Math.random() * remainingMembers.length);
            const newCreator = remainingMembers[rendomIndex];
            chat.creator = newCreator;
        }

        chat.members = remainingMembers;
        //OR
        //we can use findByIdAndUpdate() method for this in which i will use $pull operator

        const updatedChat = await chat.save();

        const user = await User.findById(req.user.id);

        emitEvent(req, ALERT, remainingMembers, `user ${user.userName} has left the ${chat.name} group`);

        //dekehnge ye jarorat hai ki nehi
        emitEvent(req, FETCH_CHAT, [req.user.id]);

        return resp.status(200).json({
            success: true,
            updatedChat,
            message: 'successfully left the group'
        })

    } catch (err) {

    }
}

//for normal messages we need not to create any controller as that will be handled by the sockket server itself
//but for sending attachments we have to create one as that will include saving the attachments to the cloudinary

//send attachments

exports.sendAttachments = async (req, resp) => {
    try {

        //i need to send the chatid in the request body so that i can save the attachments to that chat document
        const { chatId } = req.body;

        //create an array of promises to find out the chat and the user requested to validate them
        const [chat, user] = await Promise.all([
            Chat.findById(chatId),
            User.findById(req.user.id, { userName: true }) //User.findById(req.user.id,"userName") //i can do this too..it is like sleecting some certain fields while populating
        ]);

        //valiadting the chat and user
        if (!chat || !user) {
            return resp.status(404).json({
                success: false,
                message: 'chat or user not found'
            })
        }

        //checking if the user is a member of the chat
        if (!chat.members.includes(req.user.id)) {
            return resp.status(401).json({
                success: false,
                message: 'you are not a member of the chat'
            })
        }

        //now i will check if the attachments are present
        if (!req.files || req.files.length === 0) {
            return resp.status(422).json({
                success: false,
                message: 'no attachments found'
            })
        }

        //now i will upload the attachments to the cloudinary
        const promises = req.files.map((file) => {

            // Determine resource type
            let resourceType = 'raw'; // default to raw
            const mimetype = file.mimetype;

            if (mimetype.startsWith('image/')) {
                resourceType = 'image';
            } else if (mimetype.startsWith('video/')) {
                resourceType = 'video';
            } else if (mimetype.startsWith('audio/')) {
                resourceType = 'audio';
            }


            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ resource_type: 'raw' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                         // Include resource_type in the resolved result
                            resolve({
                                ...result,
                                resource_type: resourceType
                            });
                    }
                }).end(file.buffer);
            })
        })

        const attachments = await Promise.all(promises);

        //printing the result to see the structure of the result
        console.log(attachments);

        const messageForRealtime = {
            sender: {
                _id: req.user.id,
                userName: user.userName
            },
            attachments,
            chatId
        };

        emitEvent(req, NEW_ATTACHMENT, chat.members, {
            message: messageForRealtime,
            chatId //check why this
        });

        //this event emitting is for alerting te user about the message
        emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

        //the attachments needed to be formated to have the structure as defined in the message model
        const formatedAttachments = attachments.map(({ public_id, secure_url,resource_type }) => ({resource_type,public_id, url: secure_url }));

        const messageForDb = {
            sender: req.user.id,
            attachments: formatedAttachments,
            chat: chatId
        };

        //save it to the message model
        const newMessage = await Message.create(messageForDb);

        resp.status(200).json({
            success: true,
            message: 'attachments uploaded successfully',
            formatedAttachments,
            newMessage
        })



    } catch (err) {
        console.log('error occured while sending attachments', err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}

//get messages

//get chat details

exports.getChatDetails = async (req, resp) => {
    //here it has two cases:- either there will be request to return chat details by populating the members or to not populate the members data
    try {

        if(req.query.populate === 'true'){

            const chat = await Chat.findById(req.params.id).populate('members','userName profilePic');

            if(!chat){
                return resp.status(404).json({
                    success:false,
                    message:'chat not found'
                })
            }

            return resp.status(200).json({
                success:true,
                chat,
                message:'chat details fetched'
            })

        }else{
            const chat = await Chat.findById(req.params.id);

            if(!chat){
                return resp.status(404).json({
                    success:false,
                    message:'chat not found'
                })
            }

            return resp.status(200).json({
                success:true,
                chat,
                message:'chat details fetched'
            })
        }

    } catch (err) {
        console.log('error occured while getting chat details', err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}

//controller for chat rename if it is a group chat
exports. renameChat = async(req,resp) => {
    try {
        const chatId = req.params.id;
        const {name} = req.body;

        const chat = await Chat.findById(chatId);

        if(!chat){
            return resp.status(404).json({
                success:false,
                message:'chat not found'
            })
        }

        if(!chat.groupChat){
            return resp.status(400).json({
                success:false,
                message:'chat is not a group chat'
            })
        }

        if(chat.creator.toString() !== req.user.id.toString()){
            return resp.status(401).json({
                success:false,
                message:'you are not authorized to rename the chat'
            })
        }

        chat.name = name;

        const updatedChat = await chat.save();

        emitEvent(req,FETCH_CHAT,chat.members);

        emitEvent(req,ALERT,chat.members,`group name changed to ${name}`);

        return resp.status(200).json({
            success:true,
            updatedChat,
            message:'chat renamed'
        })

    } catch (err) {
        console.log('error occured while renaming chat', err.message);
        resp.status(500).json({
            success:false,
            message:'internal server error'
        })
    }
}


//chat delete

exports.deleteChat = async (req, resp) => {
    try {
        const chat = await Chat.findById(req.params.id);

        if (!chat) {
            return resp.status(404).json({
                success: false,
                message: 'chat not found'
            });
        }

        if (chat.creator.toString() !== req.user.id.toString()) {
            return resp.status(401).json({
                success: false,
                message: 'you are not authorized to delete the chat'
            });
        }

        // Find messages with attachments
        const messages = await Message.find({ 
            chat: req.params.id, 
            attachments: { $exists: true, $not: { $size: 0 } } 
        });

        // Use Promise.all to handle attachment deletions properly
        const attachmentDeletionPromises = messages.flatMap(message => 
            message.attachments.map(async (attachment) => {
                try {
                    const result = await cloudinary.uploader.destroy(
                        attachment.public_id, 
                        { resource_type: attachment.resource_type || 'raw' }
                    );

                    console.log(`Attachment ${attachment.public_id} deletion result:`, result);
                    return result;
                } catch (error) {
                    console.error(`Error deleting attachment ${attachment.public_id}:`, error);
                    return null;
                }
            })
        );

        // Wait for all attachment deletion attempts to complete
        const deletionResults = await Promise.allSettled(attachmentDeletionPromises);

        // Optional: Log detailed results
        const deletionSummary = {
            total: deletionResults.length,
            deleted: deletionResults.filter(r => 
                r.status === 'fulfilled' && r.value && r.value.result === 'ok'
            ).length,
            notFound: deletionResults.filter(r => 
                r.status === 'fulfilled' && r.value && r.value.result === 'not found'
            ).length,
            errors: deletionResults.filter(r => r.status === 'rejected').length
        };

        console.log('Attachment Deletion Summary:', deletionSummary);

        // Delete messages associated with the chat
        await Message.deleteMany({ chat: req.params.id });

        // Delete the chat
        await Chat.findByIdAndDelete(req.params.id);

        // Notify chat members
        emitEvent(req, ALERT, chat.members, `chat ${chat.name} deleted by admin`);

        return resp.status(200).json({
            success: true,
            message: 'chat deleted',
            attachmentDeletionSummary: deletionSummary
        });

    } catch (err) {
        console.error('Error occurred while deleting chat', err);
        resp.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
};