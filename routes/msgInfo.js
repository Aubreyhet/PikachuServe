var express = require('express');
var router = express.Router();
let msgInfo = require('../controllers/msgContro');

router.get('/getMsgList', msgInfo.getMsgList)


module.exports = router
