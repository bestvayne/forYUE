// pages/exhibitor/exhibitor.js
const app = getApp();
const db = app.globalData.db
Page({

	data: {
		exhibitorsId: '',
		exhibitorsInfo: '',
		clipboardContent: "",
		text_isShow: false,
	},

	textIsShow: function () {
		this.setData({
			text_isShow: !this.data.text_isShow,
		})
	},


	copyText: function (e) {
		wx.setClipboardData({
			data: e.currentTarget.dataset.text,
			success: function (res) {
				wx.getClipboardData({
					success: function (res) {
						wx.showToast({
							title: '复制成功'
						})
					}
				})
			}
		})
	},

	callPhone: function () {
		let that = this
		wx.makePhoneCall({
			//需要拨打的电话号码
			phoneNumber: this.data.exhibitorsInfo.iceland_exhibitors_phone
		})
	},

	/*
	|--------------------------------------------------------------------------
	|   @fileID	                            file ID cloud://XXX url
	|   @tempFilePath            			temporary file path
	|   @wx.openDocument        			open this PDF file function
	|--------------------------------------------------------------------------
	|	get this exhibitors has meeting_date
	| 
	*/ 
	downloadFile: function (e) {
		wx.showLoading({
			title: '正在打开文件',
		})
		wx.cloud.downloadFile({
			fileID: e.currentTarget.dataset.filecloud, 
			success: res => {
				console.log(res)
				wx.openDocument({
					filePath: res.tempFilePath,
					success: function (res) {
						wx.hideLoading()
						console.log('打开文档成功')
					  	console.log('打开文档成功')
					}
				})
			},
			fail:function(e){
				wx.hideLoading()
				wx.showToast({
					title: '文件打开失败',
					image: '../../images/icon-error.png',
					duration: 2000,
			  	})
			}
		})
	},

	goToSendMeeting: function (e) {
		const _that = this
		const email = _that.data.exhibitorsInfo.iceland_exhibitors_email
		const exhibitorName = _that.data.exhibitorsInfo.iceland_exhibitors_name
		wx.navigateTo({
			url: '/pages/sendMeeting/sendMeeting',
			success: function (res) {
				res.eventChannel.emit('sendData', {
					email: email,
					exhibitorName: exhibitorName
				})
			}
		})
    },


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var _that = this
		const eventChannel = _that.getOpenerEventChannel()
		eventChannel.on('sendData', function (res) {
			// get exhibitor-list page send date _id
			// query this date by res.exhibitors
			db.collection('iceland_exhibitors').where({
				_id: res.exhibitorsId
			}).get().then(res => {
				// res.data 包含该记录的数据
	
				// REG replace <p> tag
				res.data[0].iceland_exhibitors_des = res.data[0].iceland_exhibitors_des.replace(/<[^<>]+>/g, '<p class="exhibitor-des-text">')
	
				res.data[0].iceland_exhibitors_des_2 = res.data[0].iceland_exhibitors_des_2.replace(/<p.*?>/g, '<p class="exhibitor-des-text">')
	
				_that.setData({
					exhibitorsInfo: res.data[0],
				})
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