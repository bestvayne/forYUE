const app = getApp();
const db = app.globalData.db

Page({

    /**
     * 页面的初始数据
     */
    data: {
        meetingList:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getSystemInfo({
            success: (result) => {
                this.setData({
                    windowHeight: result.windowHeight
                })
            },
        })
    },

    // get user openid by wx.cloud.callFunction()
    onGetOpenidAndGetMeetingInfo: function () {
        wx.cloud.callFunction({
            name: 'login',
            success: res => {
                app.globalData.userOpenId = res.result.openid
                this.setData({
                    userOpenId: res.result.openid
                })
                db.collection('book_meeting').where({
                    meeting_sponsor_openid : res.result.openid
                }).get({}).then(res =>{
                    console.info(res.data)
                    // get target openid user' book meeting data
                    this.setData({
                        meetingList:res.data
                    })
                })
            },
            fail: err => {
                console.error('Retrieve user openid failed: ', err)
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
        const _that = this

        if (app.globalData.userOpenId) {
            db.collection('book_meeting').where({
                meeting_sponsor_openid : app.globalData.userOpenId
            }).get({}).then(res =>{
                console.info(res.data)
                // get target openid user' book meeting data
                _that.setData({
                    meetingList:res.data
                })
            })
        }else{
            _that.onGetOpenidAndGetMeetingInfo()
        }
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