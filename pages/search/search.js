
//获取应用实例，就能用app.xxx获取到app.js里的数据
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
		list: []
    },
	// 和页面初始数据无关系的数据放在staticData里
	staticData: {
		inputValue: ""
	},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //   页面一加载就发送所有数据的请求，用于初始化页面展示所有数据
        this.getSearchResult("");
    },
    // 初始化和搜索的时候请求方法
    getSearchResult() {
        // 用get方法代入data精确查找对应id的数据
        wx.request({
			url: 'http://localhost:3000/list/?q=' + this.staticData.inputValue,
            data: {
				distinct: app.globalData.distinct, // 只获取带有此标识符的数据
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 后端要求这样做，填写这个就会将数字也带上双引号
            },
            success: this.getSearchResultSucc.bind(this)
        })
    },


    // 请求成功后回调函数
    getSearchResultSucc(res) {
		const result = res.data;
		this.setData({
			list: [...result]
		})
    },
	// 监听input文本输入框的方法
	handleInputChange (e) {
		this.staticData.inputValue = e.detail.value;
	},

	// 点击搜索按钮的方法
	handleSearch () {
		this.getSearchResult()
	},
	// 点击跳转详情
	handleItemTap (e) {
		console.log(e.currentTarget.id);
		// 跳转到对应项的详情页，并传入对应的id的值，这个id会被navigateTo自带的options属性传递给详情页，详情页再提取到options.id进行发送请求查询对应id的信息
		wx.navigateTo({
			url: '/pages/detail/detail?id=' + e.currentTarget.id
		})
	}
})