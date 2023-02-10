//这里是项目入口
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);

//const fs = require('fs');
const Port=3005;

app.use('/',express.static(__dirname+'/src'));//app.js所在的是根目录，所以这里设置的静态目录是 root/src


let userList=[];//目前连接的所有用户列表
io.on('connection',socket=>{
    socket.emit('success',socket.id);//把id返回给客户端，由客户端自行保存

    socket.on('info',info=>{
        userList.push(info);//添加到在线用户列表
        io.emit('userList',userList);//广播在线用户列表
    })


    socket.on('disconnect',()=>{
        let index=userList.findIndex(item=>{
            return item.sid==socket.id;
        })//找到用户
        io.emit('quit',userList[index]);
        userList.splice(index,1);//删除掉这个用户
    })
})

http.listen(Port,()=>{
    console.log(`socket Listening : http://localhost:${Port}/index.html?uid=1`)
})

