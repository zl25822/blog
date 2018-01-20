var express = require('express');
var swig = require('swig');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Cookies = require('cookies');
var app = express();
var User = require('./models/User');
app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');
swig.setDefaults({cache:false});
app.use(bodyParser.urlencoded({extended:true}));
app.use(function (req,res,next) {
    req.cookies = new Cookies(req,res);
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        }catch (e){
            next();
        }
    }else {
        next();
    }
})
app.use('/',require('./router/main'));
app.use('/api',require('./router/api'));
app.use('/admin',require('./router/admin'))
app.use('/public',express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost:27017/blog4',function (err) {
    if(err){
        console.log('链接失败');
    }else{
        console.log('链接成功');
        app.listen(8080);
    }
})

