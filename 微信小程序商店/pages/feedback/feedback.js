import {
	request
} from '../../request/index'


Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// tab标签栏数据
		tabs: [{
				id: 0,
				value: "体验问题"
			},
			{
				id: 1,
				value: "商品/商家投诉"
			}
		],
		// 当前选中的tab
		currentIndex: 0,
		tempImgPath: [], // 图片的临时存储路径
		textValue: "", // 文本输入框的内容
	},

	uploadFilePaths: [],

	// 监听tab组件触发的事件
	tabChange(event) {
		let currentIndex = event.detail.currentIndex;
		this.setData({
			currentIndex
		});
	},

	// 选择图片
	chooseImg() {
		wx.chooseImage({
			success: res => {
				this.setData({
					tempImgPath: this.data.tempImgPath.concat(res.tempFilePaths)
				})
			}
		})
	},

	// 清除图片
	clearImg(event) {
		let index = event.currentTarget.dataset.index;
		let tempImgPath = this.data.tempImgPath;
		tempImgPath.splice(index, 1);
		this.setData({
			tempImgPath
		})
	},

	// 预览图片
	previewImg(event) {
		let index = event.currentTarget.dataset.index;
		let tempImgPath = this.data.tempImgPath;
		console.log(tempImgPath);
		wx.previewImage({
			urls: tempImgPath,
			current: tempImgPath[index]
		})
	},

	// 文本域的输入事件
	handleTextInput(event) {
		this.setData({
			textValue: event.detail.value
		})
	},

	// 提交事件
	handleSubmit() {
		let {
			textValue
		} = this.data;
		if (!textValue) {
			wx.showToast({
				title: '输入不合法',
				icon: 'none',
				mask: true
			});
			this.setData({
				textValue: ""
			})
			return;
		}
		wx.showLoading({
			title: '上传中'
		});
		setTimeout(() => {
			wx.hideLoading();
			wx.showToast({
				title: '上传成功',
			})
			this.setData({
				textValue: "",
				tempImgPath: []
			});
		}, 1000)
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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