const { getSockets } = require("./utilityFunctions");

exports.emitEvent = (req, event, users, data) => {
    try {
      const io = req.app.get('io');
      
      // console.log('Emitting event:', event);
      // console.log('To users:', users);
      // console.log('With data:', data);
  
      // Emit to all specified users

      const transformedUsers = users.map(user => user.toString())

      const membersSocketId = getSockets(transformedUsers);
      console.log('membersSocketId', membersSocketId);

      
        io.to(membersSocketId).emit(event, data);
      
      
    } catch (error) {
      console.error('Error in emitEvent:', error);
    }
  };