let ajaxItem = 0;

export const request = (params) => {
  ajaxItem++
  wx.showLoading({
    title: '加载中...',
  });
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    console.log(baseUrl+params.url);
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (res) => {

        resolve(res);
      },
      fail: (err) => {
        reject(err)
      },
      //只有当所有数据请求回来
      complete: () => {
        ajaxItem--
        if (ajaxItem === 0) {
          wx.hideLoading()
        }
      }
    })
  })
}