# 线程, 进程
# 进程是资源单位, 每一个进程至少要有一个线程
# 线程是执行单位

# def func():
#     for i in range(8):
#         print("func", i)
#
#
# # 启动每一个程序默认都会有一个主线程
# if __name__ == '__main__':
#     func()
#     for i in range(8):
#         print("main", i)


# 多线程
from threading import Thread  # 线程类


#
#
# def func():
#     for i in range(8):
#         print("func", i)
#
#
# # 启动每一个程序默认都会有一个主线程
# if __name__ == '__main__':
#     t = Thread(target=func)  # 创建线程并给线程安排任务
#     t.start()   # 多线程状态为可以开始工作状态,具体的执行时间由CPU决定
#     for i in range(8):
#         print("main", i)


class MyThread(Thread):
    def run(self):  # 固定的   -> 当线程可以执行之后,被执行的就是run()
        for i in range(8):
            print("子线程", i)


if __name__ == '__main__':
    t = MyThread()
    # t.run()  # 方法的调用了 -> 单线程
    t.start()  # 开启线程
    for i in range(8):
        print("主线程", i)
