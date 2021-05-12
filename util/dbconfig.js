const mysql = require('mysql');
module.exports = {
    config:{
        host: '47.115.220.142',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'pikachu'
    },
    //连接数据库，使用mysql的连接池方式
    sqlConnect:function(sql,sqlArr,callBack){
        var pool = mysql.createPool(this.config)
        pool.getConnection((err,conn) => {
            console.log('正在连接数据库...')
            if(err){
                console.log(err)
                console.log('数据库连接失败');
                return;
            }
            //事件驱动回调
            conn.query(sql,sqlArr,callBack);
            //释放连接
            conn.release();
            console.log('释放连接。。。')
        })
    }
}
