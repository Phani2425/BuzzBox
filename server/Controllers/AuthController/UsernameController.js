const mongoose = require('mongoose');
const User = require('../../Models/User');

exports. FindUniqueUserName = async(req,resp) => {
    try{

        const {userName} = req.body;
        const user = await User.findOne({userName:userName});
        if(user){
            return resp.status(200).json({message:'username is already taken'})
        }else{
            return resp.status(200).json({message:'username is unique'})
        }

    }catch(err){
        console.log('error occured while finding unique username',err.message);
        return resp.status(500).json({error:'internal server error'})
    }
}
