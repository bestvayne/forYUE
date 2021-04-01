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
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    sendMailToExhibitor: function () {
        // wx.cloud.callFunction({
        //     name:"sendEmail",
        //     data: {
        //         "emailSubject": 'inbit 邀请你参加视频会议',
        //         "emailAccepted": '330359531@qq.com',
        //         "emailContent": 'Hello,我们对您的旅行产品很感兴趣，可以聊聊吗？'
        //     },
        //     success(res){
        //         console.info(res)
        //     },
        //     fail(res){
        //         console.info(res)
        //     }
        // })
        wx.request({
            // url: 'https://api.sendcloud.net/apiv2/mail/sendcalendar',
            url:'https://api.sendcloud.net/apiv2/apiuser/list',
            method:"post",
            data: {
                apiUser:'VanceYao_test_vm8y7O',
                apiKey:'TElazW11U66xIKUm',
                // from:"",
                // to:'330359531@qq.com',
                // subject:"test",
                // startTime:'2021-04-02 13:00:00',
                // endTime:'2021-04-02 14:00:00',
                // title:"旅游产品商务会谈",
                // organizerName:'inbit',
                // organizerEmail:"yaoxi@inbit.cn",
                // location:'online',
                // participatorNames:"Vance Yao"
            },
            header: {

            },
            success: function (res) {
                console.info(res)
            },
            fail:function(err){
                console.log(err)
            }
        })
    },

    onLoad: function (options) {
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
            _that.onShow({})
        }
    },

    // 获取用户输入但并未发送的消息
    getReadyMessage: function (e) {
        console.log(e.detail.value)
        this.setData({
            readyMessage: e.detail.value
        })
    },

    // 点击发送按钮时，向数据库写入信息
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
                    title: '发送成功',
                    // image: '../../images/icon-happy.png',
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


    onShow: function () {
        const _that = this
        db.collection('iceland_chat_room').get().then(res => {
            this.setData({
                chatMessageList: res.data
            })
        })
    },

})