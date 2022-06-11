# 本地开发环境配置文件
from config.base_setting import *

# app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:1234@127.0.0.1/movie_cat"
SQLALCHEMY_DATABASE_URI = "mysql://root:1234@127.0.0.1/movie_cat"
SQLALCHEMY_TRACK_MODIFICATIONS = True
DOMAIN = {
    # 课程里是本机ip地址，而非127..
    "www": "http://127.0.0.1:5000"
}

# RELEASE_PATH = 'test/ppt9/9.1/release_version'
