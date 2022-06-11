import argparse
import sys
import traceback
import importlib
from flask_script import Command

'''
Job 统一入口文件
python manager.py runjob -m Test (jobs/tasks/Test.py)
python manager.py runjob -m test/index (jobs/tasks/test/index.py)
'''


class runJob(Command):
    capture_all_args = True

    def run(self, *args, **kwargs):
        # print(sys.argv)
        args = sys.argv[2:]
        parser = argparse.ArgumentParser(add_help=True)
        parser.add_argument("-m", "--name", dest="name", metavar="name",
                            help="指定job名", required=True)
        parser.add_argument("-a", "--act", dest="act", metavar="act",
                            help="Job动作", required=False)
        parser.add_argument("-p", "--param", dest="param", nargs="*", metavar="param",
                            help="业务参数", required=False)  # act 表示动作 required=True表示是必须的 nargs="*"参数无限
        params = parser.parse_args(args)
        params_dict = params.__dict__
        # print(params_dict)
        # print(params)
        if "name" not in params_dict or not params_dict['name']:
            return self.tips()
        try:
            '''
            from jobs.tasks.test import JobTask
            '''
            module_name = params_dict['name'].replace("/", '.')  # 把斜杠/替换成.
            import_string = "jobs.tasks.%s" % (module_name)
            # print(import_string)
            target = importlib.import_module(import_string)
            exit(target.JobTask().run(params_dict))
            pass
        except Exception as e:
            traceback.print_exc()
        return

    def tips(self):
        tip_msg = '''
        请正确调度Job
        python manager.py runjob -m Test (jobs/tasks/Test.py)
        python manager.py runjob -m test/index (jobs/tasks/test/index.py)
        '''
        # print(tip_msg)
        return
