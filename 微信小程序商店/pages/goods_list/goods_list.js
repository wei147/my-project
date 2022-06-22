import {
	request
} from "../../request/index"

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// tab标签栏数据
		tabs: [{
				id: 0,
				value: "综合"
			},
			{
				id: 1,
				value: "销量"
			},
			{
				id: 2,
				value: "价格"
			}
		],
		// 当前选中的tab
		currentIndex: 0,
		// 请求参数
		queryParams: {
			query: "",
			cid: "",
			pagenum: 1,
			pagesize: 10
		},
		// 商品总页数
		totalPage: 0,
		// 商品列表数据
		goodsList: [],
		// 是否要展示没有数据时的占位图
		isShowPlaceholderImg: false,

	},

	// 监听tab组件触发的事件
	tabChange(event) {
		let currentIndex = event.detail.currentIndex;
		this.setData({
			currentIndex
		});
	},

	// 获取商品列表数据
	getGoodsList() {
		let {
			queryParams,
			goodsList
		} = this.data;

		request({
			url: "/goods/search",
			data: queryParams
		}).then(res => {
			console.log('商品列表：', res);
			let {
				total,
				goods
			} = res.message
			// 计算出总页数
			let totalPage = Math.ceil(total / queryParams.pagesize);
			goodsList = goodsList.concat(goods);
			this.setData({
				goodsList,
				totalPage,
				isShowPlaceholderImg: goodsList.length === 0
			});

			// 关闭下拉刷新的窗口
			wx.stopPullDownRefresh();
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let queryParams = this.data.queryParams;
		queryParams.cid = options.cat_id || "";
		queryParams.query = options.query || "";
		this.setData({
			queryParams
		})
		this.getGoodsList(queryParams);
	},

	// 页面上滑，滚动条触底事件
	onReachBottom() {
		let {
			queryParams,
			totalPage
		} = this.data;

		let currentPage = queryParams.pagenum;
		if (currentPage >= totalPage) {
			wx.showToast({
				title: '没有更多数据了',
				icon: "none"
			});
			return;
		}
		queryParams.pagenum += 1;
		this.setData({
			queryParams
		});
		this.getGoodsList();
	},

	// 监听下拉刷新事件
	onPullDownRefresh() {
		// 1.重置数组
		// 2.重置页码
		let queryParams = this.data.queryParams;
		queryParams.pagenum = 1;
		this.setData({
			goodsList: [],
			queryParams
		});
		// 3.重新发送网络请求
		this.getGoodsList();
	}
})