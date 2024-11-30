const User = require('../../Models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

exports. LoginController = async (req, resp) => {
    console.log(process.env.JWT_SECRET)
    try{
        console.log(req.body);
        const {email,password} = req.body;
        if(!email || !password){
            return resp.status(400).json({error:'please fill all the fields'})
        }
        //find the user using the email and check if the password is matching or not
        const user = await User.findOne({email:email});
        if(!user){
            return resp.status(404).json({error:'user not found'})
        }
        const isMatching = await bcryptjs.compare(password,user.password);
        if(!isMatching){
            return resp.status(400).json({error:'password is incorrect'})
        }
        //generate the token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        resp.cookie('token',token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000
        })

        return resp.status(200).json({
            message:'login successfull',
            token,
            user:user
        })

    }catch(err){
        console.log('error occured while login',err.message);
        return resp.status(500).json({error:'internal server error'})
    }
}