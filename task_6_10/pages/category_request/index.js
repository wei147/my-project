// pages/category/category.js
const cate = require("../../utils/cate.js")
const ss = require('../../utils/time.js')
import {
  request
} from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",
    leftMenuList: [],
    rightMenuList: [],

    catList_children: [],
    currenIndex: 0,
    scrollPosition: 0
  },

  catList: [],



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取缓存数据
    let cateList = wx.getStorageSync('cates')
    // 判断有无数据
    if (!cateList) {
      this.getcateList();
    } else {
      // console.log((Date.now()));
      console.log("发起请求时间："+ss.formatTime(Date.now(),'Y-M-D h:m:s'));

      //判断时间是否过期
      if (Date.now() - cateList.time > 1000 * 30) {
        //重新调用
        this.getcateList();
      } else {
        this.catList = cateList.data;
        let leftMenuList = this.catList.map(v => v.cat_name);
        let rightMenuList = this.catList[0].children;
        this.setData({
          // catList,
          leftMenuList,
          rightMenuList
        })
      }
    }


    // this.getcateList()
  },

  /**
   * 发请求获取接口数据
   */
  getcateList() {
    request({
      url: "/categories"
    }).then((res) => {
      console.log(res.data.message);
      this.catList = res.data.message
      // 缓存
      wx.setStorageSync('cates', {
        time: Date.now(),
        data: this.catList
      });
      let leftMenuList = this.catList.map(v => v.cat_name);
      let rightMenuList = this.catList[0].children;
      this.setData({
        // catList,
        leftMenuList,
        rightMenuList
      })

    }).catch((err) => {
      console.log(err);
    })
    // wx.request({
    //   url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",
    //   success: (res) => {
    //     console.log(res.data.message);
    //     this.catList = res.data.message
    //     // 缓存
    //     wx.setStorageSync('cates', {
    //       time: Date.now(),
    //       data: this.catList
    //     });
    //     let leftMenuList = this.catList.map(v => v.cat_name);
    //     let rightMenuList = this.catList[0].children;
    //     this.setData({
    //       // catList,
    //       leftMenuList,
    //       rightMenuList
    //     })
    //   }
    // })
  },

  /**
   * 用户点击左侧菜单的事件
   */
  onTap: function (e) {
    console.log(e.currentTarget);
    const {
      index
    } = e.currentTarget.dataset;
    let rightMenuList = this.catList[index].children
    wx.showLoading({
      title: '加载中...',
    });
    // console.log(e.currentTarget.dataset.current);
    this.setData({
      currenIndex: index,
      rightMenuList,
      scrollPosition: 0
    });
    wx.hideLoading()
  },

  getLocalTime: function (nS) {
    return new Date(parseInt(nS) * 1000).tolocaleString().replace(/:\d{1,2}$/, ' ');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})