import random
import string
import hashlib
import base64


class UserService():

    @staticmethod
    def genAuthCode(user_info=None):
        m = hashlib.md5()
        str = "%s-%s-%s-%s-%s" % (user_info.id, user_info.login_name, user_info.login_pwd,
                                  user_info.login_salt, user_info.status)
        m.update(str.encode("utf-8"))
        return m.hexdigest()

    @staticmethod
    def genPwd(pwd, salt):
        m = hashlib.md5()
        str = "%s-%s" % (base64.encodebytes(pwd.encode("utf-8")), salt)
        m.update(str.encode("utf-8"))  # 使即使是两个都是123456，但最终算出来的密码是不一样的
        return m.hexdigest()

    @staticmethod
    def genSalt(length=16):
        # ASCII字母 + ASCII数字,生成 “盐”
        keylist = [random.choice((string.ascii_letters + string.digits)) for i in range(length)]
        return ("".join(keylist))
