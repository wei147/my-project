// pages/pay/pay.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		address: {}, // 用户收获地址
		addressDetail: "", // 详细地址数据 
		cartGoods: [], // 购物车数据,
		totalPrice: 0, // 商品总价
		isPay: false, // 支付点击了支付按钮
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			totalPrice: options.totalPrice
		})
	},


	// 页面显示/切入前台时触发，可能会触发多次
	onShow() {
		let address = wx.getStorageSync('address');
		let addressDetail = wx.getStorageSync('addressDetail');
		let cartGoods = wx.getStorageSync('cartGoods') || [];
		// 从缓存中拿到的是所有购物车数据，这里要筛选出用户选中的商品
		cartGoods = cartGoods.filter(item => item.checked);

		this.setData({
			address,
			addressDetail,
			cartGoods
		});
	},

	// 点击支付按钮，弹出收款码
	toPay() {
		wx.showToast({
			title: '支付成功',
			icon:"success",
			duration:2000
		})
		setTimeout(()=>
   {
		 wx.switchTab({
			 url: '/pages/user/user',
		 })
   }, 2000)
		// 不显示二维码
		// this.setData({
		// 	isPay: true
		// })
	},

	// 取消支付
	cancelPay() {
		this.setData({
			isPay: false
		})
	}
})