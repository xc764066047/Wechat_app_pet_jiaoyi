// pages/publush/publish.js


Page({

    /**
     * 页面的初始数据
     */
	data: {
		address: "点击选择，要勾选哦",
		items: [
			{ name: '求购', value: 'buy', checked: 'true'},
			{ name: '转让', value: 'sell' },
		],
		success: false
	},
	// 静态数据，默认为空
	staticData: {
		type: "buy",
		contact: "",
		message: ""
	},

    /*
     * 用户点击右上角分享
     */
	// es5语法，更容易理解
	onShareAppMessage: function () {
		return {
			title: '发布信息',
			path: '/pages/publish/publish'
		}
	},
	// es6语法，更省代码
	handleAddressClick() {
		// 选择位置api，参数是对象
		wx.chooseLocation({
			success: this.handleChooseLocationSucc.bind(this)	// bind(this)可以将前缀方法的作用域绑定到这个里面来
		})
	},

	// 选择位置成功后执行的方法
	handleChooseLocationSucc(res) {
		// 调用选择位置api，确定地点后改变位置信息
		this.setData({
			address: res.address
		})

		// es6新方法，将后面的对象拷贝到前面的对象里面去
		Object.assign(this.staticData, {
			latitude: res.latitude,
			longitude: res.longitude
		})
	},

	// 将表单里的value传进staticData对象里，方便提交给后台
	handleTypeChange(e) {
		this.staticData.type = e.detail.value;
	},
	handleMessageChange(e) {
		this.staticData.message = e.detail.value;
	},
	handleContactChange(e) {
		this.staticData.contact = e.detail.value;
	},

	

	// 发布信息按钮，提交表单
	handleSubmit() {
		// 对地址进行校检
		if(this.data.address === "点击选择，要勾选哦" || !this.data.address) {
			// 弹窗API
			wx.showToast({
				title: '请选择地址',
				duration: 2000,
				image: '../../resources/toast.png'
			})
			return;
		}

		// 对说明进行校检
		if(!this.staticData.message) {
			// 弹窗API
			wx.showToast({
				title: '请填写说明',
				duration: 2000,
				image: '../../resources/toast.png'
			})
			return;
		}

		// 对联系方式进行校检
		if (!this.staticData.contact) {
			// 弹窗API
			wx.showToast({
				title: '请填写联系方式',
				duration: 2000,
				image: '../../resources/toast.png'
			})
			return;
		}

		// 将后面两个对象进行合并，并和空对象组合成新对象保存到对象变量data中
		const data = Object.assign({}, this.staticData, {
			address: this.data.address,
			distinct: "xiangchao_cource"	// 用来做数据区分，这个标识符是唯一的
		})
		
		// 发送请求
		wx.request({
			url: 'http://localhost:3000/list/', //仅为示例，并非真实的接口地址
			data: data,
			method: "POST",		// 默认请求方式是GET，POST请求非真实url的时候会自动跳转到首页
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 后端要求这样做，填写这个就会将数字也带上双引号
			},
			success: this.handleSubmitSucc.bind(this),	// bind(this)可以将前缀方法的作用域绑定到这个里面来
		})
	},

	// 发送ajax请求成功后回调的方法
	handleSubmitSucc(res) {
		this.setData({
			success: true
		})
		// 发布成功弹窗
		wx.showToast({
			title: '发布成功!',
			duration: 2000,
			image: '../../resources/toast.png'
		})
		
	},

	// 回到首页按钮的方法
	handleBackTap() {
		// 调用返回之前页面的路由api
		wx.navigateBack({
			// 默认是返回上一层页面，也就是delta: 1
			delta: 1
		})
	}
})