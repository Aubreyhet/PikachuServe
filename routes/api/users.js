//登录注册接口
const express = require('express');

const router = express.Router();

const bcrypt = require("bcrypt");

const bodyParser = require('body-parser');

const gravatar = require('gravatar');

const jwt = require('jsonwebtoken');

const passport = require('passport');

const User = require("../../modules/userInfo");

const secretOrKey='secret';

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());








// router.get('/test', (req, res) => {
//     res.json({name:"yuanganggang"})
// })

router.post("/register",(req, res) => {
    User.findOne({email:req.body.email})
        .then(user => {
            if(user){
                return res.status(400).json({email:"邮箱已使用"})
            }else{
                const avatar = gravatar.url(req.body.email, {s:'200', r:'pg', d : 'mm'})
                const newUser = new User({
                    name :req.body.name,
                    email:req.body.email,
                    avatar,
                    password:req.body.password
                })

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err));
                    });
                });
            }
        })
})


router.post("/login",(req,res) =>{
    const email = req.body.email;
    const password =req.body.password;
    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(404).json({email:'用户不存在!'})
            }
            //密码匹配

            // Load hash from your password DB.
            bcrypt.compare(password, user.password)
                    .then(isMath => {
                        if(isMath){
                            //规则 加密名 过期时间 箭头函数
                            const rule = {id:user.id,name:user.name}
                            jwt.sign(rule, secretOrKey,{expiresIn:3600}, (err, token) => 
                            {
                                if(err) throw err;
                                res.json({
                                    success:true,
                                    token:"Bearer " + token
                                });
                            })
                        }else{
                            return res.status(400).json({password:'密码错误'});
                        }
                    })
        })
})

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res) => {
    res.json({
        id:req.user.id,
        name : req.user.name,
        email : req.user.email,
    });
})



module.exports = router