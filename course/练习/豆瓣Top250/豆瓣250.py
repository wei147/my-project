import urllib
from urllib import request

from lxml import etree
import requests


def Top250(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/95.0.4638.69 Safari/537.36 '
    }
    response = requests.get(url, headers=headers)
    request = etree.HTML(response.text)
    parse(request)


def parse(request):
    title_list = request.xpath("//span[@class='title'][1]/text()")
    title_eng_list = request.xpath("//span[@class='title'][2]/text()")  # 需要替换 /,去空格 .strip()
    other_name_list = request.xpath("//span[@class='other']/text()")  # 需要替换 /,去空格
    rating_list = request.xpath("//span[@class='rating_num']/text()")
    comment_num_list = request.xpath("//div[@class='star']/span[4]/text()")
    quote_list = request.xpath("//span[@class='inq']/text()")  # 需要替换 /,去空格
    info_list = request.xpath("//div[@class='bd']/p[1]/text()")
    pic_list = request.xpath("//div[@class='pic']/a/img/@src")

    download_pic(title_list, pic_list)


def download_pic(name_list, src_list):
    # urllib.request.urlretrieve('图片地址', '文件的名字')
    for i in range(len(name_list)):
        name = name_list[i]
        url = src_list[i]
        urllib.request.urlretrieve(url=url, filename='./豆瓣top250_img/' + name + '.jpg')


def next_page():
    pass


if __name__ == '__main__':
    # 共250条数据，起始页数为0，每页25条
    for i in range(0, 50, 25):
        url = "https://movie.douban.com/top250?start={start}".format(start=i)
        Top250(url)
