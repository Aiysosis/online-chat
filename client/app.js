//这里是项目入口
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);
const ChatController=require('./ChatController');

//const fs = require('fs');
const Port=3005;

app.use('/',express.static(__dirname+'/src'));//app.js所在的是根目录，所以这里设置的静态目录是 root/src


let userList=[];//目前连接的所有用户列表
io.on('connection',socket=>{
    socket.emit('success',socket.id);//把id返回给客户端，由客户端自行保存

    socket.on('info',info=>{
        userList.push(info);//添加到在线用户列表
        io.emit('userList',userList);//广播在线用户列表
        info.groups.forEach(item=>{
            socket.join(`${item.group_id}`);//加入群聊room
        })
    })

    socket.on('friendMsg',info=>{
        //保存到数据库
        let data={
            uidFrom:info.uidFrom,
            uidTo:info.uidTo,
            message:info.message,
            time:info.time
        }
        console.log(data);
        ChatController.addFriendChatHistory(data);

        if(info.sidTo!=null){
            //是在线请求
            socket.to(info.sidTo).emit('getFriendMsg',info);//直接转发消息
        }
    })

    socket.on('groupMsg',info=>{
        //保存到数据库
        let data={
            uidFrom:info.uidFrom,
            uidTo:info.uidTo,
            message:info.message,
            time:info.time,
            groupId:info.groupId,
        }
        ChatController.addGroupChatHistory(data)
        //不需要判断成员是否在线，直接广播消息
        io.to(info.groupId.toString()).emit('getGroupMsg',info);
    })

    socket.on('disconnect',()=>{
        let index=userList.findIndex(item=>{
            return item.sid==socket.id;
        })//找到用户
        io.emit('quit',userList[index]);
        userList.splice(index,1);//从在线列表中删除掉这个用户
    })
})

http.listen(Port,()=>{
    console.log(`http://localhost:${Port}/index.html`)
})

