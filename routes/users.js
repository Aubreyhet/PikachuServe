//用户相关路由模块


var express = require('express');
var router = express.Router();
var userInfo = require('../controllers/userInfoContro')


/* GET users listing. */

router.post('/login', userInfo.login)

router.post('/signUp', userInfo.signUp)

router.post('/findUname', userInfo.findUname)

router.post('/findEmail', userInfo.findEmail)





module.exports = router;
