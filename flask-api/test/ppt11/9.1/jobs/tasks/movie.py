import json
import os
import re
import time
import hashlib
from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse
from common.libs.DataHelper import getCurrentTime
from common.models.movie import Movie
from application import db, app

'''
python manager.py runjob -m movie -a list | parse (list获取列表信息 parse解析info信息)
'''


class JobTask():
    def __init__(self):
        self.source = "ldytt"
        self.url = {
            "num": 3,  # 控制下载的页数
            "url": "http://ldytt.com/List/1-pg-#d#.html",
            "path": "C:/Users/w1216/Desktop/project/flask-api/test/ppt9/9.1/%s" % self.source
        }

    '''
    首先 获取列表list html 回来，通过解析html 获取详情url，再根据详情url 获取详情html回来
    '''

    def run(self, params):
        act = params['act']
        self.date = getCurrentTime(frm="%Y%m%d")
        if act == "list":
            self.getList()
            self.parseInfo()
        elif act == "parse":
            self.parseInfo()

    # 获取列表
    def getList(self):
        config = self.url
        path_root = config['path'] + self.date
        path_list = path_root + "/list"
        path_info = path_root + "/info"
        path_json = path_root + "/json"
        path_vid = path_root + "/vid"

        self.makeSuredirs(path_root)
        self.makeSuredirs(path_list)
        self.makeSuredirs(path_info)
        self.makeSuredirs(path_json)
        self.makeSuredirs(path_vid)
        pages = range(1, config['num'] + 1)
        for idx in pages:
            tmp_path = path_list + "/" + str(idx)
            tmp_url = config['url'].replace("#d#", str(idx))
            app.logger.info("get list :" + tmp_url)
            # 如果文件已存在就不会获取
            if os.path.exists(tmp_path):
                continue

            tmp_content = self.getHttpContent(tmp_url)
            # app.logger.info(tmp_content)
            self.saveContent(tmp_path, tmp_content)
            time.sleep(0.3)

        for idx in os.listdir(path_list):
            tmp_content = self.getContent(path_list + "/" + str(idx))
            items_data = self.parseList(tmp_content)
            if not items_data:
                continue

            for item in items_data:
                tmp_json_path = path_json + "/" + item['hash']
                tmp_info_path = path_info + "/" + item['hash']
                tmp_vid_path = path_vid + "/" + item['hash']
                if not os.path.exists(tmp_info_path):  # 如果文件不存在就保存
                    self.saveContent(tmp_json_path, json.dumps(item, ensure_ascii=False))
                # break

                if not os.path.exists(tmp_info_path):
                    tmp_content = self.getHttpContent(item['url'])
                    self.saveContent(tmp_info_path, tmp_content)

                if not os.path.exists(tmp_vid_path):
                    tmp_content = self.getHttpContent(item['vid_url'])
                    self.saveContent(tmp_vid_path, tmp_content)

                time.sleep(0.3)

    def parseList(self, content):
        data = []
        config = self.url
        url_info = urlparse(config['url'])
        # app.logger.info(url_info)
        url_domain = url_info[0] + "://" + url_info[1]  # http://ldytt.com
        # app.logger.info(url_domain)

        tmp_soup = BeautifulSoup(str(content), "html.parser")
        tmp_list = tmp_soup.select("div.list_su ul li")
        for tmp_item in tmp_list:
            tmp_target = tmp_item.select("a.pic_link")
            tmp_name = tmp_target[0]['title']
            tmp_href = tmp_target[0]['href']
            if "http:" not in tmp_href:
                tmp_href = url_domain + tmp_href
            tmp_vid_url = (tmp_href.replace("btdy/bt", "down/")).replace(".html", "-1-1.html")
            # app.logger.info(tmp_href, tmp_name)

            tmp_data = {
                "name": tmp_name,
                "url": tmp_href,
                "vid_url": tmp_vid_url,
                "hash": hashlib.md5(tmp_href.encode("utf-8")).hexdigest()
            }

            # app.logger.info(tmp_data)
            # exit(0)
            data.append(tmp_data)
        return data

    '''
    解析详情信息
    '''

    def parseInfo(self):
        config = self.url
        path_root = config['path'] + self.date
        path_info = path_root + "/info"
        path_json = path_root + "/json"
        path_vid = path_root + "/vid"
        for filename in os.listdir(path_info):
            tmp_json_path = path_json + "/" + filename
            tmp_info_path = path_info + "/" + filename
            tmp_vid_path = path_vid + "/" + filename

            tmp_data = json.loads(self.getContent(tmp_json_path), encoding="utf-8")
            # app.logger.info(tmp_data)
            # exit(0)
            tmp_content = self.getContent(tmp_info_path)
            tmp_soup = BeautifulSoup(tmp_content, "html.parser")
            try:
                tmp_pub_date = tmp_soup.select("div.vod div.vod_intro dl dd")[0].getText()
                tmp_desc = tmp_soup.select("div.des")[0].getText()
                tmp_classify = tmp_soup.select("div.vod div.vod_intro dl dd")[2].getText()
                tmp_actor = tmp_soup.select("dd.zhuyan")[0].getText()
                tmp_pic_list = tmp_soup.select("div.vod_img img")
                tmp_pics = []
                for tmp_pic in tmp_pic_list:
                    tmp_pics.append(tmp_pic['src'])

                # 获取下载地址
                # tmp_download_url = (tmp_data['url'].replace("btdy/bt", "down/")).replace(".html", "-1-1.html")
                # tmp_download_content = self.getHttpContent(tmp_download_url)
                tmp_download_content = self.getContent(tmp_vid_path)
                tmp_vid_soup = BeautifulSoup(tmp_download_content, "html.parser")

                # tmp_download_list = tmp_vid_soup.findAll("p", href=re.compile("magnet:?"))
                # tmp_download_list = tmp_vid_soup.select("div.movie_dl p")[1].getText()
                # tmp_magnet_url = tmp_vid_soup.select("div.movie_dl p")[1].getText()
                # if tmp_download_list:
                #     tmp_magnet_url = tmp_download_list

                # app.logger.info(tmp_magnet_url)

                # tmp_download_list = tmp_soup.select("div#nucms_downlist div.p_list a.d1")
                # tmp_magnet_url = ""
                # for tmp_download in tmp_download_list:
                #     tmp_magnet_url = tmp_download['href']
                tmp_magnet_url = tmp_vid_soup.select("div.movie_dl p")[1].getText()

                tmp_data['pub_date'] = tmp_pub_date
                tmp_data['desc'] = tmp_desc
                tmp_data['classify'] = tmp_classify
                tmp_data['actor'] = tmp_actor
                tmp_data['magnet_url'] = tmp_magnet_url
                tmp_data['source'] = self.source
                tmp_data['create_time'] = tmp_data['updated_time'] = getCurrentTime()

                if tmp_pics:
                    tmp_data['cover_pic'] = tmp_pics[0]
                    tmp_data['pics'] = json.dumps(tmp_pics)
                # app.logger.info(tmp_data)

                tmp_movie_info = Movie.query.filter_by(hash=tmp_data['hash']).first()
                if tmp_movie_info:
                    continue

                tmp_model_movie = Movie(**tmp_data)
                db.session.add(tmp_model_movie)
                db.session.commit()
                # app.logger.info("成功")
            except:
                continue
        return True

    def getHttpContent(self, url):
        try:
            r = requests.get(url)
            if r.status_code != 200:
                return None

            return r.content
        except Exception:
            return None

    def saveContent(self, path, content):
        if content:
            with open(path, mode="w+", encoding="utf-8") as f:
                if type(content) != str:
                    content = content.decode("utf-8")
                f.write(content)
                f.flush()
                f.close()

    def getContent(self, path):
        if os.path.exists(path):
            with open(path, "r", encoding='utf-8') as f:
                return f.read()

        return ''

    def makeSuredirs(self, path):
        # 如果路径不存在就创建
        if not os.path.exists(path):
            os.makedirs(path)
