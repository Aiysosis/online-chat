const FriendChatModel=require('../models').FriendChatModel
const GroupChatModel=require('../models').GroupChatModel
const UserModel=require('../models').UserModel
const BasicService=require('./BasicService')
const moment=require('moment');
const { Op } = require("sequelize");

exports.getFriendChatHistory=async(req,res)=>{
    let from=req.query.uidFrom;
    let to=req.query.uidTo;
    let data=await FriendChatModel.findAll({
        where:{
            [Op.or]:[
                {
                    uid_from:from,
                    uid_to:to,
                },
                {
                    uid_from:to,
                    uid_to:from
                }
            ]
        },
        order:[['time','ASC']]//按时间升序排列
    })
    .catch(err=>{
        res.status(500).send(err);
    })
    res.send(data);
}

exports.getGroupChatHistory=async(req,res)=>{
    let groupId=req.query.groupId;//获取组的id
    let data=await GroupChatModel.findAll({
        where:{
            group_id:groupId
        }
    })
    .catch(err=>{
        res.status(500).send(err);
    })
    console.log('data',data);
    if(data.length==0){res.send(data);return;}//空的话直接返回就行
    let result=[];
    new Promise(resolve=>{
        data.forEach((item,index)=>{
            BasicService.findUserById(item.uid_from)
            .then(r=>{
                let obj={
                    group_id:item.group_id,
                    user_from:r,
                    uid_to:item.uid_to,
                    message:item.message,
                    time:item.time
                }
                result.push(obj)
                if(index == data.length-1)resolve();//感觉写法不太优雅，可以考虑试一下promise的all方法
            })
        })
    })
    .then(()=>{
        res.send(result);
    })
} 