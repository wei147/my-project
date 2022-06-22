// 在首页会同时发送三个网络请求，必须在三个请求的数据都到达后再关闭loading

let requestTime = 0

export function request(params) {
	let baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";

	requestTime++;

	wx.showLoading({
		title: '加载中',
		mask: true
	})

	return new Promise((resolve, reject) => {
		wx.request({
			...params,
			url: baseUrl + params.url, // params参数中有url，这里再设置一遍url会将上边解构出来的url的值覆盖掉
			success: res => {
				resolve(res.data)
			},
			fail: err => {
				reject(err)
			},
			complete: () => {
				requestTime--;
				if(requestTime === 0) {
					wx.hideLoading();
				}
			}
		})
	})
}