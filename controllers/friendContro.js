var dbConfig = require('../util/dbconfig')

//渲染好友列表
findFriends = (req, res) => {
    let {id} = req.query;
    let sql = `
        SELECT * FROM userInfo WHERE id IN (SELECT f_id
        FROM Friends
        WHERE u_id = ?
        UNION ALL
        SELECT u_id
        FROM Friends
        WHERE f_id = ?);
    `
    let sqlArr = [id,id]
    dbConfig.sqlConnect(sql, sqlArr, (err, data)=>{
        if(err){
            console.log(err);
            res.send({
                'code': 500,
                'msg': '数据库查询失败'
            })
        }else{
            res.send({
                'code': 200,
                'msg': '好友列表查询结束',
                'data': data
            })
        }
    })
}


//通过好友id获取详细信息
findFriend = (req, res) => {
    let {id} = req.query;
    let sql = `SELECT uName,email FROM userInfo WHERE id=?`;
    let sqlArr = [id];
    dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
        if(err){
            console.log(err)
            res.send({
                'code': 500,
                'msg': '数据库查询失败'
            })
        }else {
            res.send({
                'code': 200,
                'msg': '获取用户信息成功',
                'data': data
            })
        }
    })
}

//通过绑定邮箱搜索好友
//通过注册用户名搜索好友


//添加好友
addFriend = (req, res) => {
    let {id, f_id, f_name} = req.body;
    let sql = `INSERT INTO Friends (u_id, f_id, f_name) VALUES (?,?,?);`;
    let sqlArr = [id, f_id, f_name];
    dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
        if(err){
            console.log(err);
            res.send({
                'code': 500,
                'msg': '好友添加失败'
            })
        }else{
            res.send({
                'code': 200,
                'msg': '好友添加成功',
                'data': data
            })
        }
    })
}


//删除好友
//删除好友操作需要两个参数 用户id和好友id
delFriend = (req, res) => {
    let {id, f_id} = req.query;
    let sql = `DELETE * FROM Friends WHERE u_id=? and f_id=?;`;
    let sqlArr = [id, f_id];
    dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
        if(err){
            console.log(err);
            res.send({
                'code': 500,
                'msg': '数据库查询失败'
            })
        }else{
            res.send({
                'code': 200,
                'msg': '删除好友成功'
            })
        }
    })
}


//好友备注


module.exports = {
    findFriends,
    addFriend,
    delFriend,
    findFriend
}

