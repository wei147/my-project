import functools


def use_loggin(flag="debug"):
    def decorator(func):
        # @functools.wraps(func)
        def wrapper(*args, **kwargs):
            print("[%s] %s is running" % (flag, func.__name__))
            return func(*args, **kwargs)

        return wrapper

    return decorator


def bar():
    print('i am bar')


def bar2():
    print('i am bar2')


f = use_loggin("info")(bar2)
f()
print(f.__name__)
print(f.__doc__)
