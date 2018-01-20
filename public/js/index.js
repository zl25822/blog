$(function () {
    var $loginBox = $('#loginBox');
    var $registerBox = $('#registerBox');
    var $userInfo = $('.userInfo');
    var $logout = $('#logout');
    $loginBox.find('a.colMint').on('click',function () {
        $loginBox.hide();
        $registerBox.show();
    })
    $registerBox.find('a.colMint').on('click',function () {
        $loginBox.show();
        $registerBox.hide();
    })
    $registerBox.find('button').on('click',function () {
        $.ajax({
            url:'/api/user/register',
            type:'post',
            data:{
                username:$registerBox.find('[name="username"]').val(),
                password:$registerBox.find('[name="password"]').val(),
                repassword:$registerBox.find('[name="repassword"]').val(),
            },
            dataType:'json',
            success:function (result) {
                console.log(result);
               $registerBox.find('.colWarning').html(result.msg);
               if(!result.code){
                   setTimeout(function () {
                       $loginBox.show();
                       $registerBox.hide();
                   },1000)
               }
            }
        })
    })
    $loginBox.find('button').on('click',function () {
        $.ajax({
            url:'/api/user/login',
            type:'post',
            data:{
                username:$loginBox.find('[name="username"]').val(),
                password:$loginBox.find('[name="password"]').val(),
            },
            dataType:'json',
            success:function (result) {
                $loginBox.find('.colWarning').html(result.msg);
                if(!result.code){
                   window.location.reload();
                }
            }
        })
    })
    $logout.on('click',function () {
        $.ajax({
            url:'/api/user/logout',
            success:function (result) {
                if(!result.code){
                    window.location.reload();
                }
            }
        })
    })

})