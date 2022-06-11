import time
from selenium import webdriver

path = 'D:\collection\chromedriver\chromedriver.exe'
browser = webdriver.Chrome(path)

url = 'https://www.baidu.com/'
browser.get(url)

time.sleep(2)

# 获取文本框的对象
input = browser.find_element_by_id('kw')

# 在文本框中输入周杰伦
input.send_keys('周杰伦')

time.sleep(2)

# 获取百度一下的按钮
button = browser.find_element_by_id('su')

# 点击百度一下按钮
button.click()
time.sleep(2)

# 滑动到底部
js_bottom = 'document.documentElement.scollTop=100000'
browser.execute_script(js_bottom)

time.sleep(2)

# 点击下一页
next = browser.find_element_by_xpath('//a[@class="n"]')
next.click()

time.sleep(2)

# 回到上一页
browser.back()

time.sleep(2)

# 回去
browser.forward()

time.sleep(3)

browser.quit()
