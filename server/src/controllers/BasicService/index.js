const UserModel=require("../../models").UserModel;
const FriendsModel=require('../../models').FriendsModel;
const { Op } = require("sequelize");

exports.userExists=async function(uid){
    return new Promise(resolve=>{
        UserModel.findByPk(uid)
        .then(data=>{
            if(data==null)resolve(false);
            else resolve(true);
        })
        .catch(err=>{
            throw(err);//抛出错误
        })
    })
}

exports.isFriend=async function(uid1,uid2){
    return new Promise(resolve=>{
        FriendsModel.findOne({
            attributes: {
                exclude: ['id']
            },
            where:{
                [Op.or]:[
                    {
                        uid_a:uid1,
                        uid_b:uid2
                    },
                    {
                        uid_a:uid2,
                        uid_b:uid1
                    }
                ]
            }
        })
        .then(data=>{
            console.log(data);
            if(data==null)resolve(false);
            else resolve(true);
        })
        .catch(err=>{
            throw(err);
        })
    })
}

exports.findUserById=async function(uid){
    return new Promise((resolve,reject)=>{
        UserModel.findOne({
            attributes: {
                exclude: ['password']
            },
            where:{
                uid:uid
            }
        })
        .then(res=>{
            resolve(res)
        })
        .catch(err=>{
            reject(err);
        })
    })
}