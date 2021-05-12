//导入加密模块
var bcrypt = require('bcryptjs');

//导入生成token模块
var jwt = require('jsonwebtoken')

//设置tonken密钥
process.env.SECRET_KEY = 'secret';

//导入数据库配置
var dbConfig = require('../util/dbconfig')


//用户登录接口
//post接口 接收两个参数 用户名  密码
//连接数据库查询用户信息 查询成功返回状态码 200
login = (req,res) => {
    let {uName, email, password} = req.body;
    let sql =  `select * from userInfo where uName=? or email=? and password=?`
    let sqlArr = [uName, email, password]
    dbConfig.sqlConnect(sql,sqlArr,(err,data) => {
        if(err){
            console.log(err);
            res.send({
                'code': 500,
                'msg': '数据库请求失败'
            })
        }else if(data.length==0){
            res.send({
                'code': 203,
                'msg': '用户名或密码错误'
            })
        }else{
            let token = jwt.sign({data: data[0]}, process.env.SECRET_KEY, {expiresIn: 60*60*24})
            res.send({
                'code': 200,
                'msg': '登录成功',
                'data': data,
                token: token
            })
        }
    })
}



//注册接口

signUp = (req, res) => {
    var {uName,email,password} = req.body
    var sql = 'INSERT INTO userInfo (`uName`,`email`,`password`) VALUES(?,?,?)';
    var sqlArr = [uName,email,password]
    var callBack = (err,data) => {
        if(err){
            console.log(err);
            res.send({
                'code': 500,
                'msg':'数据库连接失败'
            })
        }else{
            res.send({
                'code': 200,
                'msg':'注册成功,请登录',
                'data': data
            })
        }
    };
    dbConfig.sqlConnect(sql,sqlArr,callBack)
}


// 查寻用户名是否存在
findUname = (req, res) => {
    let {uName} = req.body;
    let sql = `SELECT * FROM userInfo WHERE uName = '${uName}';`
    dbConfig.sqlConnect(sql,(err,data) => {
        if(err){
            console.log(err);
            res.send({
                'code': 500,
                'msg': '数据库查询失败'
            })
        }else if(data.length >= 1){
            res.send({
                'code': 202,
                'msg': '该用户名已存在',
                'data': data
            })
        }else{
            res.send({
                'code': 201,
                'msg': '用户名可以使用'
            })
        }
    })
}

//检查邮箱是否存在
findEmail = (req, res) => {
    let {email} = req.body;
    let sql = `SELECT * FROM userInfo WHERE email = '${email}';`
    dbConfig.sqlConnect(sql,(err,data) => {
        if(err){
            console.log(err);
            res.send({
                'code': 500,
                'msg': '数据库查询失败'
            })
        }else if(data.length >= 1){
            res.send({
                'code': 202,
                'msg': '当前邮箱已存在',
                'data': data
            })
        }else{
            res.send({
                'code': 201,
                'msg': '当前邮箱可以使用'
            })
        }
    })
}
module.exports = {
    login,
    signUp,
    findUname,
    findEmail
}

