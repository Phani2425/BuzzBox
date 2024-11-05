const express = require('express');
const { connectToDatabase } = require('./Config/database');
const { connectToCloudinary } = require('./Config/cloudinary');
const app = express();
require('dotenv').config();

app.get('/',(req,resp) => {
 resp.send('app is up and running')
})

connectToDatabase();
connectToCloudinary();

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`server is listening at port ${PORT}`)
})