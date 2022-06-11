from flask import Flask, Blueprint, request

index_page = Blueprint("index_page", __name__)


@index_page.route("/")
def first_page():
    return 'blueprint page'


@index_page.route("/my")
def my_page():
    return 'my page'


@index_page.route("/get")
def get():
    var_a = request.args.get("a", "hi")
    return "request:%s,params:%s,var_a:%s" % (request.method, request.args, var_a)


@index_page.route("/post", methods=['POST'])
def post():
    # 三元表达式
    var_a = request.form['a'] if 'a' in request.form else ""
    # 普通容易看懂的
    # var_a = ""
    # if "a" in request.form:
    #     var_a = request.form['a']
    return "request:%s,params:%s,var_a:%s" % (request.method, request.form, var_a)


@index_page.route("/upload", methods=["POST"])
def upload():
    # f = request.files['file']
    return "request:%s,params:%s" % (request.method, request.files)
