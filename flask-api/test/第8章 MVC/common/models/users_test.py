from application import db


class User(db.Model):
    __tablename__ = 'users_test'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16), unique=True)
    email = db.Column(db.String(32), unique=True)
    password = db.Column(db.String(32))
    text = db.Column(db.String(32))
