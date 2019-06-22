//连接数据库
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/admin', {useNewUrlParser : true} )

mongoose.connection.once("open", function(){
  console.log("连接数据库成功！")
})