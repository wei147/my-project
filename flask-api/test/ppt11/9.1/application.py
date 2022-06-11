from flask import Flask
from flask_script import Manager
from flask_sqlalchemy import SQLAlchemy
from flask_apscheduler import APScheduler
import os

app = Flask(__name__)

manager = Manager(app)

# 2022年1月24日01:03:04 临时使用 报错提示加载不了数据库配置文件
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:1234@127.0.0.1/movie_cat"
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# app.config.from_pyfile("config/base_setting.py")
app.config.from_pyfile("C:/Users/w1216/Desktop/project/flask-api/test/ppt9/9.1/config/local_setting.py")
# ops_config = local|production
# linux export ops_config=local|production
# window set ops_config=local|production
if "ops_config" in os.environ:
    app.config.from_pyfile("config/%s_setting.py" % (os.environ['ops_config']))

db = SQLAlchemy(app)


# app.logger.info("==============") 启用debug = true 能打印日志信息
