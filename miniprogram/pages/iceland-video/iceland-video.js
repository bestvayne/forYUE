// pages/iceland-video/iceland-video.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: '/images/user-unlogin.png',
        userInfo: {},
        isLogin: false,
        logged: false,
        windowHeight: '',
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        var _that = this;


        // Get user auth status
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            _that.setData({
                                avatarUrl: res.userInfo.avatarUrl,
                                userInfo: res.userInfo
                            })
                        }
                    })
                }
            }
        })

        wx.getSystemInfo({
            success: (result) => {
                this.setData({
                    windowHeight: result.windowHeight
                })
            },
        })

    },
    onGetOpenid: function () {
        wx.cloud.callFunction({
            name: 'login',
            success: res => {
                app.globalData.openId = res.result.openid
            },
            fail: err => {
                console.error('Retrieve user openid failed: ', err)
            }
        })
    },

    onGetUserInfo: function (e) {
        var _that = this;

        if (!_that.data.logged && e.detail.userInfo) {
            _that.setData({
                isLogin: true,
                logged: true,
                avatarUrl: e.detail.userInfo.avatarUrl,
                userInfo: e.detail.userInfo
            })

            _that.onGetOpenid();
            app.globalData.isLogin = _that.data.isLogin;
        }
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