const express = require('express');
const { connectToDatabase } = require('./Config/database');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./Routes/route');
// const { messageSeeder, singleChatSeeder, groupChatSeeder } = require('./seeders/chatseed');
// const { createFakeUser } = require('./seeders/userseed');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { NEW_MESSAGE_ALERT, NEW_MESSAGE } = require('./Constants/events');
const { v4: uuidv4 } = require('uuid');
const { getSockets } = require('./Utils/utilityFunctions');
const Message = require('./Models/Message');

const app = express();
const server = createServer(app);
const io = new Server(server, {});

exports.userSocketMap = new Map();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true
    //important for cookies as we will be passing cookies in request headers
}))

//routes section
app.use('/api/v1', router);

app.get('/', (_, resp) => {
    resp.send('app is up and running')
})

connectToDatabase();

//database seeding functions

// createFakeUser(20);
// singleChatSeeder('674e0f64a9090787c28131da',10);
// groupChatSeeder('674e0f64a9090787c28131da',10);
// messageSeeder('674e06be737690061d1fc1ad',38);

//we will get the user data from the authentication of user which will take place befor eaccesing the socket by the user
//there are two ways one is we send some token from frontend while connecting to the socket which is then checked here by:- socket.handshake.query.token like this and then we can get the user data from the token

//another way is to use middleware provided by the socket.io

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
        //check the token and get the user data
        //if the token is valid then we will call next() to allow the user to connect to the socket
        next();
    } else {
        next(new Error('unauthorized'));
    }
})  


io.on('connection', (socket) => {
    //assuming we have user info
    const user = {
        _id: 'jhvccv',
        name: 'phani',
    }
    //mapping the user id with its socket id
    userSocketMap.set(user._id.toString(), socket.id);
    //there will be a function named as getSocketID() which will take user id and return the current corresponding socket id

    console.log('a user connected with socket id', socket.id);

    console.log('userSocketMap', userSocketMap);

    socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {

        const messageForRealtime = {
            _id: uuidv4(),
            chat: chatId,
            content: message,
            sender: {
                _id: user._id,
                name: user.name
            },
            createdAt: new Date().toISOString()
        }


        const membersSocketId = getSockets(members);
        io.to(membersSocketId).emit(NEW_MESSAGE, {
            chatId,
            message: messageForRealtime
        });

        io.to(socket.id).emit(NEW_MESSAGE_ALERT, {
            chatId

        });

        socket.on('disconnect', () => {
            userSocketMap.delete(user._id.toString());
            console.log('user disconnected with socket id', socket.id);
        })

       try{

        const messageForDb = new Message(
            {
                chat: chatId,
                content: message,
                sender: user._id
            }
        )

        //save the message in bd
        await messageForDb.save();

       }catch(err){

        console.log('error occured while saving the message in db',err.message);

       }

    })
})


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`)
})