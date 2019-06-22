
const express = require('express');

const bodyParser = require('body-parser');

const passport = require('passport');

require('./config/connection.js');

require('./config/passport.js')(passport);

const users = require('./routes/api/users');

const profiles = require('./routes/api/profiles');


const port = process.env.PORT || 5000;

const app = express();


// const info = userInfo.find({},function(e,d){
//     if(!e){
//       return d;
//     }
//   })
  
app.use('/api/users', users);

app.use('/api/profiles', profiles);



app.use(bodyParser.urlencoded({extended : false}));

app.use(bodyParser.json());

app.use(passport.initialize());

app.listen(port, () => {
    console.log('server running on port '+ port)
});

