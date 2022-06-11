def use_loggin(func):
    # print("[debug] " + func_name + " is running")
    def wrapper(*args, **kwargs):
        print("[debug] %s is running" % func.__name__)
        return func(*args, **kwargs)

    return wrapper


@use_loggin
def bar():
    # use_loggin("bar")
    print('i am bar')


@use_loggin
def bar2():
    # use_loggin("bar2")
    print('i am bar2')


# bar = use_loggin(bar)
bar()

# bar2 = use_loggin(bar2)
bar2()
