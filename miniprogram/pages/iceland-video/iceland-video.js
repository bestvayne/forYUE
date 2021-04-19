// pages/iceland-video/iceland-video.js
const app = getApp();
const db = app.globalData.db

Page({

    data: {
        userInfo: "",
        isLogin: false,
        logged: false,
        windowHeight: '',
        userOpenId: '',
        chatMessageList: "",
        // canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
    },

    onLoad: function (options) {
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }


        if (app.globalData.userOpenId) {
            this.setData({
                userOpenId: app.globalData.userOpenId
            })
        }

        let _that = this;
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
            }),
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
                app.globalData.userOpenId = res.result.openid
                this.setData({
                    userOpenId: res.result.openid
                })
            },
            fail: err => {
                console.error('Retrieve user openid failed: ', err)
            }
        })
    },

    // new function that get user nickname and avatarUrl
    getUserProfile(e) {
        const _that = this
        wx.getUserProfile({
            desc: '用于展示您的头像和昵称', 
            success: (res) => {
                this.setData({
                    isLogin: true,
                    logged: true,
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
                _that.onGetOpenid();
                app.globalData.isLogin = _that.data.isLogin;
                _that.onShow()
            }
        })
    },


    onGetUserInfo: function (e) {
        console.log(e)
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
            _that.onShow()
        }
    },

    // get user input message
    getReadyMessage: function (e) {
        console.log(e.detail.value)
        this.setData({
            readyMessage: e.detail.value
        })
    },

    // when user click send button, add this input date to DB
    sendMessage: function () {
        const _that = this
        _that.onGetOpenid()
        db.collection('iceland_chat_room').add({
            data: {
                chat_message: this.data.readyMessage,
                username: this.data.userInfo.nickName,
                useravatar: this.data.userInfo.avatarUrl,
                useropenid: this.data.userOpenId,
                isShow: false
            },
            success: function (res) {
                wx.showToast({
                    title: '请等待审核^-^',
                    icon: "success",
                    duration: 2000
                })
                _that.setData({
                    readyMessage: " "
                })
                _that.onShow()
            }
        })
    },

    // scroll page to bottom
    pageScrollToBottom: function () {
        var that = this;
        var height = wx.getSystemInfoSync().windowHeight;
        wx.createSelectorQuery().select('#page').boundingClientRect(function (rect) {
            if (rect) {
                that.setData({
                    windowHeight: height,
                    scrollTop: rect.height
                })
            }
        }).exec()
    },

    onShow: function () {
        const _that = this
        db.collection('iceland_chat_room').where({
            isShow: true
        }).watch({
            onChange: function (snapshot) {
                // get change message and bind this page
                _that.setData({
                    chatMessageList: snapshot.docs
                })
                // scroll to page bottom
                _that.pageScrollToBottom()
            },
            onError: function (err) {
                console.error('the watch closed because of error', err)
            }
        })
    },

})