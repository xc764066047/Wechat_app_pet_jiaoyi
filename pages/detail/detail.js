
//获取应用实例，就能用app.xxx获取到app.js里的数据
const app = getApp();

// 引入header组件的js
const common = require('../.././component/header/header.js');


Page({

    /**
     * 页面的初始数据
     */
	data: {
		address: "",
		type: "",
		message: "",
		contact: ""	,
		headerContent: common.data.headerContent	// header组件里的数据
	},

	// header组件里的方法
	handleHeaderTap () {
		common.handleHeaderTap();
	},

	// 在页面加载的之后执行此生命周期。options对象里有个键值对为点击的图标的id和id的值，和api数据库里对应的id一致
	onLoad: function (options) {
		this.getDetailInfo(options.id);
	},

	// 发送请求
	getDetailInfo(id) {
		// 用get方法代入data精确查找对应id的数据
		wx.request({
			url: 'http://localhost:3000/list/',
			data: {
				distinct: app.globalData.distinct,	// 只获取带有此标识符的数据
				id: id			// 该数据还必须带有对应的id
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 后端要求这样做，填写这个就会将数字也带上双引号
			},
			success: this.getDetailSucc.bind(this)
		})
	},

	getDetailSucc(res) {
		const result = res.data[0];

		this.setData({
			address: result.address,
			message: result.message,
			contact: result.contact
		})

		if(result.type == "sell") {
			this.setData({
				type: "sell"
			})
		} 
	},


    /**
     * 用户点击右上角分享
     */
	onShareAppMessage: function () {

	}
})