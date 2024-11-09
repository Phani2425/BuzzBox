const mongoose = require('mongoose');
const User = require('../../Models/User');

//anyone can only access this route if he is authenticated meanse he is logedin the website

exports. ProfileController = async(req,resp) => {
   try{
     //as we are coming here after gooing through the auth middleware so we have the user in the req object
     const userId = req.user.id;
        //fetch the user profile
        const user = await User.findById(userId);
        if(!user){
            return resp.status(404).json({error:'user not found'})
        }
        return resp.status(200).json({user:user})
   }catch(err){
    console.log('error occured while fetching profile',err.message);
    resp.status(500).json({error:'internal server error'})
   }
}

//controller for searching users