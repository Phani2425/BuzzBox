//this is the seeder function which will recieve any chatid and create fake messages for that chat

const Chat = require("../Models/Chat");
const Message = require("../Models/Message");
const { faker } = require('@faker-js/faker');
const User = require("../Models/User");

//before message seeder create chat seeder so that we can have some chat to create messages
//chat seeder will be for creating single chat and group chat by keeping the user as creator whose id will be passed as argument

//these seeder function will fetch random users from the database and add them as members of the chat
exports.singleChatSeeder = async (creatorId, count = 1) => {
    try {
        if (count < 1) throw new Error('Count must be at least 1');

        const chatPromises = Array(count).fill().map(async () => {
            // Get random user excluding creator
            const randomUser = await User.findOne({
                _id: { $ne: creatorId }
            }).lean();

            if (!randomUser) throw new Error('No other users found');

            return Chat.create({
                name: randomUser.userName || 'Single Chat',
                groupChat: false,
                creator: creatorId,
                members: [creatorId, randomUser._id]
            });
        });

        const createdChats = await Promise.all(chatPromises);
        console.log(`Created ${count} single chats successfully`);
        return createdChats;

    } catch (error) {
        console.error('Error in singleChatSeeder:', error);
        throw error;
    }
};

exports.groupChatSeeder = async (creatorId, count = 1) => {
    try {
        if (count < 1) throw new Error('Count must be at least 1');

        const chatPromises = Array(count).fill().map(async () => {
            // Get 3-5 random users excluding creator
            const memberCount = Math.floor(Math.random() * 3) + 3;
            
            const randomUsers = await User.find({
                _id: { $ne: creatorId }
            })
            .limit(memberCount)
            .lean();

            if (randomUsers.length === 0) throw new Error('No other users found');

            return Chat.create({
                name: faker.word.words(2),
                groupChat: true,
                creator: creatorId,
                members: [creatorId, ...randomUsers.map(user => user._id)]
            });
        });

        const createdChats = await Promise.all(chatPromises);
        console.log(`Created ${count} group chats successfully`);
        return createdChats;

    }catch (error) {
        console.error('Error in groupChatSeeder:', error);
        throw error;
    }
};

exports.messageSeeder = async (chatId, count) => {

    try {

        //first fetch the chat by the chatid

        const chat = await Chat.findById(chatId).lean();
        if (!chat) {
            console.log('chat with the passed chat id does not exists');
            return;
        }

        const chatMembers = chat.members;

        const getRandomMemeber = () => {
            return chatMembers[Math.floor(Math.random() * chatMembers.length)];
        }

        //then create an Fakeobject using fakerjs which will get saved in the message model 

        const messagesPromises = [];

        for (let i = 0; i < count; i++) {
            const newMessage = new Message({
                sender: getRandomMemeber(),
                content: faker.lorem.words({min:7, max:10}), // For random words
                chat: chatId
            })

            messagesPromises.push(newMessage.save());
        }

        //settle all the promises using promise.all() method
        await Promise.all(messagesPromises)
            .then((_) => {
                console.log('messages got created')
            }).catch((err) => {
                console.log('error occuered while settling the prmises', err.message)
            })

    } catch (err) {
        console.error('Error occurred while creating fake messages:', err.message);
        return;
    }

}