

$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    var form = layui.form;
    // 调用form.verify() 方法，自定义验证规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })


    // 监听注册表单默认提交
    $("#form_reg").on('submit', function (e) {
        // 阻止表单默认提交时间
        e.preventDefault()
        // 获取账号和密码
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        // 发送ajax请求
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
            // 判断是否成功
            if (res.status !== 0) {
                // layer.msg() 是leyui提供的弹出层
                return layer.msg(res.message);
            }
            layer.msg("注册成功");
            // 注册成功后自动触发去登陆按钮
            $("#link_login").click();
        })
    })


    // 监听登录表单提交事件
    $("#form_login").on('submit', function (e) {
        e.preventDefault();
        // 获取输入框账号和密码
        var data = $(this).serialize();
        // 发送ajax请求
        $.post('http://ajax.frontend.itheima.net/api/login', data, function (res) {
            // 判断是否登录成功
            if (res.status !== 0) {
                return layer.msg("您太丑拒绝您的登录");
            }
            layer.msg(res.message)
            // 将登陆成功得到的token字符串 保存到 localstorage中

            // localStorage.setItem() 此方法把token保存到过滤器
            localStorage.setItem('token', res.token)
            // 跳转到后台页面
            location.href = '/index.html'

        })
    })
})


