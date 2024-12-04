const { userSocketMap } = require("..");

exports. getOtherMember = (members,id) => {
    return members.find((member)=>member._id.toString()!==id.toString());
}

exports. getSockets = (users=[]) => 
   users.map((user) => userSocketMap.get(user._id.toString()));
