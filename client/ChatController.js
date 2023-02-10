const FriendChatModel=require('./entities').FriendChatModel;
const GroupChatModel=require('./entities').GroupChatModel;
const { Op } = require("sequelize");

exports.addFriendChatHistory=async(data)=>{
    await FriendChatModel.create({
        uid_from:data.uidFrom,
        uid_to:data.uidTo,
        message:data.message,
        time:data.time
    })
    .then(res=>{
        //console.log('addFriendChatHistory:',res);
    })
    .catch(err=>{
        //console.log('addFriendChatHistory Error:',err);
    })
}

exports.addGroupChatHistory=async(data)=>{
    await GroupChatModel.create({
        uid_from:data.uidFrom,
        uid_to:data.uidTo,
        message:data.message,
        time:data.time,
        group_id:data.groupId
    })
    .then(res=>{
        //console.log('addFriendChatHistory:',res);
    })
    .catch(err=>{
        //console.log('addFriendChatHistory Error:',err);
    })
}

exports.getFriendChatHistory=async(data)=>{
    let res=await FriendChatModel.findAll({
        where:{
            uid_from:data.uidFrom,
            uid_to:data.uidTo,
        }
    })
    .catch(err=>{
        //console.log('getFriendChatHistory Error:',err);
    })
    return res;
}