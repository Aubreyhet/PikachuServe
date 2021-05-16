const dbconfig = require('../util/dbconfig');
var dbConfig = require('../util/dbconfig')

//获取消息列表接口
//聊天数据有唯标识时间戳
//取到所有好友的最新一条的聊天数据 和好友信息同时传回
//根据传入的用户id 在聊天记录表中查找 接收用户用户为该id的数据
//
getMsgList = (req, res) => {
    let {id} = req.query;
    let sql = `SELECT * FROM MsgInfo where to_id=? or from_id=?`;
    let sqlArr = [id,id];
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
    let sql = `SELECT * FROM MsgInfo where to_id=? and from_id=?`;
    let sqlArr = [id, f_id];
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
                'msg': '消息获取成功',
                'data': data
            })
        }
    })
}

//发送信息接口 接收到信息之后存入数据库
//
//数据库存储聊天记录方法 
//聊天数据应该有以下属性 {f_id, t_id, type, msg,}
//1.来到数据先进行判断类型 统一规定类型 文字类的数据标记 0  ；图片 1 ；表情包 2； 文件 3；
//2.将类型为图片1 文件3的数据进行文件存储 并且记录存储路径 将存储路径 给要存入数据库的内容 
sendMsg = (req, res) => {
    let {f_id, t_id , type, msg} = req.body;
    let sql = `INSERT INTO MsgInfo (from_id,to_id,type,msg) VALUES (?,?,?,?);`;
    let sqlArr = [f_id, t_id , type, msg]
    dbConfig.sqlConnect(sql, sqlArr, (err,data) => {
        if(err){
            console.log(err),
            res.send({
                'code': 500,
                'msg': '服务器操作失败'
            })
        }else{
            res.send({
                'code': 200,
                'msg': '发送成功'
            })
        }
    })
}


module.exports = {
    getMsgList,
    getFirendMsg,
    sendMsg
}

