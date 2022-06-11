def use_loggin(flag="debug"):
    def decorator(func):
        def wrapper(*args, **kwargs):
            print("[%s] %s is running" % (flag, func.__name__))
            return func(*args, **kwargs)

        return wrapper

    return decorator


@use_loggin("First")
def bar():
    print('i am bar')


@use_loggin("Second")
def bar2():
    print('i am bar2')


bar()
bar2()
