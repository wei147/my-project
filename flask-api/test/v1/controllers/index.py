from flask import Blueprint, render_template

from common.models.user import Users

index_page = Blueprint("index_page", __name__)


@index_page.route("/")
def index():
    # 传值
    name = "wei"
    # 字典的方式
    context = {"name": name, "user": {"nickname": "陈生", "qq": "121638170", "home_page": "baidu.com"},
               'num_list': [1, 2, 3, 4, 5, 6]}

    result = Users.query.all()
    context['result'] = result
    return render_template("hello.html", **context)
