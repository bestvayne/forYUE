// pages/exhibitor/exhibitor.js
const app = getApp();
const db = app.globalData.db
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		exhibitorsId: '',
		exhibitorsInfo:'',

		text_isShow: false,
	},

	// 自定义事件

	// 点击 展示/收起 介绍文字
	textIsShow:function(){
		console.log(this.data.text_isShow)
		this.setData({
			text_isShow: !this.data.text_isShow,
		})
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var _that = this
    	const eventChannel = _that.getOpenerEventChannel()
		eventChannel.on('sendData', function (res) {
			_that.setData({
				exhibitorsId: res.exhibitorsId
			})
		})
		console.log(_that.data.exhibitorsId.id)

	

		db.collection('iceland_exhibitors').where({
			iceland_exhibitors_id: _that.data.exhibitorsId.id
		}).get().then(res => {
			// res.data 包含该记录的数据

			// REG replace <p> tag
			res.data[0].iceland_exhibitors_des = res.data[0].iceland_exhibitors_des.replace(/<[^<>]+>/g, '<p class="exhibitor-des-text">')

			res.data[0].iceland_exhibitors_des_2 = res.data[0].iceland_exhibitors_des_2.replace(/<p.*?>/g, '<p class="exhibitor-des-text">')

			_that.setData({
				exhibitorsInfo: res.data[0],
			})
		})

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})