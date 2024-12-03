const mongoose = require('mongoose');
const User = require('../../Models/User');
const Chat = require('../../Models/Chat');
const Request = require('../../Models/Requests');
const { emitEvent } = require('../../Utils/emitEvent');
const { FETCH_CHAT, NEW_REQUEST, ACCEPT_REQUEST } = require('../../Constants/events');

//anyone can only access this route if he is authenticated meanse he is logedin the website

exports.ProfileController = async (req, resp) => {
   try {
      //as we are coming here after going through the auth middleware so we have the user in the req object
      const userId = req.user.id;
      //fetch the user profile
      const user = await User.findById(userId);
      if (!user) {
         return resp.status(404).json({ error: 'user not found' })
      }
      return resp.status(200).json({ user: user })
   } catch (err) {
      console.log('error occured while fetching profile', err.message);
      resp.status(500).json({ error: 'internal server error' })
   }
}

//controller for updating the profile of the user
exports.updateProfile = async (req, resp) => {
   try {
       const userId = req.user.id;

       if (!userId) {
           return resp.status(401).json({ error: 'unauthorized' });
       }

       const user = await User.findById(userId);
       if (!user) {
           return resp.status(404).json({ error: 'user not found' });
       }

       const { userName, bio } = req.body;
       if (userName) user.userName = userName;
       if (bio) user.bio = bio;
       if (req.file) user.profilePic = req.file.path;

       await user.save();

       return resp.status(200).json({ success: true, user });

   } catch (err) {
       console.log('Error occurred while updating profile', err.message);
       return resp.status(500).json({ error: 'internal server error' });
   }
};

//controller for finding my friends
exports.getMyFriends = async (req, resp) => {
   try {
      //fetch all the chats where i am a member
      const singleChatMembers = await Chat.find({ groupChat: false, members: { $in: [req.user.id] } }, { members: 1 });

      // console.log(singleChatMembers);

      const friends = singleChatMembers.map(chat => chat.members.find(member => member._id.toString() !== req.user.id));

      // console.log(friends);

      //fetch all the users who are my friends
      const users = await User.find({ _id: { $in: friends } }, { userName: 1, profilePic: 1 }).lean();

      //return the response
      resp.status(200).json({
         success: true,
         users
      })

   } catch (err) {
      console.log('error occured while fetching friends', err.message);
      resp.status(500).json({
         success: false,
         message: 'error occuered while fetching friends'
      })
   }
}

//controller for searching users

//basically when the user clicks on the search button in the frontend then all the users which are not my friend will be shown there as the search field is empty and when user types anything then i will implement debouncing to find users with that username and show them in the search result
//if no such user is found then i will show no user found
exports.SearchUser = async (req, resp) => {
   try {

      //fetching the username from query of url
      const { userName } = req.body;
      //ye username either empty hoga ya phir kuch likha hoga
      //agar empty hoga toh i will return all the users which are not my friend
      //agar kuch likha hoga toh i will return all the users which are not my friend and whose username matches the query

      const singleChatMembers = await Chat.find({ groupChat: false, members: { $in: [req.user.id] } }, { members: 1 });

      // console.log(singleChatMembers);

      const friends = singleChatMembers.map(chat => chat.members.find(member => member._id.toString() !== req.user.id));

      // console.log(friends);

      //fetch all the users which are not my friend
      const users = await User.find({ _id: { $nin: friends } }, { userName: 1, profilePic: 1 }).lean();

      //do some operations
      if (userName.trim().length > 0) {
         //if the username is not empty then filter the users whose username matches the query
         const filteredUsers = users.filter(user => user.userName.toLowerCase().includes(userName.toLowerCase()));
         //return response
         return resp.status(200).json({
            success: true,
            users: filteredUsers
         })
      }

      //else return all the users who are not friend

      resp.status(200).json({
         success: true,
         users
      })

   } catch (err) {
      console.log('error occured while searching user', err.message);
      resp.status(500).json({
         success: false,
         message: 'error occuered while searching user'
      })
   }
}

//think that if i would have defined the friend array in the user field then how easy it would have been to find the friends of the user and implemnt the search functionality

//controller for fetching friend requests whic i recieved and i have sent to others and send these two information to the frontend so that it can show the requests in the frontend
// Controller for fetching friend requests
exports.getRequests = async (req, resp) => {
   try {
      const userId = req.user.id;

      // Fetch friend requests where the user is the receiver
      const receivedRequests = await Request.find({ receiver: userId }).populate('sender', 'userName profilePic');

      // Fetch friend requests where the user is the sender
      const sentRequests = await Request.find({ sender: userId }).populate('receiver', 'userName profilePic');

      // Send the requests to the frontend
      return resp.status(200).json({
         success: true,
         receivedRequests,
         sentRequests
      });

   } catch (err) {
      console.log('Error occurred while fetching friend requests', err.message);
      return resp.status(500).json({
         success: false,
         message: 'Error occurred while fetching friend requests'
      });
   }
};

// Controller for sending friend request
exports.sendFriendRequest = async (req, resp) => {
   try {
      const { receiverId } = req.body;
      const senderId = req.user.id;

      // Check if a request already exists
      const existingRequest = await Request.findOne({
         $or: [{
            sender: senderId,
            receiver: receiverId,
            status: 'pending'
         }, {
            sender: receiverId,
            receiver: senderId,
            status: 'pending'
         }]
      });

      if (existingRequest) {
         return resp.status(400).json({
            success: false,
            message: 'Friend request already sent'
         });
      }

      // Create a new friend request
      const newRequest = await Request.create({
         sender: senderId,
         receiver: receiverId
      });

      emitEvent(req, NEW_REQUEST, [receiverId], 'new Friend Request');

      return resp.status(200).json({
         success: true,
         message: 'Friend request sent successfully',
         request: newRequest
      });

   } catch (err) {
      console.log('Error occurred while sending friend request', err.message);
      resp.status(500).json({
         success: false,
         message: 'Error occurred while sending friend request'
      });
   }
};

// Controller for accepting friend request
exports.acceptFriendRequest = async (req, resp) => {
   try {

      const receiverId = req.user.id;
      const requestId = req.body.requestId;

      // Find the friend request
      const friendRequest = await Request.findOne({
         _id: requestId,
         receiver: receiverId,
         status: 'pending'
      });

      if (!friendRequest) {
         return resp.status(404).json({
            success: false,
            message: 'Friend request not found'
         });
      }

      // Update the status to accepted
      friendRequest.status = 'accepted';
      await friendRequest.save();

      //create a chat between the two users
      const chat = new Chat({
         groupChat: false,
         members: [friendRequest.sender, receiverId]
      });

      await chat.save();

      emitEvent(req, ACCEPT_REQUEST, [friendRequest.sender], `Friend Request Accepted by ${friendRequest.receiver}`);

      //emit event to refetch chat to both user
      emitEvent(req, FETCH_CHAT, [friendRequest.sender, receiverId]);

      return resp.status(200).json({
         success: true,
         message: 'Friend request accepted successfully',
         request: friendRequest
      });

   } catch (err) {
      console.log('Error occurred while accepting friend request', err.message);
      resp.status(500).json({
         success: false,
         message: 'Error occurred while accepting friend request'
      });
   }
};

//controller for rejecting friend request
exports.rejectFriendRequest = async (req, resp) => {
   try {

      const receiverId = req.user.id;
      const requestId = req.body.requestId;

      // Find the friend request
      const friendRequest = await Request.findOne({
         _id: requestId,
         receiver: receiverId,
         status: 'pending'
      });

      if (!friendRequest) {
         return resp.status(404).json({
            success: false,
            message: 'Friend request not found'
         });
      }

      // Update the status to rejected
      friendRequest.status = 'rejected';
      await friendRequest.save();

      return resp.status(200).json({
         success: true,
         message: 'Friend request rejected successfully',
         request: friendRequest
      });

   } catch (err) {
      console.log('Error occurred while rejecting friend request', err.message);
      resp.status(500).json({
         success: false,
         message: 'Error occurred while rejecting friend request'
      });
   }
}

// when an error occurs in an HTTP request, the response object is typically wrapped inside an error object. This is common when using libraries like Axios for making HTTP requests.

// Example with Axios:
// When you make a request with Axios and the server responds with an error status code (e.g., 400), the error object will contain the response object.

// 1xx Informational: Request received, continuing process.
// 2xx Success: The action was successfully received, understood, and accepted.
// 3xx Redirection: Further action must be taken to complete the request.
// 4xx Client Error: The request contains bad syntax or cannot be fulfilled.
// 5xx Server Error: The server failed to fulfill an apparently valid request.
// Common Success Codes (2xx):
// 200 OK: The request has succeeded.
// 201 Created: The request has been fulfilled and resulted in a new resource being created.
// 202 Accepted: The request has been accepted for processing, but the processing has not been completed.
// 204 No Content: The server successfully processed the request, but is not returning any content.
// Common Client Error Codes (4xx):
// 400 Bad Request: The server could not understand the request due to invalid syntax.
// 401 Unauthorized: The client must authenticate itself to get the requested response.
// 403 Forbidden: The client does not have access rights to the content.
// 404 Not Found: The server can not find the requested resource.
// 409 Conflict: The request could not be completed due to a conflict with the current state of the resource.
// Common Server Error Codes (5xx):
// 500 Internal Server Error: The server has encountered a situation it doesn't know how to handle.
// 502 Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream server.
// 503 Service Unavailable: The server is not ready to handle the request.