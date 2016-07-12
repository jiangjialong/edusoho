define(function(require, exports, module) {
    var Validator = require('bootstrap.validator');
    require('common/validator-rules').inject(Validator);
    var Notify = require('common/bootstrap-notify');

    exports.run = function() {
        $('.js-self-test').on('click', function () {
            var $this = $(this);
            $this.text('验证中..');
            $.get($this.data('url')).done(function (response) {
                if(response.status){
                    Notify.success("邮件已发送, 请注意查收", 3);
                }else {
                    Notify.danger(response.message, 3);
                }
                $this.text('验证');
            });
        });

        if($("input[name='email-setting-status']").val()=="email"){
            $('#mailer-form').show();
        }
        var validator = new Validator({
            element: '#mailer-form'
        });

        $('[name=enabled]').change(function(e) {
            var radio = e.target.value;

            if (radio == '1') {
                validator.addItem({
                    element: '[name="host"]',
                    required: true,
                    errormessageRequired: '请输入SMTP服务器地址'
                });
                validator.addItem({
                    element: '[name="port"]',
                    required: true,
                    rule:'integer',
                    errormessageRequired: '请输入SMTP端口号'
                });
                validator.addItem({
                    element: '[name="username"]',
                    required: true,
                    rule: 'email',
                    errormessageRequired: '请输入SMTP用户名'
                });
                validator.addItem({
                    element: '[name="password"]',
                    required: true,
                    rule:'password',
                    errormessageRequired: '请输入SMTP密码'
                });
                validator.addItem({
                    element: '[name="from"]',
                    required: true,
                    rule: 'email',
                    errormessageRequired: '请输入发信人地址'
                });
                validator.addItem({
                    element: '[name="name"]',
                    required: true,
                    errormessageRequired: '请输入发信人名称'
                });
            } else {
                validator.removeItem('[name="host"]');
                validator.removeItem('[name="port"]');
                validator.removeItem('[name="username"]');
                validator.removeItem('[name="password"]');
                validator.removeItem('[name="from"]');
                validator.removeItem('[name="name"]');
            }
        });
        
        $('input[name="enabled"]:checked').change();
        $("#email").click(function(){
            $('#email-status').hide();
            $('#mailer-form').show();
        });
    };

});