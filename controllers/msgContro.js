var dbConfig = require('../util/dbconfig')
var multiparty = require("multiparty");

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
//1.来到数据先进行判断类型 统一规定类型 文字类的数据标记 文字 表情 图片 文件；
//2.将类型为图片1 文件3的数据进行文件存储 并且记录存储路径 将存储路径 给要存入数据库的内容 


sendMsgImg = (req, res) => {
    let sql = `INSERT INTO MsgInfo (from_id,to_id,type,msg) VALUES (?,?,?,?);`;
    let form = new multiparty.Form();
    form.uploadDir = './upload/images';
    form.parse(req, function(err, fields, files) {
        console.log(fields.type[0])
        if (err) {
            console.log(err);
            res.send({
                'code': 501,
                'msg':'文件存储失败'
            })
        } else {
            //这里是存储成功了
            //图片存储

            let f_id = fields.f_id[0];
                let t_id = fields.t_id[0];
                let type = fields.type[0];
                let msg = files.msg[0].path;
                let sqlArr = [f_id, t_id , type, msg];
                dbConfig.sqlConnect(sql, sqlArr, (err,data) => {
                    if(err){
                        console.log(err);
                        res.send({
                            'code': 500,
                            'msg': '存入数据库失败'
                        })
                    }else{
                        res.send({
                            'code': 200,
                            'msg': '图片上传成功',
                            'data': data,
                            'imgUrl': msg,
                            'imgName':files.msg[0]
                        })
                    }
                })
        }
    });
}

//文件上传
sendMsgFile = (req, res) => {
    let sql = `INSERT INTO MsgInfo (from_id,to_id,type,msg) VALUES (?,?,?,?);`;
    let form = new multiparty.Form();
    form.uploadDir = './upload/files';
    form.parse(req, function(err, fields, files) {
        console.log(fields.type[0])
        if (err) {
            console.log(err);
            res.send({
                'code': 501,
                'msg':'文件存储失败'
            })
        } else {
            let f_id = fields.f_id[0];
                let t_id = fields.t_id[0];
                let type = fields.type[0];
                let msg = files.msg[0].path;
                let sqlArr = [f_id, t_id , type, msg];
                dbConfig.sqlConnect(sql, sqlArr, (err,data) => {
                    if(err){
                        console.log(err);
                        res.send({
                            'code': 500,
                            'msg': '存入数据库失败'
                        })
                    }else{
                        res.send({
                            'code': 200,
                            'msg': '文件上传成功',
                            'data': data,
                            'fileUrl': msg,
                            'fileName':files.msg[0]
                        })
                    }
                })
        }
    });
}

//其他消息上传

sendMsgOther = (req, res) => {
    console.log(req.body)
    let {f_id, t_id, type, msg} = req.body
    let sql = `INSERT INTO MsgInfo (from_id,to_id,type,msg) VALUES (?,?,?,?);`;
    let sqlArr = [f_id, t_id , type, msg];
    dbConfig.sqlConnect(sql, sqlArr, (err,data) => {
        if(err){
            console.log(err);
            res.send({
                'code': 500,
                'msg': '存入数据库失败'
            })
        }else{
            res.send({
                'code': 200,
                'msg': '消息上传成功',
                'data': data,
                'msg': msg
            })
        }
    })
}

module.exports = {
    getMsgList,
    getFirendMsg,
    sendMsgImg,
    sendMsgFile,
    sendMsgOther
}

