const {uploadProfileInstance,uploadAttachments} = require('../Config/multerConfig');
const { getAllUsers, getAllChats, getAllMessages, getStats, AdminLogin, getChatMessages } = require('../Controllers/AdminController/AdminControllers');
const { LoginController } = require('../Controllers/AuthController/LoginController');
const { SignupController, oauthSignup, setUserName } = require('../Controllers/AuthController/SignupController');
const { FindUniqueUserName } = require('../Controllers/AuthController/UsernameController');
const { CreateNewGroup,getMyChats, getMyGroupChats, addMembers, removeMember, leaveGroup, sendAttachments, getChatDetails, renameChat, deleteChat, getMessages, getAllGroupChats, getMessagesAfterMyLastSeen } = require('../Controllers/ChatController/chat');
const { ProfileController, SearchUser, sendFriendRequest, acceptFriendRequest, getRequests, rejectFriendRequest, getMyFriends, updateProfile } = require('../Controllers/UserController/ProfileController');
const { isAdminAuthenticated } = require('../Middlewares/adminAuth');
const { isAuthenticated } = require('../Middlewares/auth');

const router = require('express').Router();

//auth routes
router.post('/signup',uploadProfileInstance.single('image'),SignupController);
router.post('/oauth/signup',oauthSignup);
router.post('/login', LoginController);
router.post('/username', FindUniqueUserName);



//user Routes
router.post('/setusername',setUserName);
router.get('/profile',isAuthenticated,ProfileController);
router.put('/profile/updateprofile',isAuthenticated,uploadProfileInstance.single('image'),updateProfile); 
//here in searchuser we are expecting a url like /user/search?name=phani  so while writing routes for it we only write the path part not the query part
router.get('/user/search',isAuthenticated,SearchUser);
router.get('/user/getmyfriends',isAuthenticated,getMyFriends);
router.get('/user/getrequests',isAuthenticated,getRequests);
router.post('/user/sendrequest',isAuthenticated,sendFriendRequest);
router.post('/user/acceptrequest',isAuthenticated,acceptFriendRequest);
router.put('/user/rejectrequest',isAuthenticated,rejectFriendRequest);


// //group related routes
router.post('/chat/newgroup',isAuthenticated,CreateNewGroup);
router.get('/chat/mychats',isAuthenticated,getMyChats);
router.get('/chat/getMyGroups',isAuthenticated,getMyGroupChats);
router.get('/chat/getallgroups',isAuthenticated,getAllGroupChats);
router.put('/chat/addmember',isAuthenticated,addMembers);
router.put('/chat/removemember',isAuthenticated,removeMember);
router.delete('/chat/leavegroup/:id',isAuthenticated,leaveGroup);
router.get('/chat/getunreadmessages',isAuthenticated,getMessagesAfterMyLastSeen);

//send attachment route
router.post('/message',isAuthenticated,uploadAttachments.array('files',10),sendAttachments);

//chat related routes

//when multiple controller have same route but different http methods we use route() method along with method chaining
router.route('/chat/:id').get(isAuthenticated,getChatDetails).put(isAuthenticated,renameChat).delete(isAuthenticated,deleteChat);

//this is simmilar to :-
// router.get('/chat/:id',A);
// router.put('/chat/:id',A);
// router.delete('/chat/:id',A);

//router for fetching the messages of a chat
router.get('/messages/:id',isAuthenticated,getMessages);

//router for admin controllers
router.post('/admin/login',AdminLogin);
router.get('/admin/getusers',getAllUsers);
router.get('/admin/getchats',getAllChats);
router.get('/admin/getmessages',getAllMessages);
router.get('/admin/getstats',getStats);
router.get('/admin/getchatmessages/:id',getChatMessages);

module.exports = router;