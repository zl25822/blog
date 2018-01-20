var express = require('express');
var router = express.Router();
var User = require('../models/User');
router.use(function (req,res,next) {
    if(!req.userInfo.isAdmin){
        res.send('对不起，只有管理员能进入后台管理');
        return;
    }
    next();
})
router.get('/',function (req,res,next) {
    res.render('./admin/index',{
        userInfo:req.userInfo
    });
})
router.get('/user',function (req,res) {
    var page = Number(req.query.page || 1);
    var limit = 2;
    var pages = 0;
    User.count().then(function (count) {
        pages = Math.ceil(count/limit);
        page = Math.min(page,pages);
        page = Math.max(page,1);
        var skip = (page - 1) * limit;
        User.find().limit(limit).skip(skip).then(function (users) {
            res.render('./admin/user_index',{
                userInfo:req.userInfo,
                users:users,
                count:count,
                pages:pages,
                limit:limit,
                page:page
            })
        });
    })



})
module.exports = router;