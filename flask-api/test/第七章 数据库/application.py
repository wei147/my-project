from flask import Flask
from indexController import index_page
app = Flask(__name__)

app.register_blueprint(index_page, url_prefix="/v1")

if __name__ == '__main__':
    app.run(debug=True)
