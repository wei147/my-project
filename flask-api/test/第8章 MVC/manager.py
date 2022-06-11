# 启动文件
from application import app, db
from www_route import *  # 引入路由注册文件

if __name__ == '__main__':
    from common.models.users_test import User
    db.create_all()
    # app.run(debug=True)
