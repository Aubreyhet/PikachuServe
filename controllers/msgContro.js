const dbconfig = require('../util/dbconfig');
var dbConfig = require('../util/dbconfig')

//获取消息列表接口
//根据传入的用户id 在聊天记录表中查找 接收用户用户为该id的数据
getMsgList = (req, res) => {
    let {id} = req.query;
    let sql = `SELECT * FROM MsgInfo where to_id=?`;
    let sqlArr = [id];
    dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
        if(err){
            console.log(err);
            res.send({
                'code': 500,
                'msg': '数据库连接失败'
            })
        }else{
            res.send({
                'code': 200,
                'msg': '聊天数据查询完成',
                'data': data
            })
        }
    })
}


//一对一聊天数据查询
//接收两个参数 一个是用户自己的id 另外一个是好友的id
getFirendMsg = (req, res) => {
    let {id, f_id} = req.query;
    let sql = `SELECT * FROM MsgInfo where to_id=? from_id=?`;
    let sqlArr = [id, f_id];
    dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
        if(err){
            console.log(err);
            res.send({
                
            })
        }
    })
}


module.exports = {
    getMsgList,
}

