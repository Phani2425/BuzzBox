const Chat = require('../Models/Chat');
const User = require('../Models/User');
const { userSocketMap } = require('../socketManager');

exports.getOtherMember = (members, id) => {
  return members.find((member) => member._id.toString() !== id.toString());
};

exports.getSockets = (users = []) => {
    if (!userSocketMap) {
      throw new Error('userSocketMap is not initialized');
    }
    return users.map((user) => userSocketMap.get(user));
  };


  exports.getAllGroups = async (userId) => {
      try {
  
          const chats = await Chat.find({ members: { $in: [userId] }, groupChat:true },{_id:1});
          // console.log(chats);
  
      
          return chats;
  
      } catch (err) {
          console.error(err);
          console.log('error occured while fetching my chats', err.message);
          return [];
  
      }
  }

  // function thhat will save the last seen of the user in the user database when it is called
  exports. saveLastSeen = async (userId) => {
    try{

      const user = await User.findById(userId);
      if(!user){
        console.log('user not found while saving the last seen');
        return;
      }
      user.lastSeen = new Date();

      await user.save();

    }catch(err){
      console.log('error occured while saving the last seen time of the user',err.message);
    }
  }