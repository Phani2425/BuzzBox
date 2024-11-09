const uploadProfileInstance = require('../Config/multerConfig');
const { LoginController } = require('../Controllers/AuthController/LoginController');
const { SignupController } = require('../Controllers/AuthController/SignupController');
const { FindUniqueUserName } = require('../Controllers/AuthController/UsernameController');
const { newgroupChat } = require('../Controllers/ChatController/chat');
const { ProfileController } = require('../Controllers/UserController/ProfileController');
const { isAuthenticated } = require('../Middlewares/auth');

const router = require('express').Router();

//auth routes
router.post('/signup',uploadProfileInstance.single('image'),SignupController);
router.post('/login', LoginController);
router.post('/username', FindUniqueUserName);


//user Routes
router.get('/profile',isAuthenticated,ProfileController); 

//group creation
router.post('/chat/newgroup',isAuthenticated,newgroupChat);

module.exports = router;