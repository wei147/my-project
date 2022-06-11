from selenium.webdriver import Chrome

import time
from selenium.webdriver.chrome.options import Options  # 不显示浏览器

# 准备好参数配置
opt = Options()
# opt.add_argument("--headless")
# opt.add_argument("--disable-gpu")

path = 'D:\collection\chromedriver\chromedriver.exe'

web = Chrome(path, options=opt)

web.get("http://172.16.30.45/")
time.sleep(2)
web.find_element_by_xpath('//*[@id="edit_body"]/div[3]/div[1]/form/input[2]').send_keys("1920118029")
web.find_element_by_xpath('//*[@id="edit_body"]/div[3]/div[1]/form/input[3]').send_keys("05290775")
time.sleep(4)
web.find_element_by_xpath('//*[@id="edit_body"]/div[3]/div[1]/div[3]/span[2]/input').click()

web.find_element_by_xpath('//*[@id="edit_body"]/div[3]/div[1]/form/input[1]').click()


