import json

from flask import Blueprint, request, make_response, jsonify, render_template

index_page = Blueprint("index_page", __name__)


@index_page.route("/")
def first_page():
    return 'blueprint page'


@index_page.route("/upload", methods=["POST"])
def upload():
    # f = request.files['file']
    return "request:%s,params:%s" % (request.method, request.files)


@index_page.route("/text")
def text():
    return "text/html", 404  # 省略写法


@index_page.route("/text_2")
def text_2():
    response = make_response("text/html", 404)
    return response


# @index_page.route("/json")
# def json():
#     data = {"a": "b"}
#     response = make_response(json.dumps(data))
#     response.headers["Content-Type"] = "applocation/json"
#     return response


@index_page.route("/json_2")
def json_2():
    data = {"a": "b"}
    response = make_response(jsonify(data))
    return response


@index_page.route("/template")
def template():
    # 传值
    name = "wei1"
    # 字典的方式
    context = {"name": name, "user": {"nickname": "陈生", "qq": "121638170", "home_page": "baidu.com"},
               'num_list': [1, 2, 3, 4, 5, 6]}
    # return render_template("hello.html", name=name)
    return render_template("hello.html", **context)


@index_page.route("/extend_template")
def extend_template():
    return render_template("extend_template.html")