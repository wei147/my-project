# 即python3自带的装饰器

class Student(object):
    def __init__(self, name, score):
        self.name = name
        self.__score = score

    @property
    def score(self):
        return self.__score

    @score.setter
    def score(self, score):
        if score < 0 or score > 100:
            print('错误的赋值')
        self.__score = score


s1 = Student('chen', 90)
s1.score = 600
print(s1.__score)
