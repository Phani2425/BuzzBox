//here we will define controllers for admin related routes
//adminlogin,logout,users,chats,messages,stats

//controller which will fetch all user data and return the users emailid,username,profilepic,the no of friends the user have and the no of groups the user in

const User = require('../../Models/User');
const Chat = require('../../Models/Chat');
const Request = require('../../Models/Requests');
const Message = require('../../Models/Message');

const getAllUsers = async (req, resp) => {
    try {
        // Fetch all users
        const users = await User.find({}, 'email userName profilePic').lean();

        // Iterate over each user to calculate the number of friends and groups
        const userData = await Promise.all(users.map(async (user) => {
            // Fetch the number of friends (accepted friend requests)
            const friendsCount = await Request.countDocuments({
                $or: [
                    { sender: user._id, status: 'accepted' },
                    { receiver: user._id, status: 'accepted' }
                ]
            });

            // Fetch the number of groups the user is in
            const groupsCount = await Chat.countDocuments({
                groupChat: true,
                members: user._id
            });

            return {
                email: user.email,
                userName: user.userName,
                profilePic: user.profilePic,
                friendsCount,
                groupsCount
            };
        }));

        // Return the user data
        return resp.status(200).json({
            success: true,
            users: userData
        });

    } catch (err) {
        console.log('Error occurred while fetching all users', err.message);
        return resp.status(500).json({
            success: false,
            message: 'Error occurred while fetching all users'
        });
    }
};

//controller for fetching all chats
const getAllChats = async (req, resp) => {
    try {

        const chats = await Chat.find({}).populate('members', 'userName profilePic').populate('creator', 'userName profilePic').lean();

        //i will transform each chat object befor sending that
        const transformedChats = await Promise.all(chats.map(async (chat, index) => {

            //fetch the number of members in the chat
            const membersCount = chat.members.length;

            const membersPictures = chat.members.slice(0, 5).map(member => {
                return member.profilePic;
            });

            //fetch the number of messages in the chat
            const messagesCount = await Message.countDocuments({ chat: chat._id });

            return {
                _id: chat._id,
                indexId: index,
                avtar: chat.groupChat ? chat.creator.profilePic : chat.members[0].profilePic,
                name: chat.name,
                membersCount,
                membersPictures,
                messagesCount,
                creator: chat.groupChat ? {
                    userName: chat.creator.userName,
                    profilePic: chat.creator.profilePic
                } : {
                    userName: chat.members[0].userName,
                    profilePic: chat.members[0].profilePic
                }
            };
        }))

        return resp.status(200).json({
            success: true,
            chats: transformedChats
        });

    } catch (err) {
        console.log('Error occurred while fetching all chats', err.message);
        return resp.status(500).json({
            success: false,
            message: 'Error occurred while fetching all chats'
        });
    }
}

module.exports = { getAllUsers, getAllChats };