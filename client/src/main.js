const avatarUrl='https://ui-avatars.com/api/?size=128&background=0D8ABC&color=fff&font-size=0.4&length=1&name='
//import ChatController from '../ChatController';

function Methods(){}

Methods.prototype={
    //格式化时间
    formatDate(time,format='YY-MM-DD hh:mm:ss'){
        var date = new Date(time);
        var year = date.getFullYear(),
            month = date.getMonth()+1,//月份是从0开始的
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
        var preArr = Array.apply(null,Array(10)).map(function(elem, index) {
            return '0'+index;
        });//开个长度为10的数组 格式为 00 01 02 03
        console.log(preArr);
        var newTime = format.replace(/YY/g,year)
                            .replace(/MM/g,preArr[month]||month)
                            .replace(/DD/g,preArr[day]||day)
                            .replace(/hh/g,preArr[hour]||hour)
                            .replace(/mm/g,preArr[min]||min)
                            .replace(/ss/g,preArr[sec]||sec);
    
        return newTime;			
    },

    keepScrollBottom(){
        //滚动条保持在底部
        let listHeight=$('.chat-content').height();
        $('.chat-main').scrollTop(listHeight);
    },

    getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }

}

const methods=new Methods();

function User(){
    this.userName
    this.uid
    this.avatar
    this.description
    this.sid//socket_id
    this.userList=[]//在线列表，暂时使用，用户量很大时显然不可行
    this.friends=[]// array,好友sid为null则是下线状态，否则是在线状态
    //如果sid是null那么发送的消息不经过ws，而是直接发post到数据库
    this.groups=[]//array
    this.chatType=-1//0->好友聊天 1->群组聊天 -1->无聊天对象
    this.uidTo//正在聊天的好友
    this.sidTo//正在聊天的好友
    this.groupId//正在聊天的群组
    this.friendHistory=[]//当前好友聊天记录
    this.groupHistory=[]//群组聊天列表
    this.friendAppList=[]//好友申请列表
    this.groupAppList=[]//群聊申请列表
    this.createGroup=[]//群聊创建
}

User.prototype={
    //原型方法，所有实例中自动添加，指向同一个地址

    initUser(){
        return new Promise(resolve=>{
            this.uid=parseInt(methods.getQueryVariable('uid'));
            if(!this.uid){
                window.location.href=('http://localhost:3005/login.html')
            }
        
            $.ajax({
                url:'http://localhost:3000/users/id?uid='+this.uid,
                type:'GET',
            })
            .then(res=>{
                this.userName=res.user_name;
                this.description=res.description;
                if(this.description=='')this.description='尚无简介';
                this.avatar=avatarUrl+this.userName;
                //console.log(this.avatar)
                $('.my-avatar').attr('src',this.avatar);
                $('.my-name').html(this.userName);

                $('.user-info-container').append(`
                <div class="user-info-box">
                    <img class="user-info-avatar" src="${this.avatar}"/>
                    <div class="user-info-name">${this.userName}</div>
                    <input class="user-info-description" id="user-info-edit" value="${this.description}"/>
                </div>
                `)

                $('.user-info-box').click((e)=>{
                    e.stopPropagation();//阻止冒泡
                })

                $('#user-info-edit').on('blur',function(){
                    let text=$('#user-info-edit').val();
                    if((text=='')){
                       alert('描述不能为空');
                       $('#user-info-edit').val()==user.description;
                    }
                    else if(text == user.description){
                        //没有做修改
                        return;
                    }
                    else{
                        $.ajax({
                            url:'http://localhost:3000/users',
                            type:'PUT',
                            data:{
                                uid:user.uid,
                                description:text
                            },
                            error:err=>{
                                alert('修改失败');
                            }
                        })
                        .then(res=>{
                            alert('修改成功');
                            user.description=text;
                        })
                    }
                })

                resolve();
            })
        })
    },

    initFriends(){
        return new Promise(resolve=>{
            $.ajax({
                url:'http://localhost:3000/friends?uid='+this.uid,
                type:'GET',
            })
            .then(res=>{
                this.friends=res;
                this.friends.forEach(item=>{
                    item.sid=null;//添加sid
                    item.avatar=avatarUrl+item.user_name;//构建头像url
                    $('#friend-list').append(`<div class="fag-item" id="fff${item.uid}">
                    <img class="fag-avator" src="${item.avatar}"/>
                    <div calss="fag-name">${item.user_name}</div>
                    <div class="fag-new-msg">New</div>
                    </div>`)//添加到好友列表中
    
                    //依次添加点击事件
                    $(`#fff${item.uid}`).click((e)=>{
                        e.stopPropagation();//阻止冒泡
                        $('.chat-default')[0].style.display='none';
                        $(`#fff${item.uid} > .fag-new-msg`)[0].style.display='none';
                        $('.chat')[0].style.display='flex';
                        this.chatType=0;//标记为好友聊天
                        this.sidTo=item.sid;//如果在线拿到好友socketId
                        this.groupId=null;//不是群聊
                        this.uidTo=item.uid;//同时记录uid
                        if(this.sidTo!=null){
                            $('.room-name').html(item.user_name+"(在线)");
                        }
                        else{
                            $('.room-name').html(item.user_name+"(离线)");
                        }
                        console.log(this.sidTo);
    
                        //加载历史记录
                        $.ajax({
                            url:'http://localhost:3000/chat/friend?uidFrom='+this.uid+'&uidTo='+this.uidTo,
                            type:'GET',
                        })
                        .then(res=>{
                            $('.chat-content').empty();
                            console.log('chat history:',res);
                            this.friendHistory=res;
                            this.friendHistory.forEach(item=>{
                                //item.time=item.time.slice(0,item.time.length-3);//把秒去掉
                                if(item.uid_from==this.uid){
                                    //自己发的消息
                                    $('.chat-content').append(`
                                    <div class="my-chat-content-item">
                                        <img class="chat-avatar" src="${this.avatar}"/>
                                        <div class="my-chat-info">
                                            <div class="my-chat-name-time">
                                                <div class="chat-name">${this.userName}</div>
                                                <div class="chat-time">${item.time}</div>
                                            </div>
                                            <div class="chat-msg">${item.message}</div>
                                        </div>
                                    </div>`)
                                }
                                else{
                                    //好友发的消息
                                    let index=this.friends.findIndex(e=>{
                                        return e.uid==item.uid_from;
                                    })
                                    $('.chat-content').append(`
                                    <div class="chat-content-item">
                                        <img class="chat-avatar" src="${this.friends[index].avatar}"/>
                                        <div class="chat-info">
                                            <div class="chat-name-time">
                                                <div class="chat-name">${this.friends[index].user_name}</div>
                                                <div class="chat-time">${item.time}</div>
                                            </div>
                                            <div class="chat-msg">${item.message}</div>
                                        </div>
                                    </div>`)
                                }
                            })
                            //让滚动条保持在底部
                            methods.keepScrollBottom();
    
                        })
                    })

                    //添加到新建群聊的列表中
                    $('.create-group-member-select').append(`
                    <div class="create-group-member-select-item" id="createg${item.uid}">
                        <div class="create-group-check-box" id="checkbox${item.uid}"></div>
                        <div class="create-group-member-icon"></div>
                        <div class="create-group-member-name">${item.user_name}</div>
                    </div>
                    `)

                    $(`#createg${item.uid}`).click(e=>{
                        e.stopPropagation();//阻止冒泡
                        let index=this.createGroup.indexOf(item.uid);
                        if(index==-1){
                            this.createGroup.push(item.uid);

                            $(`#checkbox${item.uid}`).addClass('create-group-check-box-active');
                        }
                    })
                })
                resolve();
            })
        })
    },

    initGroups(){
        return new Promise(resolve=>{
            $.ajax({
                url:'http://localhost:3000/groups?uid='+this.uid,
                type:'GET',
            })
            .then(res=>{
                this.groups=res;
                this.groups.forEach(item=>{
                    //添加到群聊列表中
                    item.avatar=avatarUrl+item.group_name;
                    $('#group-list').append(`<div class="fag-item" id="ggg${item.group_id}">
                    <img class="fag-avator" src="${item.avatar}"/>
                    <div calss="fag-name">${item.group_name}</div>
                    <div class="fag-new-msg">New</div>
                    </div>`)

                    //依次添加点击事件
                    $(`#ggg${item.group_id}`).click((e)=>{
                        e.stopPropagation();//阻止冒泡
                        $('.chat-default')[0].style.display='none';
                        $(`#ggg${item.group_id} > .fag-new-msg`)[0].style.display='none';
                        $('.chat')[0].style.display='flex';
                        this.chatType=1;//标记为群聊
                        this.sidTo=null;//不是好友聊天
                        this.groupId=item.group_id;//群id作为socket room的名称
                        this.uidTo=null;//不是好友聊天
                        $('.room-name').html(item.group_name);

                        //加载历史记录
                    $.ajax({
                        url:'http://localhost:3000/chat/group?groupId='+item.group_id,
                        type:'GET',
                    })
                    .then(res=>{
                        $('.chat-content').empty();
                        console.log(res);
                        console.log('chat history:',res);
                        this.friendHistory=res;
                        this.friendHistory.forEach(item=>{
                            if(item.user_from.uid==this.uid){
                                //自己发的消息
                                $('.chat-content').append(`
                                <div class="my-chat-content-item">
                                    <img class="chat-avatar" src="${this.avatar}"/>
                                    <div class="my-chat-info">
                                        <div class="my-chat-name-time">
                                            <div class="chat-name">${this.userName}</div>
                                            <div class="chat-time">${item.time}</div>
                                        </div>
                                        <div class="chat-msg">${item.message}</div>
                                    </div>
                                </div>`)
                            }
                            else{
                                //其他人发的消息
                                $('.chat-content').append(`
                                <div class="chat-content-item">
                                    <img class="chat-avatar" src="${avatarUrl+item.user_from.user_name}"/>
                                    <div class="chat-info">
                                        <div class="chat-name-time">
                                            <div class="chat-name">${item.user_from.user_name}</div>
                                            <div class="chat-time">${item.time}</div>
                                        </div>
                                        <div class="chat-msg">${item.message}</div>
                                    </div>
                                </div>`)
                            }
                        })
                        //让滚动条保持在底部
                        methods.keepScrollBottom();
                    })
                    })
                    
                    
                })
                resolve();
            })
        })
    },

    initFriendApplications(){
        //初始化好友申请
        return new Promise(resolve=>{
            $.ajax({
                url:'http://localhost:3000/friends/application?uid='+this.uid,
                type:'GET',
                error:err=>{
                    alert("好友申请信息初始化失败");
                }
            })
            .then(res=>{
                this.friendAppList=res;
                if(this.friendAppList.length>0){
                    $('.red-point')[0].style.display='block';
                }
                for(let i=0;i<this.friendAppList.length;i++){
                    $('#friend-apps').append(`
                    <div class="apps-item">
                        <div class="apps-item-left">
                            <img class="apps-item-avatar" src="${avatarUrl+res[i].user_name}"/>
                            <div calss="apps-item-name">${res[i].user_name}</div>
                        </div>
                        <div class="apps-item-right" id="right${res[i].uid}">
                            <div class="apps-item-agree" id="agree${res[i].uid}"></div>
                            <div class="apps-item-reject" id="reject${res[i].uid}"></div>
                        </div>
                    </div>
                    `)

                    //绑定点击事件
                    $(`#agree${res[i].uid}`).click(e=>{
                        //alert('ok')
                        //同意请求
                        e.stopPropagation();//阻止冒泡
                        $.ajax({
                            url:'http://localhost:3000/friends/agree',
                            type:'PUT',
                            data:{
                                uidFrom:res[i].uid,
                                uidTo:this.uid
                            },
                            error:err=>{
                                alert('操作失败');
                            }
                        })
                        .then(data=>{
                            $(`#right${res[i].uid}`).empty();
                            $(`#right${res[i].uid}`).append(`
                            <div>已同意</div>
                            `);
                            $('#friend-list').empty();
                            this.initFriends()//重新初始化好友
                        })
                    })

                    $(`#reject${res[i].uid}`).click(e=>{
                        //alert('no');
                        //拒绝请求
                        $.ajax({
                            url:'http://localhost:3000/friends/ignore',
                            type:'PUT',
                            data:{
                                uidFrom:res[i].uid,
                                uidTo:this.uid
                            },
                            error:err=>{
                                alert('操作失败');
                            }
                        })
                        .then(res=>{
                            $(`#right${res[i].uid}`).empty();
                            $(`#right${res[i].uid}`).append(`
                            <div>已拒绝</div>
                            `);
                        })
                    })
                }
                resolve();
            })
        })
    },

    initGroupApplications(){
        return new Promise(resolve=>{
            $.ajax({
                url:'http://localhost:3000/groups/apply?uid='+this.uid,
                type:'GET',
                error:err=>{
                    alert('群聊申请信息初始化失败')
                }
            })
            .then(res=>{
                this.groupAppList=res;
                if(this.groupAppList.length>0){
                    $('.red-point')[0].style.display='block';
                }
                console.log(res);
                console.log('stage 1 ok');
                res.forEach(item=>{
                    $('#group-apps').append(`
                    <div class="apps-item">
                            <div class="apps-item-left">
                                <img class="apps-item-avatar" src="${avatarUrl+item.groupName}"/>
                                <div calss="apps-item-name">${item.groupName}</div>
                            </div>
                            <div class="apps-item-right" id="rightg${item.groupId}">
                                <div class="apps-item-agree" id="agreeg${item.groupId}"></div>
                                <div class="apps-item-reject" id="rejectg${item.groupId}"></div>
                            </div>
                        </div>
                        <div class="arrow">申请加入</div>
                        <div class="apps-item">
                            <div class="apps-item-left">
                            <img class="apps-item-avatar" src="${avatarUrl+item.userName}"/>
                            <div calss="apps-item-name">${item.userName}</div>
                        </div>
                        <div class="apps-item-right">
                        </div>
                    </div>
                    `)
                    //添加点击事件

                    $(`#agreeg${item.groupId}`).click(e=>{
                        e.stopPropagation();//阻止冒泡
                        $.ajax({
                            url:'http://localhost:3000/groups/agree',
                            type:'POST',
                            data:{
                                uidFrom:item.uid,
                                groupId:item.groupId
                            },
                            error:err=>{
                                alert('操作失败')
                            }
                        })
                        .then(res=>{
                            $(`#rightg${item.groupId}`).empty();
                            $(`#rightg${item.groupId}`).append(`
                            <div>已同意</div>
                            `);
                        })
                    })

                    $(`#rejectg${item.groupId}`).click(e=>{
                        e.stopPropagation();//阻止冒泡
                        $.ajax({
                            url:'http://localhost:3000/groups/reject',
                            type:'POST',
                            data:{
                                uidFrom:item.uid,
                                groupId:item.groupId
                            },
                            error:err=>{
                                alert('操作失败')
                            }
                        })
                        .then(res=>{
                            $(`#rightg${item.groupId}`).empty();
                            $(`#rightg${item.groupId}`).append(`
                            <div>已拒绝</div>
                            `);
                        })
                    })
                })
                resolve();
            })
            
        })
    },

    initSocket(){
        window.socket = io();
        window.socket.on('connect', () => {
            window.socket.on('success', data => {
                this.sid=data;//this->User
                console.log("已连接服务器",data);
                //提交用户信息到服务端
                console.log(this.groups);
                let info={
                    userName:this.userName,
                    uid:this.uid,
                    description:this.description,
                    sid:this.sid,
                    groups:this.groups
                }
                console.log(info);
                window.socket.emit('info',info);
            })
        })

        window.socket.on('userList',data=>{
            this.userList=data;//在线用户列表
            this.userList.forEach(item=>{
                this.friends.forEach(friend=>{
                    if(item.uid==friend.uid){
                        friend.sid=item.sid;//在线用户登记sid
                        if(this.uidTo==item.uid)//打开的窗口正好是这个好友的
                        {
                            this.sidTo=item.sid;
                            $('.room-name').html(friend.user_name+"(在线)");
                        }
                    }
                })
            })
            console.log(data);
        })
        
        window.socket.on('quit',data=>{
            //console.log(data);
            let index=this.userList.findIndex(item=>{
                return item.sid==data.sid;
            })
            this.userList.splice(index,1);
            this.friends.forEach(friend=>{
                if(data.uid==friend.uid){
                    friend.sid=null;//标记好友下线
                    if(this.uidTo==data.uid && this.chatType==0)//打开的窗口正好是这个好友的
                        {
                            $('.room-name').html(friend.user_name+"(离线)");
                        }
                }
            })
        })
    },
    async init(){//初始化
        await this.initUser();
        console.log('user basic init ok');
        await this.initFriends();
        console.log('friend init ok');
        await this.initGroups();
        console.log('groups init ok');
        await this.initFriendApplications();
        console.log('friend apps init ok');
        await this.initGroupApplications();
        console.log('group apps init ok');
        return new Promise(resolve=>{
            this.initSocket();
            resolve();
        })
        
    },

    logout(){
        window.location.replace("http://localhost:3005/login.html");
    },

    
}

var user=new User;
user.init()
.then(()=>{
    console.log('user',user);
    //初始化完毕，取消loading状态
    $('.loading-container')[0].style.display='none';
    
    //发送聊天消息
    $('#send-chat').click(()=>{
        if(user.chatType==0){
            //好友聊天
            let text=$('.chat-input').val();
            if(text=='')alert("请先输入内容再发送");
            else{//正常提交流程
                let info={
                    userName:user.userName,
                    uidFrom:user.uid,
                    uidTo:user.uidTo,
                    message:text,
                    time:methods.formatDate(new Date().getTime()),//获取当下时间
                    sidTo:user.sidTo//发送对象的sid
                }
                console.log('send message',info);
                window.socket.emit('friendMsg',info);//发送消息
                $('.chat-input').val('');//清空
    
                //记得添加到自己的聊天窗口中
                let time=info.time.slice(0,info.time.length-3);//把秒去掉
                $('.chat-content').append(`
                <div class="my-chat-content-item">
                    <img class="chat-avatar" src="${user.avatar}"/>
                    <div class="my-chat-info">
                        <div class="my-chat-name-time">
                            <div class="chat-name">${user.userName}</div>
                            <div class="chat-time">${time}</div>
                        </div>
                        <div class="chat-msg">${info.message}</div>
                    </div>
                </div>`)
    
                //让滚动条保持在底部
                methods.keepScrollBottom();
            }
            
        }
        else if(user.chatType==1){
            //群组聊天
            let text=$('.chat-input').val();
            if(text=='')alert("请先输入内容再发送");
            else{//正常提交流程
                let info={
                    userName:user.userName,
                    uidFrom:user.uid,
                    uidTo:user.uidTo,
                    message:text,
                    time:methods.formatDate(new Date().getTime()),//获取当下时间
                    groupId:user.groupId//群组id，也是房间名称
                }
                console.log('send group message',info);
                window.socket.emit('groupMsg',info);//发送消息
                $('.chat-input').val('');//清空
    
                //记得添加到自己的聊天窗口中
                let time=info.time.slice(0,info.time.length-3);//把秒去掉
                $('.chat-content').append(`
                <div class="my-chat-content-item">
                    <img class="chat-avatar" src="${user.avatar}"/>
                    <div class="my-chat-info">
                        <div class="my-chat-name-time">
                            <div class="chat-name">${user.userName}</div>
                            <div class="chat-time">${time}</div>
                        </div>
                        <div class="chat-msg">${info.message}</div>
                    </div>
                </div>`)
    
                //让滚动条保持在底部
                methods.keepScrollBottom();
            }
        }
    })
    
    //收到好友聊天消息
    window.socket.on('getFriendMsg',(info)=>{
        if(info.uidFrom==user.uid){
            //自己发的消息
            return;
        }
        console.log('get message from a friend',info);
        //只有自己也在这个窗口的时候才添加
        if(user.chatType==0 && user.uidTo==info.uidFrom){
            let index=user.friends.findIndex(e=>{
                return e.uid==info.uidFrom;
            })
            let time=info.time.slice(0,info.time.length-3);//把秒去掉
            $('.chat-content').append(`
            <div class="chat-content-item">
                <img class="chat-avatar" src="${user.friends[index].avatar}"/>
                <div class="chat-info">
                    <div class="chat-name-time">
                        <div class="chat-name">${user.friends[index].user_name}</div>
                        <div class="chat-time">${time}</div>
                    </div>
                    <div class="chat-msg">${info.message}</div>
                </div>
            </div>`)
    
            //让滚动条保持在底部
            methods.keepScrollBottom();
        }
        else{
            //在好友列表中加一个新消息提示就好
            $(`#fff${info.uidFrom} > .fag-new-msg`)[0].style.display='block';
        }
    })

    //群聊测试
    window.socket.on('getGroupMsg',info=>{
        if(info.uidFrom != user.uid)
        {
            console.log('get message from group',info);
            //只有自己也在这个窗口的时候才添加
            if(user.chatType==1 && user.groupId==info.groupId){
                let time=info.time.slice(0,info.time.length-3);//把秒去掉
                $('.chat-content').append(`
                <div class="chat-content-item">
                    <img class="chat-avatar" src="${avatarUrl+info.userName}"/>
                    <div class="chat-info">
                        <div class="chat-name-time">
                            <div class="chat-name">${info.userName}</div>
                            <div class="chat-time">${time}</div>
                        </div>
                        <div class="chat-msg">${info.message}</div>
                    </div>
                </div>`)
        
                //让滚动条保持在底部
                methods.keepScrollBottom();
            }
            else{
                //在好友列表中加一个新消息提示就好
                $(`#ggg${info.groupId} > .fag-new-msg`)[0].style.display='block';
            }
        }
    })
})