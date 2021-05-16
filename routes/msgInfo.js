var express = require('express');
var router = express.Router();
let msgInfo = require('../controllers/msgContro');

router.get('/getMsgList', msgInfo.getMsgList)
router.get('/getFirendMsg', msgInfo.getFirendMsg)
router.post('/sendMsg', msgInfo.sendMsg)


module.exports = router
