Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    cateList:[],    //导航菜单数组
    floorList:[],   //楼层数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getSwiperList();
    this.getCateList();   //导航菜单
    this.getFloorList();  //楼层

  },

  getSwiperList(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result) => {
        // console.log(result.data.message);
        let swiperList = result.data.message;
        this.setData({
          swiperList
        })
      }
    })
  },

    //获取导航栏数据
    getCateList(){
      wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
        success: (result) => {
          // console.log(result.data.message);
          let cateList = result.data.message;
          this.setData({
            cateList
          })
        }
      })
    },
    //楼层
    getFloorList(){
      wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
        success: (result) => {
          // console.log(result.data.message);
          let floorList = result.data.message;
          this.setData({
            floorList
          })
        }
      })
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