// components/UpImg/UpImg.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		imgUrl: {
			type: String
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 清除图片
		clearImg(){
			this.triggerEvent("clearImg")
		},

		// 预览图片
		previewImg(){
			this.triggerEvent('previewimg')
		}
	}
})