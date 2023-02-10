const UserModel=require('../models').UserModel;
const BeFriendModel=require('../models').BeFriendModel;
const FriendsModel=require('../models').FriendsModel;
const BasicService=require('./BasicService');
const { Op } = require("sequelize");

//发送好友请求
exports.befriend=async (req,res)=>{
    let from=req.body.uidFrom;
    let to=req.body.uidTo;
    let userexist=await BasicService.userExists(to);
    if(!userexist){res.status(500).send("该用户不存在");return;}
    let isfriend=await BasicService.isFriend(from,to);
    if(isfriend){res.send("两人已经是好友了");return;}
    let check=await BeFriendModel.findOne({
        where:{
            uid_from:from,
            uid_to:to
        }
    })
    if(check!=null){
        res.status(400).send("请不要重复发送申请");
    }
    else{
        BeFriendModel.create({
            attributes: {
                exclude: ['id']
            },
            uid_from:from,
            uid_to:to
        })
        .then(data=>{
            res.send("申请已发送");
        })
        .catch(err=>{
            res.status(400).send("申请发送失败");
        })
    }
}

//获取好友请求
exports.getFriendApplication=(req,res)=>{
    BeFriendModel.findAll({
        where:{
            uid_to:req.query.uid
        }
    })
    .then(data=>{
        let ids=[];
        data.forEach(item => {
            ids.push(item.uid_from)
        });
        return UserModel.findAll({
            attributes: {
                exclude: ['password']
            },
            where:{
                uid:{
                    [Op.in]:ids
                }
            }
        })
    })
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send("获取失败");
    })
}

//同意好友请求
exports.aggreFriendApplication=async (req,res)=>{
    console.log(req.body);
    let from=req.body.uidFrom;
    let to=req.body.uidTo;
    FriendsModel.create({
        uid_a:from,
        uid_b:to,
    })
    .then(data=>{
        return BeFriendModel.destroy({
            where:{//如果两个人互相申请了好友，那么需要两边的申请都取消掉
                [Op.or]:[
                    {
                        uid_to:to,
                        uid_from:from,
                    },
                    {
                        uid_to:from,
                        uid_from:to,
                    }
                ]
            }
        })
    })
    .then(r=>{
        res.send("已同意请求");
    })
    .catch(err=>{
        res.status(500).send('操作失败');
    })
}

//忽略好友请求
exports.ignoreFriendApplication=async (req,res)=>{
    let from=req.body.uidFrom;
    let to=req.body.uidTo;
    BeFriendModel.destroy({
        //删掉对方发过来的好友请求
        where:{
            uid_to:to,
            uid_from:from,
        }
    })
    .then(r=>{
        //返回的是受影响的行数
        console.log(r);
        res.send("操作成功");
    })
    .catch(err=>{
        res.status(500).send('操作失败');
    })
}


//获取好友列表
exports.getFriends=async(req,res)=>{
    let uid=req.query.uid;
    let ids=[];
    await FriendsModel.findAll({
        where:{
            uid_a:uid,
        }
    })
    .then(data=>{
        data.forEach(item=>{
            ids.push(item.uid_b);
        })
    })
    // .catch(err=>{
    //     res.status(500).send("获取失败");
    //     return;
    // })

    await FriendsModel.findAll({
        //attributes:["uid_a"],
        where:{
            uid_b:uid,
        }
    })
    .then(data=>{
        data.forEach(item=>{
            ids.push(item.uid_a);
        })
    })
    .catch(err=>{
        res.status(500).send("获取失败");
        return;
    })
    
    await UserModel.findAll({
        attributes: {
            exclude: ['password']
        },
        where:{
            uid:{
                [Op.in]:ids
            }
        }
    })
    .then(data=>{
        res.send(data);
    })
}

//删除好友
exports.deleteFriend=async (req,res)=>{
    let uidSelf=req.body.uidSelf;
    let uidFriend=req.body.uidFriend;
    console.log(req.body);
    FriendsModel.destroy({
        where:{
            [Op.or]:[
                {
                    uid_a:uidSelf,
                    uid_b:uidFriend
                },
                {
                    uid_a:uidFriend,
                    uid_b:uidSelf
                }
            ]
        }
    })
    .then(data=>{
        res.send("已删除");
    })
    .catch(err=>{
        res.status(500).send("删除失败");
    })
}