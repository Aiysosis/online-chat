var express = require('express');
var FriendController=require('../controllers/FriendController')
var router = express.Router();

// route listing
router.post("/befriend",FriendController.befriend);

router.get("/application",FriendController.getFriendApplication);
router.get("/",FriendController.getFriends);

router.put('/agree',FriendController.aggreFriendApplication);
router.put('/ignore',FriendController.ignoreFriendApplication);

router.delete('/',FriendController.deleteFriend);

module.exports = router;

