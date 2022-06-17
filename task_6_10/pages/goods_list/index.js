import {
  request
} from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {

    tabs: [{
      id: 0,
      value: "综合",
      isActive: true
    }, {
      id: 1,
      value: "销量",
      isActive: false
    }, {
      id: 2,
      value: "价格",
      isActive: false
    }],
    goods_list: [],
  },

  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },

  totalPage: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.QueryParams.cid = options.cid;
    console.log(this.QueryParams.cid);
    this.getGoodList();

  },

  getGoodList() {
    request({
      url: "/goods/search",
      data: this.QueryParams
    }).then(res => {
      console.log(res.data.message.goods);
      //获取总条数
      const total = res.total;
      //计算总页数
      this.totalPage = Math.ceil(total / this.options.pagesize);

      this.setData({
        // goods_list: res.data.message.goods
        goods_list:[...this.data.goods_list,...res.data.message.goods]

      })
    }).catch(err => {
      console.log(err);
    })
  },


  handleItemTap(e) {
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false;
    })
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      goods_list: []
    });
    this.QueryParams.pagenum = 1;
    this.getGoodList()


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.totalPage) {
      wx.showToast({
        title: '我是有底线的',
        icon:"none"
      })
    }else{
        this.QueryParams.pagenum++;
        this.getGoodList();
      }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})