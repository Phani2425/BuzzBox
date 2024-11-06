const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../../Models/User');
const bcryptjs = require('bcryptjs');


exports.SignupController = async (req, resp) => {
    try {
        const { email, password, userName } = req.body;
        if (!email || !password || !userName) {
            return resp.status(400).json({ error: 'please fill all the fields' })
        }
        const profilePic = req.file.path;
        if (!profilePic) {
            return resp.status(400).json({ error: 'please upload a profile pic' })
        }
        //storing the password by encrypting it

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
            userName,
            profilePic
        })

        const newUser = await user.save();

        if (newUser) {
            return resp.status(201).json({ message: 'user created successfully' })
        } else {
            return resp.status(500).json({ error: 'user can not be created' })
        }

    } catch (err) {
        console.log('error occured while creating user', err.message);
        return resp.status(500).json({ error: 'internal server error' })
    }
}