// pages/collect/collect.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// tab标签栏数据
		tabs: [{
				id: 0,
				value: "商品收藏"
			},
			{
				id: 1,
				value: "品牌收藏"
			},
			{
				id: 2,
				value: "店铺收藏"
			},
			{
				id: 3,
				value: "浏览足迹"
			}
		],
		// 当前选中的tab
		currentIndex: 0,
		// 收藏的商品列表
		collectGoods:[]
	},

	// 监听tab组件触发的事件
	tabChange(event) {
		let currentIndex = event.detail.currentIndex;
		this.setData({
			currentIndex
		});
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let collectGoods = wx.getStorageSync('collectGoods') || [];
		this.setData({
			collectGoods
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