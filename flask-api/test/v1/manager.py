# 启动文件
from application import app, manager
from flask_script import Server, Command
from www_route import *  # 引入路由注册文件

# web server
manager.add_command("runserver", Server(host="127.0.0.1", use_debugger=True, use_reloader=True))


# create_table 创建数据库表
@Command
def create_all():
    from application import db
    from common.models.user import Users
    db.create_all()


manager.add_command("create_all", create_all)


# 定义一个main方法专门去执行 manager.run()
def main():
    manager.run()


if __name__ == '__main__':
    # app.run(debug=True)
    # manager.run()

    # 加入打印报错
    try:
        import sys

        sys.exit(main())
    except Exception as e:
        import traceback

        traceback.print_exc()
