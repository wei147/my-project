from flask import Flask

app = Flask(__name__)


# @app.route('/')
def index():
    return 'index page'


# @app.route('/my/<user_name>')
def my(user_name):
    return 'my page: %s' % (user_name)


# 使用add_url_rule和装饰器app.route是一样的
app.add_url_rule(rule='/', view_func=index)
app.add_url_rule(rule='/my/<user_name>', view_func=my)

if __name__ == '__main__':
    app.run(debug=True)
