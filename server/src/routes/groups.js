var express = require('express');
var GroupController=require('../controllers/GroupController');
var router = express.Router();

router.post('/',GroupController.createGroup);
router.delete('/',GroupController.deleteGroup);
router.get('/',GroupController.myGroups);
router.get('/id',GroupController.findById);
router.get('/name',GroupController.findByName);

router.post('/apply',GroupController.applyForGroup);
router.get('/apply',GroupController.getGroupApplications);

router.post('/agree',GroupController.agreeApplication);
router.post('/reject',GroupController.rejectApplication);


module.exports = router;