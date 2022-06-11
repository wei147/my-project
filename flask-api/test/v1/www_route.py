# 路由注册
from application import app
from controllers.index import index_page

'''
拦截器和错误处理器
'''
from interceptors.errorHandler import *
app.register_blueprint(index_page, url_prefix="/")
