from application import db


class Users(db.Model):
    id = db.Column(db.String(8), primary_key=True)
    name = db.Column(db.String(32))
    email = db.Column(db.String(72))
