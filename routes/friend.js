var express = require('express');
var router = express.Router();
let friend = require('../controllers/friendContro')

router.get('/getFriends', friend.findFriends)
//获取单个好友信息的方法
router.get('/getFriend', friend.findFriend)


router.post('/addFriend', friend.addFriend)

module.exports = router;