from flask import Flask, Blueprint

app = Flask(__name__)

index_page = Blueprint("index_page", __name__)


@index_page.route("/")
def page_test():
    return 'blueprint page'


app.register_blueprint(index_page, url_prefix="/wei")


@app.route('/index')
def index():
    return 'index page'


# @app.route('/my/<user_name>')
# def my(user_name):
#     return 'my page: %s' % (user_name)


if __name__ == '__main__':
    app.run(debug=True)
