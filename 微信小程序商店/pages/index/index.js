import {
	request
} from "../../request/index";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		swiperList: [], // 轮播图数据
		cateList: [], // 分类导航数据
		floorList: [], //楼层数据
	},

	// 获取轮播图的数据
	getSwiperList() {
		request({
			url: '/home/swiperdata'
		}).then(res => {
			this.setData({
				swiperList: res.message
			})
		})
	},

	// 获取分类导航数据
	getCateList() {
		request({
			url: '/home/catitems'
		}).then(res => {
			this.setData({
				cateList: res.message
			})
		})
	},

	// 获取楼层数据
	getFloorList() {
		request({
			url: '/home/floordata'
		}).then(res => {
			let num = 0;
			let floorList = res.message.map(item => {
				item.id = num++;
				return item;
			});
			this.setData({
				floorList
			})
		})
	},

	// 跳转到商品分类页面
	toGoodsList(event){
		let url = event.currentTarget.dataset.url;
		let query = url.split("=")[1];
		console.log(query);
		wx.navigateTo({
		  url: '/pages/goods_list/goods_list?query=' + query,
		})

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getSwiperList();
		this.getCateList();
		this.getFloorList();
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