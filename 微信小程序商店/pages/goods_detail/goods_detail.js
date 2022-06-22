import {
	request
} from "../../request/index"

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// 商品详情数据
		goodsDetail: {},
		// 当前商品是否被收藏
		isCollect: false
	},

	// 获取商品详情
	getGoodsDetail(goods_id) {
		request({
			url: "/goods/detail",
			data: {
				goods_id
			}
		}).then(res => {
			console.log("商品详情", res);

			this.setData({
				goodsDetail: res.message
			})
		})
	},

	// 预览图片
	previewImg(event) {
		let pics = this.data.goodsDetail.pics;
		pics = pics.map(item => item.pics_mid);

		// 当前轮播图中正在展示的图片
		let current = event.target.dataset.url;
		console.log(current);
		wx.previewImage({
			urls: pics,
			current
		})
	},

	/**
	 * 点击加入购物车
	 * 1.先绑定点击事件
	 * 2.获取缓存中的购物车数据，数组格式
	 * 3.先判断当前的商品是否已经存在于购物车
	 * 4.已经存在，修改商品数据，执行购物车数量++，重新把购物车数组填充回缓存中
	 * 5.不存在于购物车的数组中，直接给购物车数组添加一个新元素，
	 * 	新元素带上购买数量属性num，重新把购物车数组填充回缓存中
	 * 6.弹出提示
	 */
	addCart() {
		let cart = wx.getStorageSync('cartGoods') || [];
		let goodsDetail = this.data.goodsDetail;
		let index = cart.findIndex(item => item.goods_id === goodsDetail.goods_id);
		if (index === -1) {
			// 商品不存在于购物车
			// 商品初始购买数量为1，并将checked设置为true，用于在购物车页面上默认选中
			goodsDetail.num = 1;
			goodsDetail.checked = true;
			cart.push(goodsDetail);
		} else {
			// 商品存在于购物车，数量+1
			cart[index].num++;
		}
		wx.setStorageSync('cartGoods', cart);
		wx.showToast({
			title: '添加成功',
			mask: true
		});
	},

	// 收藏商品
	collect() {
		let isCollect = this.data.isCollect;
		let goodsDetail = this.data.goodsDetail;
		let collectGoods = wx.getStorageSync('collectGoods') || [];
		this.setData({
			isCollect: !isCollect
		});

		if (!isCollect) {
			collectGoods.push(goodsDetail);
		} else {
			let index = collectGoods.findIndex(item => item.goods_id === goodsDetail.goods_id);
			collectGoods.splice(index, 1);
		}
		wx.setStorageSync('collectGoods', collectGoods);

		wx.showToast({
			title: !isCollect ? '收藏成功' : '取消收藏',
			mask: true
		});

	},

	onShow() {
		let pages = getCurrentPages();
		let currentPage = pages[pages.length - 1];
		let goods_id = parseInt(currentPage.options.goods_id);
		// 获取商品详情
		this.getGoodsDetail(goods_id);

		// 判断当前商品是否被收藏
		let collectGoods = wx.getStorageSync('collectGoods') || [];
		// 对于空数组来说，some返回false
		let isCollect = collectGoods.some(item => item.goods_id === goods_id);
		this.setData({
			isCollect
		});
	}

	

	
})