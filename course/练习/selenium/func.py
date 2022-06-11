""">> > a = " a b c "

>> > b = a.split()  # 字符串按空格分割成列表 b的结果： ['a', 'b', 'c']

>> > c = "".join(b)  # 使用一个空字符串合成列表内容生成新的字符串

>> > c

'abc'

# 快捷用法

>> > a = " a b c "

>> > "".join(a.split())

'abc'"""
my_list = []
texts = [['', '', '', '', '', '', '', '视频', '', '', '', '30万粉抖音网红-绝绝子Lisa两首新裸舞送上【4V/1.27G】', '', '', '', '', '',
          '2022-03-26', '', '', '', ''],
         [
             '', '', '', '', '', '', '', '视频', '', '', '', '大学生热恋情侣校外同居日常自拍视图【8V/2.36G】', '', '', '', '', '',
             '2022-03-26', '', '', '', '']]
for i in texts:
    for j in i:
        if j != "":
            my_list.append(j)

import pymysql

urls = [
    "http://kr.shanghai-jiuxin.com/file/2022/0330/smallc6b1fb7486578cae5db4288b40d819ee.jpg",
    "http://kr.shanghai-jiuxin.com/file/2022/0330/smalld0b242f02a88639bdd77610324f8cb9d.jpg",
    "http://kr.shanghai-jiuxin.com/file/2022/0330/small83db1f75f88ae2bad767c19aa661b319.jpg",
    "http://kr.shanghai-jiuxin.com/file/2022/0330/small66d0adc0e3c33e03d87ae410ec1bea3e.jpg",
    "http://kr.shanghai-jiuxin.com/file/2022/0330/smalle806d57a2f4882522f47369a75e28310.jpg",
    "http://kr.shanghai-jiuxin.com/file/2022/0330/smalle1eaebafc6ab20c623f7c979523df89b.jpg",
    "http://kr.shanghai-jiuxin.com/file/2022/0330/small8c4fb9139786fbc6c0cf85d4ada21a68.jpg",
    "http://kr.shanghai-jiuxin.com/file/2022/0330/small549dc6faf1310499a24e7ca936184da1.jpg",
    "http://kr.shanghai-jiuxin.com/file/2022/0330/smalla21565ef239bd12b095fc96825504c31.jpg",
    "http://kr.shanghai-jiuxin.com/file/2022/0330/small4f8dcdfbfd56018cfa6652b8dc401a13.jpg",
]
names = ["Star Citizen 星际公民 游戏原画4k壁纸",
         "《渎神(Blasphemous)》4k游戏壁纸",
         "《狂怒2(Rage 2)》4k游戏壁纸",
         "《命運2:暗影要塞》Destiny 2 Shadowkeep 4k游戏壁纸",
         "居家看书的美女4k壁纸",
         "海边 女生 风景 4K动漫壁纸",
         "城市夜晚 美女2k手机壁纸",
         "女孩子 初音 阳台 鸟儿 4k动漫壁纸",
         "abominable雪人奇缘4k电影壁纸",
         "奥迪audi r8 lms gt2 赛车跑车4k壁纸", ]

# db = pymysql.connect(host="localhost", user="root", password="1234", database="pymysql_demo")
# cursor = db.cursor()
# 插入数据
# sql = "insert into img_table(id,title,src) values (1,'baidu','www.baidu.com')"
# for i in range(len(urls)):
#     title = names[i]
#     src = urls[i]
#     insert = ("insert into img_table values(%s,%s,%s)")
#     data = (i + 1, title, src)
#     # try:
#     cursor.execute(insert, data)
#     db.commit()
#     # except:
#     #     db.rollback()

# db.close()

# 查询数据
# select = "select * from img_table"
# res = cursor.execute(select)
# res_data = cursor.fetchall()
# print(res_data)
# print(type(res_data))  # fetchall 返回execute查询语句的数据，类型是元组

# for url in urls:
#     # name = url.rsplit("/", 1)[1]  # 从右边切，切一次，得到[1]位置的内容 smallc6b1fb7486578cae5db4288b40d819ee.jpg
#     name = url.lstrip("/")[4]
#     print(name)

from selenium.webdriver import Chrome
from selenium.chaojiying import Chaojiying_Client
import time

path = 'D:\collection\chromedriver\chromedriver.exe'
web = Chrome(path)

web.get("https://www.cunhua.sbs/")
time.sleep(1)
web.find_element_by_xpath('//*[@id="lsform"]/div/div/table/tbody/tr/td[1]/a').click()  # 点击登录
time.sleep(4)
# img = web.find_element_by_xpath('//*[starts-with(@id,"vseccode_")]/img')  #匹配到以什么开头
# img_src = web.find_element_by_xpath('//*[starts-with(@id,"vseccode_")]/img/@src')
# print(img)
# print(img_src)

# 模糊匹配到某个属性
img = web.find_element_by_xpath('//*[contains(@id,"vseccode_")]/img').get_attribute("src")
print(img)  # https://www.cunhua.sbs/misc.php?mod=seccode&update=38463&idhash=cSAT82iOs
chaojiying = Chaojiying_Client('yidou08', 'zxcvbnm.1', '930849')
dic = chaojiying.PostPic(img, 1902)
code = dic["pic_str"]
print("验证码是  ", code)
# 用户名输入框
web.find_element_by_xpath('//*[contains(@id,"username_")]').send_keys("yidou_7")
# 密码
web.find_element_by_xpath('//*[contains(@id,"password3_")]').send_keys("zxcvbnm.")

# 验证码
web.find_element_by_xpath('//*[contains(@id,"seccodeverify_")]').send_keys(code)
time.sleep(2)
# 点击登录
web.find_element_by_xpath('//*[@id="loginform_LidZD"]/div/div[6]/table/tbody/tr/td[1]/button').click()

# 点击签到
logic_info = web.find_element_by_xpath('//*[@id="fx_checkin_b"]')
print(logic_info.get_attribute("alt"))
logic_info.click()
