var express = require('express');
var router = express.Router();
let friend = require('../controllers/friendContro')

router.get('/getFriends', friend.findFriends)

router.post('/addFriend', friend.addFriend)

module.exports = router;