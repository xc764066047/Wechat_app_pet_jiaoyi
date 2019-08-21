//index.js
//获取应用实例，就能用app.xxx获取到app.js里的数据
const app = getApp()

Page({
	// 生命周期
	onReady: function (e) {
		// 使用 wx.createMapContext 获取 map 上下文
		this.mapCtx = wx.createMapContext('map')
	},

	// 下面点击 定位 按钮就能跳转到指定id的map的show-location位置
	moveToLocation: function () {
		this.mapCtx.moveToLocation()
	},

	// 定位按钮bindtap（点击）事件触发的方法
	callback: function () {
		this.moveToLocation();
	},

	// 数据
	data: {
		longitude: '',
		latitude: '',
		markers: {}
	},

	// 生命周期，显示页面时调用
	onShow() {
		// 一打开页面就调用获取地理位置方法
		this.getLocation();
		this.getMessages();
	},
	// 获取api里的信息
	getMessages() {
		wx.request({
			url: 'http://localhost:3000/list/',
			data: {
				distinct: app.globalData.distinct	// 只获取带有此标识符的数据
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 后端要求这样做，填写这个就会将数字也带上双引号
			},
			success: this.getMessagesSucc.bind(this)
		})
	},
	// 被请求成功后上面调用
	getMessagesSucc(res) {
		// 用map遍历res.data里的每一项数据，保存到arr对象里
		const markers = res.data.map((value, index) => {
			return {
				iconPath: "/resources/"+ value.type + ".png",
				id: value.id,
				latitude: value.latitude,
				longitude: value.longitude,
				width: 40,
				height: 40
			}
		})
		this.setData({
			markers: markers
		})
	},

	getLocation() {
		// wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
		type: 'gcj02';
		wx.getLocation({
			// 获取地理位置成功就调用handleGetLocationSucc方法，且绑定这里的作用域
			success: this.handleGetLocationSucc.bind(this)
		})
	},

	handleGetLocationSucc(res) {
		// 改变data
		this.setData({
			longitude: res.longitude,
			latitude: res.latitude
		})
	},

	// 分享页面逻辑
	onShareAppMessage: function () {
		return {
			title: '萌宠交易平台',
			path: '/pages/index/index'
		}
	},

	// 点击地图上的图标调用的方法
	handleMarkerTap(e) {
		// 跳转到对应页面的时候，会解析url里面的id的值，会传到options里，利用options.id可以发送请求查询对应id的信息
		wx.navigateTo({
			url: '/pages/detail/detail?id=' + e.markerId
		})
	}

})