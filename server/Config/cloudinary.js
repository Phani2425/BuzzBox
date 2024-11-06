const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const { CloudinaryStorage } = require('multer-storage-cloudinary');

 connectToCloudinary = () => {
try{
    cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
    })

    console.log('connection to clodinary got estabilished')

}catch(err){
   console.log('error occured while estabilishing connection to cloudinary',err.message)
   console.error(err.messaage)
   //most imp
   process.exit(1);
}
}

connectToCloudinary();

//i am using multer to upload photo to cloudinary so we will be using an library to create an storage of cloudinary which will then passed inside the multer function to create an multer instance which will then be used an middleware to upload photos to cloudinary

const profileStorage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'BuzzBoxProfile',
        allowed_formats:['jpeg','png','jpg']
    }
})

module.exports = profileStorage;