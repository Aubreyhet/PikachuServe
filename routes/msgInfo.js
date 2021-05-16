var express = require('express');
var router = express.Router();
let msgInfo = require('../controllers/msgContro');

router.get('/getMsgList', msgInfo.getMsgList)
router.get('/getFirendMsg', msgInfo.getFirendMsg)
router.post('/sendMsgImg', msgInfo.sendMsgImg)
router.post('/sendMsgFile', msgInfo.sendMsgFile)
router.post('/sendMsgOther', msgInfo.sendMsgOther)


module.exports = router
