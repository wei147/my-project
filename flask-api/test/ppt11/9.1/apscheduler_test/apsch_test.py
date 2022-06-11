from apscheduler.schedulers.blocking import BlockingScheduler
import datetime


def aps_test():
    print(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))


scheduler = BlockingScheduler()
scheduler.add_job(func=aps_test, trigger="cron", second="*/5")      # 5秒后执行程序
scheduler.start()






