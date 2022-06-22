import {
	request
} from "../../request/index";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		allCateData: [], // 所有商品数据
		leftMenuList: [], // 左侧菜单
		rightData: [], // 右侧商品数据
		currentMenuIndex: 0, // 当前激活的菜单
		rightContentTop: 0, // 右侧scroll-view滚动条的位置
	},

	// 获取分类数据
	getCateData() {
		request({
			url: "/categories"
		}).then(res => {
			console.log("商品分类数据：",res);
			let allCateData = res.message;

			// 把接口中的数据存入本地存储
			wx.setStorageSync('cates', {
				time: Date.now(),
				data: allCateData
			})

			// 获取左侧菜单数据和右侧商品数据
			this.getMenuAndGoods(allCateData);
		})
	},

	// 从所有商品数据中分离出左侧菜单数据和右侧商品数据
	getMenuAndGoods(allCateData) {
		// 获取左侧菜单数据
		let leftMenuList = allCateData.map(item => item.cat_name);

		// 获取右侧商品数据
		let rightData = allCateData[0].children;

		this.setData({
			allCateData,
			leftMenuList,
			rightData
		});
	},

	// 点击切换左侧菜单
	changeMenu(event) {
		let currentMenuIndex = event.target.dataset.index;
		this.setData({
			currentMenuIndex,
			rightData: this.data.allCateData[currentMenuIndex].children,
			rightContentTop: 0 // 将右侧商品列表的滚动条置顶
		});

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		/**
		 * 1先判断一下本地存储中有没有旧的数据
		 * 2没有旧数据直接发送新请求
		 * 3有旧的数据同时旧的数据也没有过期，就使用本地存储中的旧数据即可
		 */

		// 1.获取本地存储的数据
		let cates = wx.getStorageSync('cates');
		if (!cates) {
			this.getCateData();
		} else {
			// 定义过期时间为5分钟
			if (Date.now() - cates.time > 5* 60 * 1000) {
				// 数据过期
				this.getCateData();
			} else {
				// 可以使用旧的数据
				this.getMenuAndGoods(cates.data)
			}
		}

	}

})