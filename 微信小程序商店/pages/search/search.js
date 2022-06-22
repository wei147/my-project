import {
	request
} from "../../request/index";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		searchResult: [], // 搜索结果
		query: "", // 查询参数
	},

	// 输入框失去焦点
	handleInput(event) {
		let query = event.detail.value;
		this.setData({
			query
		})
	},

	// 搜索
	toSearch() {
		let query = this.data.query.trim();
		if (!query) {
			wx.showToast({
				title: '输入值不合法',
				icon: "error"
			});
			this.setData({
				query: ""
			})
			return;
		}

		request({
			url: "/goods/qsearch",
			data: {
				query
			}
		}).then(res => {
			console.log('搜索结果', res);
			let searchResult = res.message || [];
			this.setData({
				searchResult
			});
			if (searchResult.length === 0) {
				wx.showToast({
					title: '暂无结果',
					icon: 'none',
					mask: true
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},


})