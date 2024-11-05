const cloudinary = require('cloudinary').v2;
require('dotenv').config();

exports. connectToCloudinary = () => {
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