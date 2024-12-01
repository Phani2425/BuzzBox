const uploadProfileInstance = require('../Config/multerConfig');
const { LoginController } = require('../Controllers/AuthController/LoginController');
const { SignupController } = require('../Controllers/AuthController/SignupController');
const { FindUniqueUserName } = require('../Controllers/AuthController/UsernameController');
const { CreateNewGroup,getMyChats, getMyGroupChats, addMembers, removeMember } = require('../Controllers/ChatController/chat');
const { ProfileController, SearchUser } = require('../Controllers/UserController/ProfileController');
const { isAuthenticated } = require('../Middlewares/auth');

const router = require('express').Router();

//auth routes
router.post('/signup',uploadProfileInstance.single('image'),SignupController);
router.post('/login', LoginController);
router.post('/username', FindUniqueUserName);


//user Routes
router.get('/profile',isAuthenticated,ProfileController); 
//here in searchuser we are expecting a url like /user/search?name=phani  so while writing routes for it we only write the path part not the query part
router.get('/user/search',isAuthenticated,SearchUser);


// //group related routes
router.post('/chat/newgroup',isAuthenticated,CreateNewGroup);
router.get('/chat/mychats',isAuthenticated,getMyChats);
router.get('/chat/getMyGroups',isAuthenticated,getMyGroupChats);
router.put('/chat/addmember',isAuthenticated,addMembers);
router.put('/chat/removemember',isAuthenticated,removeMember);

module.exports = router;