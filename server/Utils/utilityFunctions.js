exports. getOtherMember = (members,id) => {
    return members.find((member)=>member._id.toString()!==id.toString());
}