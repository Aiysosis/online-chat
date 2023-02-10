const UserModel=require("../models").UserModel;//引入
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userName) {
    res.status(400).send({
      message: "用户名不能为空"
    });
    return;
  }

  if(!req.body.password){
      res.status(400).send({
          message:"密码不能为空"
      });
  }
  // Create a User
  var user = {
    user_name:req.body.userName,
    password:req.body.password,
    description: "",
  };

  // Save Tutorial in the database
  UserModel.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating User."
      });
    });
    return;
};

exports.findAll = (req, res) => {
  UserModel.findAll()
  .then(data=>{
    console.log(data);
    if(data==null)res.send("null");
    else res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial."
    });
  });
  return;
};

exports.findById=async (req,res)=>{
  console.log(req.query.uid);
  let user=await UserModel.findByPk(req.query.uid)
  .catch(err=>{
    res.status(500).send(err);
  })
  
  if(user==null)res.status(400).send("找不到该用户");
  else res.send(user);
};

exports.findByName=(req,res)=>{
  UserModel.findOne({where:{user_name:req.query.userName}})
  .then(data=>{
    if(data==null)res.status(400).send("null");
    else res.send(data);
  })
  .catch(err=>{
    res.status(500).send({
      err
    });
  })
  return;
};

exports.login=(req,res)=>{
  UserModel.findOne({where:{
    user_name:req.body.userName,
    password:req.body.password
  }})
  .then(data=>{
    if(data==null)res.status(400).send("用户名或密码错误");
    else res.status(200).send(data);
  })
  return;
}

exports.editInfo=(req,res)=>{
  UserModel.update(
    {
      description:req.body.description
    },
    {
      where:{
        uid:req.body.uid
    }
  })
  .then(data=>{
    res.status(200).send(data[0] > 0);
  })
  .catch(err=>{
    res.status(500).send(err);
  })
}
