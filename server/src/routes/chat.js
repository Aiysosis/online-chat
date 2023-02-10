var express = require('express');
var ChatController=require('../controllers/ChatController')
var router = express.Router();

// route listing
router.get('/friend',ChatController.getFriendChatHistory);//获取好友聊天历史记录
router.get('/group',ChatController.getGroupChatHistory);//获取群聊历史记录

module.exports = router;