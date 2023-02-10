const GroupsModel=require('../models').GroupsModel;
const GroupMemberModel=require('../models').GroupMemberModel;
const GroupJoinModel=require('../models').GroupJoinModel;
const GroupInviteModel=require('../models').GroupInviteModel;
const BasicService=require('./BasicService');
const { Op } = require("sequelize");


/**
 * 创建群聊
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.createGroup=async(req,res)=>{
    let uid =req.body.uid;
    let groupName=req.body.groupName;
    let members=JSON.parse(req.body.members);
    //console.log(uid,groupName,members);//打印

    let group=await GroupsModel.findOne({
        where:{
            group_name:groupName
        }
    })
    .catch(err=>{
        res.status(500).send("名称验证失败");
        return;
    })

    if(group!=null){
        res.status(400).send("名称已被使用");
        return;
    }

    let newGroup=await GroupsModel.create({
        group_name:groupName,
        creator_id:uid
    })
    .catch(err=>{
        res.status(500).send("群聊初始化失败");
    })
    //res.send(newGroup);
    let groupId=newGroup.group_id;
    let group_members=[];
    members.forEach(i => {
        group_members.push({
            group_id:groupId,
            uid:i
        })
    });
    await GroupMemberModel.bulkCreate(group_members)
    .then(data=>{
        res.send("创建成功")
    })
    .catch(err=>{
        res.status(500).send("群成员初始化失败");
    })
}

/**
 * 解散群聊
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteGroup=async(req,res)=>{
    let uid=req.body.uid;
    let groupId=req.body.groupId;
    await GroupsModel.destroy({
        where:{
            creator_id:uid,//必须是群主才能删除
            group_id:groupId
        }
    })
    .catch(err=>{res.status(500).send("操作失败")})

    await GroupMemberModel.destroy({
        where:{
            group_id:groupId
        }
    })
    .catch(err=>{res.status(500).send("操作失败")})

    res.send("删除成功")

}


/**
 * 获取参与的群聊
 * @param {*} req 
 * @param {*} res 
 */
exports.myGroups=async(req,res)=>{
    let uid=req.query.uid;
    let groups=[];
    let created=await GroupsModel.findAll({
        where:{
            creator_id:uid
        }
    }) .catch(err=>{res.status(500).send("操作失败")})

    groups=groups.concat(created);//数组合并
    
    let joined=await GroupMemberModel.findAll({
        where:{
            uid:uid,
        }
    }) .catch(err=>{res.status(500).send("操作失败")})

    console.log(joined);
    let ids=[];
    joined.forEach(item => {
        ids.push(item.group_id);
    });
    let joinedGroups=await GroupsModel.findAll({
        where:{
            group_id:{
                [Op.in]:ids
            }
        }
    }) .catch(err=>{res.status(500).send("操作失败")})

    groups=groups.concat(joinedGroups);
    res.send(groups);
}

/**
 * 根据群聊id查找
 * @param {}} req 
 * @param {*} res 
 */
exports.findById=async(req,res)=>{
    let id=req.query.groupId;
    let group=await GroupsModel.findOne({
        where:{
            group_id:id
        }
    })
    if(group==null){
        res.status(400).send(null);
    }
    else{
        res.send(group);
    }
}

/**
 * 根据群聊名称查找
 * @param {*}} req 
 * @param {*} res 
 */
exports.findByName=async(req,res)=>{
    let name=req.query.groupName;
    let group=await GroupsModel.findOne({
        where:{
            group_name:name
        }
    })
    if(group==null){
        res.status(400).send(null);
    }
    else{
        res.send(group);
    }
}

/**
 * 申请加入群聊
 * @param {*} req 
 * @param {*} res 
 */
exports.applyForGroup=async(req,res)=>{
    let uid=req.body.uid;
    let groupId=req.body.groupId;
    let row=await GroupMemberModel.findOne({
        where:{
            uid:uid,
            group_id:groupId
        }
    })
    let row2=await GroupsModel.findOne({
        where:{
            creator_id:uid,
            group_id:groupId
        }
    })
    if(row!=null || row2!=null){
        res.status(400).send("你已经是群聊成员了");
    }
    else{
        let check2=await GroupJoinModel.findOne({
            where:{
                uid_from:uid,
                group_id:groupId
            }
        })
        if(check2!=null){
            res.status(400).send("已经发送过申请了，请耐心等待");
        }
        else{
            await GroupJoinModel.create({
                uid_from:uid,
                group_id:groupId
            })
            .catch(err=>{
                res.status(400).send("申请发送失败");
            })
            .then(data=>{
                res.send("申请发送成功");
            })
        }
    }
}


exports.getGroupApplications=async(req,res)=>{
    let uid=req.query.uid;
    let myGroups=await GroupsModel.findAll({
        where:{
            creator_id:uid,
        }
    })
    //找到自己创建的组
    let resData=[];
    if(myGroups.length>0){

        for(let i=0;i<myGroups.length;i++){
            let rows=await GroupJoinModel.findAll({
                where:{
                    group_id:myGroups[i].group_id
                }
            })

            for(let j=0;j<rows.length;j++){
                let user=await BasicService.findUserById(rows[j].uid_from)
                let resItem={
                    groupId:myGroups[i].group_id,
                    groupName:myGroups[i].group_name,
                    uid:user.uid,
                    userName:user.user_name,
                    description:user.description
                }
                resData.push(resItem);
            }
        }

        res.send(resData);
    }
    else {
        res.send(resData);
    }
}

exports.agreeApplication=async(req,res)=>{
    let uid=req.body.uidFrom;
    let groupId=req.body.groupId;
    GroupMemberModel.create({
        group_id:groupId,
        uid:uid
    })
    .then(()=>{
        return GroupJoinModel.destroy({
            where:{
                group_id:groupId,
                uid_from:uid
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

exports.rejectApplication=async(req,res)=>{
    let uid=req.body.uidFrom;
    let groupId=req.body.groupId;
    GroupJoinModel.destroy({
        where:{
            group_id:groupId,
            uid_from:uid
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