const userSocketMap = new Map();

const addUserSocket = (userId, socketId) => {
  userSocketMap.set(userId, socketId);
};

const removeUserSocket = (userId) => {
  userSocketMap.delete(userId);
};

const getUserSocket = (userId) => {
  return userSocketMap.get(userId);
};

module.exports = {
  userSocketMap,
  addUserSocket,
  removeUserSocket,
  getUserSocket
};