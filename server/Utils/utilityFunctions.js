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