# 购物商城微信小程序

## API接口文档
[API接口](https://www.showdoc.com.cn/128719739414963/2513235043485226)

## 分类页面
- 本地存储
	- 由于数据量比较大，在进入到商品分类页面时，会先判断本地存储是否有数据，如果没有就发送网络请求获取数据；如果有数据并且没有过期就使用本地存储的数据。
- 左侧菜单栏和右侧商品栏
	- 都使用了scroll-view组件
	- scroll-view组件高度固定，设置为页面高度减去顶部搜索栏的高度

## 收获
 - 自定义组件
 - 组件之间的通信
 - 购物车页面的逻辑
 - 将发送网络请求的API封装为Promise形式的
 - 意见反馈页面中图片上传和展示

##  效果图

### 首页
![](https://p.pstatp.com/origin/pgc-image/c2206716e3f04015a2ea1bab95d8010c)

### 搜索页面
![](https://p.pstatp.com/origin/pgc-image/9a3b219c42d94ff8b5f3cb4111b0a597)

### 商品分类
![](https://p.pstatp.com/origin/pgc-image/2e57350ac9b74a4f8c6eb65c3f247f1e)
![](https://p.pstatp.com/origin/pgc-image/a69eafe3efc942ce9a5095661da8eefb)

### 商品列表
![](https://p.pstatp.com/origin/pgc-image/ed82d07c92504229a4dc4d753bc0d9d8)

### 商品详情
![](https://p.pstatp.com/origin/pgc-image/f28e15c6fac14ee78ee4ad0587e4da12)

### 购物车
![](https://p.pstatp.com/origin/pgc-image/21c5f58b91f942618fee442aeb20cfa3)

### 支付页（静态页面，没有支付功能）
![](https://p.pstatp.com/origin/pgc-image/a292e861f36443c39173d908b8a8763d)

### 个人中心
![](https://p.pstatp.com/origin/pgc-image/7ad534590e684fe8a93012d27f03a17a)

### 商品收藏列表
![](https://p.pstatp.com/origin/pgc-image/15752949d8354fdc9438d4f14e6d14a8)

### 意见反馈
![](https://p.pstatp.com/origin/pgc-image/b4aa3a06e98f4e298f0af267d84bbac6)
