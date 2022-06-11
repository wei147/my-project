from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
# app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:1234@127.0.0.1/flask_sql_demo"
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:1234@127.0.0.1/test"  # 测试从model模型转为数据库表
db = SQLAlchemy(app)
