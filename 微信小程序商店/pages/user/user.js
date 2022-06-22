// pages/user/user.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: {}, // 用户信息,
		collectGoods: [], // 收藏的商品
		bg_img: "/icons/bg.jpg"
	},

	changeBG() {
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success:res=>{
				// tempFilePath可以作为 img 标签的 src 属性显示图片
				const tempFilePaths = res.tempFilePaths
				console.log(tempFilePaths);
				this.setData({
					bg_img:tempFilePaths
				})
			}
		})
		// wx.chooseMedia({
		// 	count: 1,
		// 	mediaType: ['image'],
		// 	sourceType: ['album'],
		// 	maxDuration: 30,
		// 	tempFilePath: "/tempFilePathe",
		// 	success: res => {
		// 		console.log(res.tempFiles.tempFilePath)
		// 		console.log(res.tempFiles.size)
		// 		// const bg_img=this.data.bg_img
		// 		this.setData({
		// 			bg_img: res.tempFilePath
		// 		});
		// 	}
		// })
	},

	// 获取用户信息
	getUserProfile() {
		wx.showLoading({
			title: '登录中',
		})
		wx.getUserProfile({
			desc: "用于小程序的用户展示",
			success: res => {
				this.setData({
					userInfo: res.userInfo
				});
				wx.setStorageSync('userInfo', res.userInfo);
				wx.hideLoading();
			}
		})
	},
	exit() {
		if (this.data.userInfo) {
			console.log("info不为空");
			wx.showActionSheet({
				itemList: ['退出登录'],
				success: res => {
					// resolve(res.data)
					this.setData({
							userInfo: ''
						}),
						// 把user缓存存储为空
						wx.setStorageSync('user', '')
					console.log(this.data.userInfo);
				},
				fail: res => {
					// console.log(res.errMsg)
				}
			})
		} else if (!this.data.userInfo) {
			console.log("info为空");
			wx.showToast({
				title: '请先登录',
				icon: "none",
				duration: 1000
			})
		}
		// wx.showModal({
		// 	title: '提示',
		// 	content: '确定要退出登录吗',
		// 	success (res) {
		// 		if (res.confirm) {
		// 			console.log('用户点击确定')
		// 		} else if (res.cancel) {
		// 			console.log('用户点击取消')
		// 		}
		// 	}
		// })


	},

	onShow: function () {
		// 获取用户信息
		let userInfo = wx.getStorageSync('userInfo') || {};
		// 获取收藏商品的列表
		let collectGoods = wx.getStorageSync('collectGoods') || [];
		this.setData({
			userInfo,
			collectGoods
		})
	},


})