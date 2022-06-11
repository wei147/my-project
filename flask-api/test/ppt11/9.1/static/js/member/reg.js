;
const member_reg_ops = {
    init: function () {
        this.eventBind();
    },
    //事件绑定
    eventBind: function () {
        $(".reg_wrap .do-reg").click(function () {
            const btn_target = $(this);
            if (btn_target.hasClass("disabled")) {
                common_ops.alert("正在处理，请不要重复点击")
            }
            // const nickname = $(".reg_wrap input[name=nickname]").val();
            const login_name = $(".reg_wrap input[name=login_name]").val();
            const login_pwd1 = $(".reg_wrap input[name=login_pwd1]").val();
            const login_pwd2 = $(".reg_wrap input[name=login_pwd2]").val();
            if (login_name === undefined || login_name.length < 1) {
                common_ops.alert("请输入正确的用户名")
                return;
            }

            if (login_pwd1 === undefined || login_pwd1.length < 2) {
                common_ops.alert("密码长度需大于2个字符")
                return;
            }

            if (login_pwd2 === undefined || login_pwd2 !== login_pwd1) {
                common_ops.alert("密码不一致")
                return;
            }
            btn_target.addClass("disabled")
            $.ajax({
                url: common_ops.buildUrl("/member/reg"),
                type: "POST",
                data: {
                    // nickname:nickname,
                    login_name: login_name,
                    login_pwd1: login_pwd1,
                    login_pwd2: login_pwd2
                },
                dateType: 'json',
                success: function (res) {
                    btn_target.removeClass("disabled");
                    let callback = null;
                    if (res.code === 200) {
                        callback = function () {
                            window.location.href = common_ops.buildUrl("/");
                        };
                    }
                    // alert(res.msg) res.msg来自member，即后端验证成功return信息
                    common_ops.alert(res.msg, callback)
                }
            })
        });
    }
};

$(document).ready(function () {
    member_reg_ops.init();

})