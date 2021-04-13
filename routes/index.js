var express = require('express');
var router = express.Router();
var userInfo = require('../controllers/userInfoContro')

/* GET home page. */
router.get('/', userInfo.getUserAll);
router.post('/userSignUp', userInfo.signUp);
router.post('/userlogin', userInfo.userLogin);
router.post('/findUserName', userInfo.findName);

module.exports = router;
