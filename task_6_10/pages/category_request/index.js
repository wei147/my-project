// pages/category/category.js
const cate = require("../../utils/cate.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",
    catList: [],
    leftMenuList: [],
    rightMenuList: [],

    catList_children: [],
    currenIndex: 0,
    scrollPosition: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getcateList(this.data.url)
    wx.showLoading({
      title: '加载中...',
    });

    wx.hideLoading()
  },

  /**
   * 发请求获取接口数据
   */
  getcateList(url) {
    wx.request({
      url: url,
      success: (res) => {
        console.log(res.data.message);
        let catList = res.data.message
        this.catList = res.data.message
        let leftMenuList = this.catList.map(v => v.cat_name);
        let rightMenuList = this.catList[0].children;
        this.setData({
          catList,
          leftMenuList,
          rightMenuList
        })
      }
    })
  },

  /**
   * 用户点击左侧菜单的事件
   */
  onTap: function (e) {
    console.log(e.currentTarget);
    const{index} = e.currentTarget.dataset;
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