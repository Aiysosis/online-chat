var express = require('express');
var userController=require('../controllers/UserController');
var router = express.Router();

/* GET users listing. */
router.get('/all', userController.findAll);
router.get('/id',userController.findById);
router.get('/name',userController.findByName);


router.post("/", userController.create);
router.post("/login",userController.login);

router.put("/",userController.editInfo);


module.exports = router;
