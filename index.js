
require('./config/connection.js');
var userInfo = require('./modules/userInfo.js')


// mongoose.connection.once("close", function(){
//   console.log("断开数据库成功！")
// })
//断开数据库操作


//插入数据方法
// pushInfo = function(age,name,gender){
//   userInfo.create({
//     age : age,
//     name : name ,
//     gender : gender
//   }, function(err){
//     if(!err){
//       console.log('数据插入成功！')
//     }
//   })
  
// }
// pushInfo(23,'袁新','男');


//  model 的查询方法
//1.
userInfo.find({},function(e,d){
  if(!e){
    console.log(d)
  }
})

//2.findOneBy
// Info.findOne({},function(err,doc){
//   if(!err){
//     console.log(doc.age)
//   }
// })
//修改
// Info.update({name:'宋丽琴'},{$set:{age:18}},function(err){
//   if(!err){
//     console.log("修改成功~~")
//   }
// })
//删除操作
// Info.remove({name:'宋丽琴'},function(err){
//   if(!err){
//     console.log('删除成功~~')
//   }
// })
//统计数量
// Info.count({},function(err,count){
//   if(!err){
//     console.log(count)
//   }
// })
//文档的操作
//1.插入save()
