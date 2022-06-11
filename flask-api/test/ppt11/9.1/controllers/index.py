from flask import Blueprint, render_template, session
from application import app
from common.models.user import User
from common.libs.Helper import ops_render
index_page = Blueprint("index_page", __name__)


@index_page.route("/")
def index():
    # 传值
    name = "wei"
    # 字典的方式
    context = {"name": name, "user": {"nickname": "陈生", "qq": "121638170", "home_page": "baidu.com"},
               'num_list': [1, 2, 3, 4, 5, 6]}

    result = User.query.all()
    context['result'] = result

    # app.logger.info(session['uid'])  不推荐使用 session
    # return render_template("index.html", **context)
    return ops_render("index.html", context)
