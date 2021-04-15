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
        db.collection('iceland_exhibitors').limit(10).get().then(res => {
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
        const clickExhibitorsId = e.currentTarget.dataset._id
        console.log(clickExhibitorsId)
        wx.navigateTo({
            url: '/pages/exhibitor/exhibitor',
            success: function (res) {
                res.eventChannel.emit('sendData', {
                    exhibitorsId: clickExhibitorsId
                })
            }
        })
    },
})