// pages/category/category.js
const cate = require("../../utils/cate.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    groups: [],
    currentSection: {},
    currentSecName: "家用电器",
    scrollPosition: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    });

    
    var groups =[]
    for (var i in cate) {
      groups.push(i)
    };
    this.setData({
      groups: groups,
      currentSection: cate[this.data.currentSecName]
    });
    wx.hideLoading()
  },

  /**
   * 发请求获取接口数据
   */
  getData(){

  },

  /**
   * 用户点击左侧菜单的事件
   */
  onTap: function(e) {
    console.log(e.currentTarget);
    wx.showLoading({
      title: '加载中...',
    });
    this.setData({
      currentSecName: e.currentTarget.dataset.current,
      currentSection: cate[e.currentTarget.dataset.current],
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