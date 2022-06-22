// components/tabs/Tabs.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		tabs: {
			type: Array,
			value: []
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		currentIndex: 0
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 切换tab菜单
		changeTab(event) {
			let currentIndex = event.target.dataset.index;
			this.setData({
				currentIndex
			});
			this.triggerEvent("tabChange", {
				currentIndex
			})
		},
	}
})