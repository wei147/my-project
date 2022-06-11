# 登录注册页面
from application import app, db
from flask import Blueprint, render_template, request, session, make_response, redirect
from common.libs.Helper import ops_renderErrJSON, ops_renderJSON, ops_render
from common.libs.DataHelper import getCurrentTime
from common.models.user import User
from common.libs.UserService import UserService
from common.libs.UrlManager import UrlManager

member_page = Blueprint("member_page", __name__)


@member_page.route("/reg", methods=["GET", "POST"])
def reg():
    if request.method == "GET":
        return render_template("member/reg.html")
    req = request.values
    # print("req:" + req)
    login_name = req['login_name'] if "login_name" in req else ""  # 如果login_name在就取它，不在则取空
    # nickname = req['nickname'] if "nickname" in req else ""
    login_pwd1 = req['login_pwd1'] if "login_pwd1" in req else ""
    login_pwd2 = req['login_pwd2'] if "login_pwd2" in req else ""

    if login_name is None or len(login_name) < 1:
        return ops_renderErrJSON(msg="非前端js验证  请输入正确的用户名")

    if login_pwd1 is None or len(login_pwd1) < 2:
        return ops_renderErrJSON(msg="非前端js验证  密码长度需大于2个字符")

    if login_pwd1 != login_pwd2:
        return ops_renderErrJSON(msg="非前端js验证  密码不一致")

    user_info = User.query.filter_by(login_name=login_name).first()
    if user_info:
        return ops_renderErrJSON(msg="用户名已被注册")

    model_user = User()
    model_user.login_name = login_name
    model_user.nickname = login_name
    # model_user.nickname = nickname
    model_user.login_salt = UserService.genSalt(8)
    model_user.login_pwd = UserService.genPwd(login_pwd1, model_user.login_salt)
    model_user.create_time = model_user.updated_time = getCurrentTime()
    db.session.add(model_user)
    db.session.commit()
    return ops_renderJSON(msg="来自member 注册成功")
    # return jsonify({"login_name": login_name, "login_pwd1": login_pwd1, "login_pwd2": login_pwd2})


@member_page.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return ops_render("member/login.html")

    req = request.values
    login_name = req['login_name'] if 'login_name' in req else ''
    login_pwd = req['login_pwd'] if 'login_pwd' in req else ''
    if login_name is None or len(login_name) < 1:
        return ops_renderErrJSON("请输入正确的用户名")

    if login_pwd is None or len(login_pwd) < 2:
        return ops_renderErrJSON("请输入正确的密码")
    user_info = User.query.filter_by(login_name=login_name).first()
    if not user_info:
        return ops_renderErrJSON("用户名或密码错误 -1")  # 请输入正确的用户名和密码

    if user_info.login_pwd != UserService.genPwd(login_pwd, user_info.login_salt):
        return ops_renderErrJSON("用户名或密码错误 -2")

    if user_info.status != 1:
        return ops_renderErrJSON("账号存在异常，请联系管理员处理")  # 账号被禁用，请联系管理员处理

    # session['uid'] = user_info.id
    response = make_response(ops_renderJSON(msg="登录成功 自定义请求头"))
    response.set_cookie(app.config['AUTH_COOKIE_NAME'],
                        "%s#%s" % (UserService.genAuthCode(user_info), user_info.id), 60 * 60 * 24 * 120)
    # return ops_renderJSON(msg="登录成功")
    return response


@member_page.route("/logout")
def logout():
    response = make_response(redirect(UrlManager.buildUrl("/")))
    response.delete_cookie(app.config['AUTH_COOKIE_NAME'])
    return response
