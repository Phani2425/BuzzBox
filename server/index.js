const express = require('express');
const { connectToDatabase } = require('./Config/database');
const app = express();
require('dotenv').config();
const cors =  require('cors');
const cookieParser = require('cookie-parser');
const router = require('./Routes/route');
// const { messageSeeder, singleChatSeeder, groupChatSeeder } = require('./seeders/chatseed');
// const { createFakeUser } = require('./seeders/userseed');


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true
    //important for cookies as we will be passing cookies in request headers
}))

//routes section
app.use('/api/v1',router);

app.get('/',(_,resp) => {
 resp.send('app is up and running')
})

connectToDatabase();

//database seeding functions

// createFakeUser(20);
// singleChatSeeder('674e0f64a9090787c28131da',10);
// groupChatSeeder('674e0f64a9090787c28131da',10);
// messageSeeder('674e06be737690061d1fc1ad',38);


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`server is listening at port ${PORT}`)
})