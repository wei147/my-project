# coding: utf-8
from application import db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, info='主键')
    nickname = db.Column(db.String(30), nullable=False, server_default=db.FetchedValue(), info='昵称')
    login_name = db.Column(db.String(20), nullable=False, unique=True, server_default=db.FetchedValue(), info='登录用户名')
    login_pwd = db.Column(db.String(32), nullable=False, server_default=db.FetchedValue(), info='登录用户密码')
    login_salt = db.Column(db.String(32), nullable=False, info='登录密码随机字符串')
    status = db.Column(db.Integer, nullable=False, server_default=db.FetchedValue(), info='状态0：无效， 状态1：有效')
    updated_time = db.Column(db.DateTime, nullable=False)
    create_time = db.Column(db.DateTime, nullable=False)
