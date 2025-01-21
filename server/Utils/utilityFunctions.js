const { userSocketMap } = require('../socketManager');

exports.getOtherMember = (members, id) => {
  return members.find((member) => member._id.toString() !== id.toString());
};

exports.getSockets = (users = []) => {
    console.log(userSocketMap);
    if (!userSocketMap) {
      throw new Error('userSocketMap is not initialized');
    }
    return users.map((user) => userSocketMap.get(user._id));
  };