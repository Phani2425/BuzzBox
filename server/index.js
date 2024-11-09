const express = require('express');
const { connectToDatabase } = require('./Config/database');
const app = express();
require('dotenv').config();
const cors =  require('cors');
const cookieParser = require('cookie-parser');
const uploadProfileInstance = require('./Config/multerConfig');
const { SignupController } = require('./Controllers/AuthController/SignupController');
const router = require('./Routes/route');


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true
    //important for cookies as we will be passing cookies in request headers
}))

//routes section
app.use('/api/v1',router);

app.get('/',(req,resp) => {
 resp.send('app is up and running')
})

connectToDatabase();


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`server is listening at port ${PORT}`)
})