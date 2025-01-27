//here we will define controllers for admin related routes
//adminlogin,logout,users,chats,messages,stats

//controller which will fetch all user data and return the users emailid,username,profilepic,the no of friends the user have and the no of groups the user in

const User = require('../../Models/User');
const Chat = require('../../Models/Chat');
const Request = require('../../Models/Requests');
const Message = require('../../Models/Message');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

//controller for admin to login into the admin panel

//in this controller there is no database operation still i will use async await and try catch block as i will create a token when the admin logs in and that process should be asyncronus

//but i was wrong the project is synchronus
const AdminLogin =  (req, resp) => {
    try {

      const EnteredKey = req.body.key;
      const secretKey = process.env.ADMIN_SECRET_KEY;

      if (!EnteredKey) {
        return resp.status(400).json({
            success: false,
            message: 'Key is required'
        });
    }

        if (EnteredKey !== secretKey) {
            return resp.status(400).json({
                success: false,
                message: 'Invalid key'
            });
        }

        //if they matched then i will create a token and send that to the admin in cookie
        const token = jwt.sign({}, process.env.ADMIN_JWT_SECRET, { expiresIn: '1d' });

        resp.cookie('admintoken',token,{
            httpOnly:true,
            maxAge:24*60*60*1000
        });

        resp.status(200).json({
            success: true,
            message: 'Admin logged in successfully',
            token
        })

    } catch (err) {

        console.log('Error occurred while logging in admin', err.message);
        return resp.status(500).json({
            success: false,
            message: 'Error occurred while logging in admin'
        });

    }
}

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

        const chats = await Chat.find({groupChat:true}).populate('members', 'userName profilePic').populate('creator', 'userName profilePic').lean();

        //i will transform each chat object befor sending that
        const transformedChats = await Promise.all(chats.map(async (chat, index) => {

            //fetch the number of members in the chat
            const membersCount = chat.members.length;

            const membersPictures = chat.members.slice(0, 3).map(member => {
                return member.profilePic;
            });

            //fetch the number of messages in the chat
            const messagesCount = await Message.countDocuments({ chat: chat._id });

            return {
                _id: chat._id,
                indexId: index + 1,
                avtar: chat.groupChat ? membersPictures : chat.members[0].profilePic,
                name: chat.groupChat ? chat.name : 'no Name',
                membersCount,
                membersPictures,
                messagesCount,
                creator: {
                    userName: chat.creator?.userName || 'none',
                    profilePic: chat.creator?.profilePic || ''
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

//controller for getting all messages
//intially i was thinking to fetch all messages and show that on a tab in admin panel but that will be a bad idea
//so i will just fetch the messages of a chat and show that in a modal when admin clicks on a chat in allchats tab
const getAllMessages = async (req, resp) => {
    try {

        
        const messages = await Message.find({}).populate('sender', 'userName profilePic').sort({ createdAt: 1 }).lean();

        const transformedMessages = messages.map(message => {
            return {
                _id: message._id,
                sender: {
                    id: message.sender._id,
                    userName: message.sender.userName,
                    profilePic: message.sender.profilePic
                },
                content: message.content,
                attachments: message.attachments,
                createdAt: message.createdAt.toLocaleDateString() + ' ' + message.createdAt.toLocaleTimeString()
            };
        });

        return resp.status(200).json({
            success: true,
            messages: transformedMessages
        });

    } catch (err) {
        console.log('Error occurred while fetching all messages', err.message);
        return resp.status(500).json({
            success: false,
            message: 'Error occurred while fetching all messages'
        });
    }
}

const getChatMessages = async (req, resp) => {
    try {

        if (!req.params.id || !mongoose.isValidObjectId(req.params.id)) {
            return resp.status(400).json({
                success: false,
                message: 'Invalid chat ID format'
            });
        }


        const chatId = new mongoose.Types.ObjectId(req.params.id);
        const messages = await Message.find({ chat:chatId }).populate('sender', 'userName profilePic').sort({ createdAt: 1 }).lean();

        const transformedMessages = messages.map(message => {
            return {
                _id: message._id,
                sender: {
                    id: message.sender._id,
                    userName: message.sender.userName,
                    profilePic: message.sender.profilePic
                },
                content: message.content,
                attachments: message.attachments,
                createdAt: message.createdAt.toLocaleDateString() + ' ' + message.createdAt.toLocaleTimeString()
            };
        });

        return resp.status(200).json({
            success: true,
            messages: transformedMessages
        });

    } catch (err) {
        console.log('Error occurred while fetching chat messages', err.message);
        return resp.status(500).json({
            success: false,
            message: 'Error occurred while fetching chat messages'
        });
    }
}

//controller for getting dashboard stats

//this will give us: user count,chat count,messages count
//chat me bhi single chat ka count,group chat ka count
//aur current week me kitne messages hue hai
//aur current week me kitne users aur chats create hue hai
//aur dekhna padega ki kya me previous weeks ka bhi data show kar sakta hnu ki nehi

//iskeliye me moment.js ka use karunga also i can do this without that as created in the tutorial
const getStats = async (req, resp) => {
    try {

        //i will get the week for which i will send no of messages made,no of users registered,no of chats created in that week
        //0 means current week,1 means previous week and so on
        const week = req.query.week || 0;

        //i will get the start date and end date of the week
        //before that i will get any date of that week so that i can apply "startOf()" and "endOf()" methods
        const dateOfWeek = moment().subtract(7 * week, 'days').toDate();
        //now getting the start and end date of the day
        const startDate = moment(dateOfWeek).startOf('week').toDate();
        const endDate = moment(dateOfWeek).endOf('week').toDate();

        //now i will get the users, chats and messages created in that week
        const [userCreated, chatCreated, messageCreated] = await Promise.all([
            User.find({ createdAt: { $gte: startDate, $lt: endDate } }),
            Chat.find({ createdAt: { $gte: startDate, $lt: endDate } }),
            Message.find({ createdAt: { $gte: startDate, $lt: endDate } })
        ])

        //i will send the total no fo created entities in that week but i will also send the created entities in each day of that week
        //so that i can show that on a graph
        const ArrayForUser = new Array(7).fill(0);
        const ArrayForChat = new Array(7).fill(0);
        const ArrayForMessage = new Array(7).fill(0);

        userCreated.forEach(user => {
            const day = moment(user.createdAt).day();
            ArrayForUser[day] += 1;
        })

        chatCreated.forEach(chat => {
            const day = moment(chat.createdAt).day();
            ArrayForChat[day] += 1;
        })

        messageCreated.forEach(message => {
            const day = moment(message.createdAt).day();
            ArrayForMessage[day] += 1;
        })

        //instead of creating promises and waiting for all to resolve we can use Promise.all() to do that
        const [userCount, chatCount, messageCount, groupCount] = await Promise.all([
            User.countDocuments(),
            Chat.countDocuments(),
            Message.countDocuments(),
            Chat.countDocuments({ groupChat: true })
        ])

        const stats = {
            userCount,
            chatCount,
            messageCount,
            groupCount,
            userCreated: userCreated.length,
            chatCreated: chatCreated.length,
            messageCreated: messageCreated.length,
            ArrayForUser,
            ArrayForChat,
            ArrayForMessage
        }

        return resp.status(200).json({
            success: true,
            stats
        });

    } catch (err) {
        console.log('Error occurred while fetching stats', err.message);
        return resp.status(500).json({
            success: false,
            message: 'Error occurred while fetching stats'
        });
    }
}

module.exports = { getAllUsers, getAllChats, getAllMessages, getStats, AdminLogin,getChatMessages };