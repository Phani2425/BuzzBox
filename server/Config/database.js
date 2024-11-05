const mongoose = require('mongoose');
require('dotenv').config();

exports. connectToDatabase = () => {
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log('database connnection estabilished')
    }).catch((err)=>{
        console.log('databace connection can not be estabilished')
    })

}