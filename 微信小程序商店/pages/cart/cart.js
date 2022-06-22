// pages/cart/cart.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		address: {}, // 用户收获地址
		addressDetail: "", // 详细地址数据 
		cartGoods: [], // 购物车数据
		isSelectAll: false, // 是否全选,
		totalNum: 0, // 选中商品的数量
		totalPrice: 0, // 选中商品的总价
	},

	// 点击获取收获地址按钮
	chooseAddress() {
		wx.chooseAddress({
			success: (address) => {
				wx.setStorageSync('address', address);
				let addressDetail = address.provinceName + address.cityName + address.countyName + address.detailInfo
				wx.setStorageSync('addressDetail', addressDetail)
			},
		})
	},

	// 改变某一个商品的选中状态
	selectOne(event) {
		let goods_id = event.target.dataset.goodsId;

		let cartGoods = this.data.cartGoods;
		let index = cartGoods.findIndex(item => item.goods_id === goods_id);
		cartGoods[index].checked = !cartGoods[index].checked;

		// 重新计算选中商品的总价和数量
		this.setCart(cartGoods);
	},

	// 全选/全不选商品
	selectAll(event) {
		let isSelect = event.detail.value.length > 0;

		let cartGoods = this.data.cartGoods;
		cartGoods.forEach(item => {
			item.checked = isSelect;
		});

		// 重新计算选中商品的总价和数量
		this.setCart(cartGoods);
	},

	// 改变商品数量
	changeNum(event) {
		let num = event.target.dataset.num;
		let goods_id = event.target.dataset.goodsId;
		let cartGoods = this.data.cartGoods;

		let index = cartGoods.findIndex(item => item.goods_id === goods_id);
		let goods = cartGoods[index];

		// 当商品数量为1，而继续点击减少的按钮时就触发删除的功能
		if (num < 0 && goods.num === 1) {
			wx.showModal({
				title: "提示",
				content: "是否要删除该商品？",
				success: res => {
					if (res.confirm) {
						cartGoods.splice(index, 1);
						this.setCart(cartGoods);
					}
				}
			})
		} else {
			goods.num += num;
			this.setCart(cartGoods);
		}

	},

	// 点击结算
	toPay() {
		let {
			address,
			totalNum
		} = this.data;

		if (!address.userName) {
			wx.showToast({
				title: '请添加收获地址',
				icon: 'none'
			});
			return;
		}

		if (totalNum === 0) {
			wx.showToast({
				title: '您还没有选购商品哦',
				icon: 'none'
			});
			return;
		}
		wx.navigateTo({
			url:"/pages/pay/pay?totalPrice=" + this.data.totalPrice
		})
	},

	/**
	 * 计算当前选中商品的总价和数量，
	 * 将新的购物车数据重新写入缓存，
	 * 改变全选框的状态
	 * @param {cartGoods} cartGoods 
	 */
	setCart(cartGoods) {
		let totalPrice = 0;
		let totalNum = 0;
		let isSelectAll = true;
		cartGoods.forEach(item => {
			if (item.checked) {
				totalNum++;
				totalPrice += item.goods_price * item.num;
			} else {
				// 判断当前商品是否全部选中
				isSelectAll = false;
			}
		});

		this.setData({
			totalPrice,
			totalNum,
			isSelectAll,
			cartGoods
		});

		// 将当前购物车中的数据重新写入缓存
		wx.setStorageSync('cartGoods', cartGoods);
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	// 页面显示/切入前台时触发，可能会触发多次
	onShow() {
		let address = wx.getStorageSync('address');
		let addressDetail = wx.getStorageSync('addressDetail');
		let cartGoods = wx.getStorageSync('cartGoods') || [];

		//  计算当前选中商品的总价和数量
		this.setCart(cartGoods);

		this.setData({
			address,
			addressDetail,
			cartGoods
		});
	},
})