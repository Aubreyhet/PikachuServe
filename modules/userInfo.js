//定义userInfo模块
// require('../connection.js');


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    name: {
      type : String,
      required : true
    },
    email: {
      type : String,
      required : true
    },
    password: {
      type : String,
      required : true
    },
    avatar: {
      type : String,
    },
    date: {
      type : Date,
      default : Date.now
    },
    gender: {
      type : String
    }
  });
const userInfo = mongoose.model('userInfos', blogSchema);

module.exports = userInfo