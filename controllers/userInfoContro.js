var dbConfig = require('../util/dbconfig')

//获取所有用户信息处理函数
getUserAll = (req,res)=>{
    var sql = 'select * from schemauser'
    var sqlArr = [];
    var callBack = (err,data) => {
        if(err){
        console.log('数据库连接出错！')
        }else{
        res.send({
            'list': data
        })
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callBack)
}


signUp = (req,res)=>{
    console.log(req.body)
    var sql = 'select * from schemauser'
    var sqlArr = [];
    var callBack = (err,data) => {
        if(err){
        console.log('数据库连接出错！')
        }else{
        res.send({
            'list': data
        })
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callBack)
}

userLogin = (req,res)=>{
    console.log(req.body)
    var sql = 'select * from schemauser'
    var sqlArr = [];
    var callBack = (err,data) => {
        if(err){
        console.log('数据库连接出错！')
        }else{
        res.send({
            'list': data
        })
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callBack)
}

findName = (req,res)=>{
    console.log(req.body)
    var sql = 'select * from schemauser'
    var sqlArr = [];
    var callBack = (err,data) => {
        if(err){
        console.log('数据库连接出错！')
        }else{
        res.send({
            'code':200,
            'list': data,
            'msg': '123445'
        })
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callBack)
}


module.exports = {
    getUserAll,
    signUp,
    userLogin,
    findName
}

