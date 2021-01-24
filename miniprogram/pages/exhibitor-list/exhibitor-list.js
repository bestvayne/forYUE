// pages/exhibitor-list/exhibitor-list.js
const app = getApp();
const db = app.globalData.db
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allExhibitorsInfo:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const _that = this
        db.collection('iceland_exhibitors').get().then(res => {
            res.data.forEach(exhibitors => {
                exhibitors.iceland_exhibitors_des = exhibitors.iceland_exhibitors_des.replace(/<[^<>]+>/g,'')
            })
			_that.setData({
				allExhibitorsInfo: res.data,
			})
		})
    },

    goToExhibitors: function (e) {
        const _that = this
        const clickExhibitorsId = e.currentTarget.dataset
        wx.navigateTo({
            url: '/pages/exhibitor/exhibitor',
            success: function (res) {
                res.eventChannel.emit('sendData', {
                    exhibitorsId: clickExhibitorsId
                })
            }
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