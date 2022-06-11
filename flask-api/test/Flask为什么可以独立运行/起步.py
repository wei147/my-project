from flask import Flask

app1 = Flask(__name__)


@app1.route("/")
def hello():
    return 'hello'


if __name__ == '__main__':
    app1.run(debug=True)
