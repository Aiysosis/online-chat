//次要的页面交互逻辑写在这里

$(document).click(function(){
    $('.menu-items-box')[0].style.display='none';
    $('.user-info-container')[0].style.display='none';
    $('.create-group-container')[0].style.display='none';
})

$('.create-group-icon').click(e=>{
    e.stopPropagation();//阻止冒泡
    $('.create-group-container')[0].style.display='flex';
})

$('.create-group-box').click(e=>{
    e.stopPropagation();//阻止冒泡
})

$('.my-info').click(e=>{
    e.stopPropagation();//阻止冒泡
    $('.user-info-container')[0].style.display='flex';
})

$('#menu-logout').click(e=>{
    e.stopPropagation();//阻止冒泡
    user.logout();
})


$('#myFriends').click((e)=>{
    e.stopPropagation();//阻止冒泡
    $('#group-list')[0].style.display='none';//隐藏群组列表
    $('#friend-list')[0].style.display='block';//展示好友列表
    $('#myGroups').removeClass('fagNav-btn-active');
    $('#myFriends').addClass('fagNav-btn-active');
})

$('#myGroups').click((e)=>{
    e.stopPropagation();//阻止冒泡
    $('#friend-list')[0].style.display='none';//隐藏好友列表
    $('#group-list')[0].style.display='block';//展示群组列表
    $('#myFriends').removeClass('fagNav-btn-active');
    $('#myGroups').addClass('fagNav-btn-active');
})

$('#side-bar-friend').click(e=>{
    e.stopPropagation();//阻止冒泡
    $('#group-apps')[0].style.display='none';//隐藏好友列表
    $('#friend-apps')[0].style.display='block';//展示群组列表
    $('#side-bar-group').removeClass('fagNav-btn-active');
    $('#side-bar-friend').addClass('fagNav-btn-active');
})

$('#side-bar-group').click(e=>{
    e.stopPropagation();//阻止冒泡
    $('#friend-apps')[0].style.display='none';//隐藏好友列表
    $('#group-apps')[0].style.display='block';//展示群组列表
    $('#side-bar-friend').removeClass('fagNav-btn-active');
    $('#side-bar-group').addClass('fagNav-btn-active');
})

$('.back').click(()=>{
    $('.chat-default')[0].style.display='flex';
    $('.chat')[0].style.display='none';
    user.chatType=-1;//无聊天对象
    user.uidTo=null;
    user.sidTo=null;
})

$('.alert').click((e)=>{
    e.stopPropagation();//阻止冒泡
    $('.side-bar')[0].style.display='block';
    //把红点消除
    $('.red-point')[0].style.display='none';
})

$('.side-bar-head-close').click((e)=>{
    e.stopPropagation();//阻止冒泡
    $('.side-bar')[0].style.display='none';
})

$('.menu-icon').click(e=>{
    e.stopPropagation();//阻止冒泡
    $('.menu-items-box')[0].style.display='block';
})

$('#find-user').click(e=>{
    e.stopPropagation();//阻止冒泡
    let text=$('.search').val();
    if(text=='')alert('输入不能为空');
    else{
        //两个接口都调用搜索，有可能出现某用户采用数字名称，而这个名称和另一个用户的uid相同的情况
        //$('.search').val('');
        $('.search-res').empty();

        $.ajax({
            url:'http://localhost:3000/users/name?userName='+text,
            type:'GET',
        })
        .then(res=>{
            if(res){
                $('.search-res').append(`
                <div class="search-res-item">
                    <div class="search-res-left">
                        <img class="search-res-avatar" src="${avatarUrl+res.user_name}"/>
                        <div calss="search-res-name">${res.user_name}</div>
                    </div>
                    <div class="search-res-option"  id="s${res.uid}"></div>
                </div>
                `);
                //添加点击事件
                $(`#s${res.uid}`).click(e=>{
                    e.stopPropagation();//阻止冒泡
                    console.log(res.uid);
                    if(res.uid==user.uid){
                        alert('请不要添加自己为好友');
                        
                    }
                    else{
                        //发送好友申请
                        $.ajax({
                            url: "http://localhost:3000/friends/befriend",
                            type: "POST",
                            data:{
                                uidFrom:user.uid,
                                uidTo:res.uid
                            },
                            error:(err)=>{
                                alert(err);
                            }
                        })
                        .then(res=>{
                            alert(res);
                        })
                    }
                })
                
            }
            
        })

        $.ajax({
            url:'http://localhost:3000/users/id?uid='+text,
            type:'GET',
            error: function () {
                //请求出错处理
                console.log('查找失败');
              }
        })
        .then(res=>{
            if(res){
                $('.search-res').append(`
                <div class="search-res-item">
                    <div class="search-res-left">
                        <img class="search-res-avatar" src="${avatarUrl+res.user_name}"/>
                        <div calss="search-res-name">${res.user_name}</div>
                    </div>
                    <div class="search-res-option"  id="s${res.uid}"></div>
                </div>
                `)
                //添加点击事件
                $(`#s${res.uid}`).click(e=>{
                    e.stopPropagation();//阻止冒泡
                    console.log(res.uid);
                    if(res.uid==user.uid){
                        alert('请不要添加自己为好友');
                       
                    }
                    else{
                         //发送好友申请
                        $.ajax({
                            url: "http://localhost:3000/friends/befriend",
                            type: "POST",
                            data:{
                                uidFrom:user.uid,
                                uidTo:res.uid
                            },
                            error:(err)=>{
                                //console.log(err);
                                alert(err.responseText);
                            }
                        })
                        .then(res=>{
                            console.log(res);
                            alert(res);
                        })
                    }
                })
            }
            
        })
    }
})

$('#find-group').click(e=>{
    e.stopPropagation();//阻止冒泡
    let text=$('.search').val();
    if(text=='')alert('输入不能为空');
    else{
        //两个接口都调用搜索，有可能出现某用户采用数字名称，而这个名称和另一个用户的uid相同的情况
        //$('.search').val('');
        $('.search-res').empty();

        $.ajax({
            url:'http://localhost:3000/groups/name?groupName='+text,
            type:'GET',
        })
        .then(res=>{
            if(res){
                $('.search-res').append(`
                <div class="search-res-item">
                    <div class="search-res-left">
                        <img class="search-res-avatar" src="${avatarUrl+res.group_name}"/>
                        <div calss="search-res-name">${res.group_name}</div>
                    </div>
                    <div class="search-res-option"  id="sg${res.group_id}"></div>
                </div>
                `);
                //添加点击事件
                $(`#sg${res.group_id}`).click(e=>{
                    e.stopPropagation();//阻止冒泡
                    console.log(res.uid);
                    // if(res.uid==user.uid){
                    //     alert('请不要添加自己为好友');
                        
                    // }
                    // else{
                        //发送群聊申请
                        $.ajax({
                            url: "http://localhost:3000/groups/apply",
                            type: "POST",
                            data:{
                                uid:user.uid,
                                groupId:res.group_id
                            },
                            error:(err)=>{
                                alert(err.responseText);
                            }
                        })
                        .then(res=>{
                            alert(res);
                        })
                    // }
                })
                
            }
            
        })

        $.ajax({
            url:'http://localhost:3000/groups/id?groupId='+text,
            type:'GET',
            error: function () {
                //请求出错处理
                console.log('查找失败');
              }
        })
        .then(res=>{
            if(res){
                $('.search-res').append(`
                <div class="search-res-item">
                    <div class="search-res-left">
                        <img class="search-res-avatar" src="${avatarUrl+res.group_name}"/>
                        <div calss="search-res-name">${res.group_name}</div>
                    </div>
                    <div class="search-res-option"  id="sg${res.group_id}"></div>
                </div>
                `);
                //添加点击事件
                $(`#sg${res.group_id}`).click(e=>{
                    e.stopPropagation();//阻止冒泡
                    console.log(res.uid);
                    // if(res.uid==user.uid){
                    //     alert('请不要添加自己为好友');
                        
                    // }
                    // else{
                        //发送群聊申请
                        $.ajax({
                            url: "http://localhost:3000/groups/apply",
                            type: "POST",
                            data:{
                                uid:user.uid,
                                groupId:res.group_id
                            },
                            error:(err)=>{
                                alert(err.responseText);
                            }
                        })
                        .then(res=>{
                            alert(res);
                        })
                    // }
                })
                
            }
            
        })
    }
})

$('.create-group-reset').click(e=>{
    e.stopPropagation();//阻止冒泡
    user.createGroup=[];//清空
    user.friends.forEach(item=>{
        $(`#checkbox${item.uid}`).removeClass('create-group-check-box-active');
    })
})

$('.create-group-subbmit-btn').click(e=>{
    e.stopPropagation();//阻止冒泡
    if(user.createGroup.length==0){
        alert('请先选择群聊成员');
    }
    else{
        let groupName=$('.create-group-name').val();
        if(groupName==''){
            alert('群聊名称不能为空');
        }
        else{
            $.ajax({
                url:'http://localhost:3000/groups',
                type:'POST',
                data:{
                    uid:user.uid,
                    groupName:groupName,
                    members:JSON.stringify(user.createGroup),
                },
                error:err=>{
                    alert(err.responseText);
                }
            })
            .then(res=>{
                user.initGroups();//重新加载
                $('.create-group-container')[0].style.display='none';
                alert("群聊创建成功");
            })
        }
    }
})


$("#fileInput").change(function(event){
 
    var file = event.target.files[0];
    upload(file);

 });

 function upload(file){

    var fileReader = new FileReader();
    var send_file = file;
    //var type = send_file.type;
    var data = {};

    fileReader.readAsBinaryString(send_file);

    fileReader.onload = function(event) {

        data.file = event.target.result;
        data.name = "uploadFile";
        //data.type = type;

        window.socket.emit('upload',data);

    }

}
