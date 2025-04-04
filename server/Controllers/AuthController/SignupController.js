const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../../Models/User");
const jwt = require("jsonwebtoken");

exports.SignupController = async (req, resp) => {
  try {
    const { email, password, userName } = req.body;
    if (!email || !password || !userName) {
      return resp.status(400).json({ error: "please fill all the fields" });
    }
    const profilePic = req.file.path;
    if (!profilePic) {
      return resp.status(400).json({ error: "please upload a profile pic" });
    }

    //here i usually save the password by hashing it but i can use an other approach by including a  middleware to do this in the mongoose schema
    //both have same effect but i am doing this because as i ma using seeder to create fake user data and those will get saved to database without going throght this signup process so i am using such approach so that all password get hashed before saving and that is only possible in the middleware of schema approach

    const user = new User({
      email,
      password,
      userName,
      profilePic,
    });

    const newUser = await user.save();

    if (newUser) {
      return resp.status(201).json({ message: "user created successfully" });
    } else {
      return resp.status(500).json({ error: "user can not be created" });
    }
  } catch (err) {
    console.log("error occured while creating user", err.message);
    return resp.status(500).json({ error: "internal server error" });
  }
};

exports.oauthSignup = async (req, res) => {
  const { email, userName, profilePic } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        userName,
        profilePic,
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie('token',token,{
      httpOnly:true,
      maxAge:7*24*60*60*1000
  })

    res.status(200).json({
      success:'true',
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//controler for setting userName for users who signed in through the oauth or users who want to change their userName

exports.setUserName = async (req, res) => {
  const { userName, userId } = req.body;

  try {
    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const objectId = new mongoose.Types.ObjectId(userId); // Use 'new' keyword
    const user = await User.findById(objectId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.userName = userName;
    await user.save();

    return res.status(200).json({ success: true, message: "Username set successfully" });
  } catch (err) {
    console.error("Error occurred while setting username:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};