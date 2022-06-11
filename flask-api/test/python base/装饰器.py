def use_loggin(func):
    # print("[debug] " + func_name + " is running")
    def wrapper(*args, **kwargs):
        print("[debug] %s is running" % func.__name__)
        return func(*args, **kwargs)
    return wrapper


def bar():
    use_loggin("bar")
    print('i am bar')


def bar2():
    use_loggin("bar2")
    print('i am bar2')


barTest = use_loggin(bar)
barTest()

bar2Test = use_loggin(bar2)
bar2Test()
