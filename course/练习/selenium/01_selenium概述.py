from selenium.webdriver import Chrome

path = 'D:\collection\chromedriver\chromedriver.exe'

# 1.创建浏览器对象
web = Chrome(path)

# 2.打开一个网址
web.get("https://www.baidu.com")

print(web.title)
