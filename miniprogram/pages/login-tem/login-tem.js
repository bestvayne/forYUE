// pages/login-tem/login-tem.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:"",
    avatarUrl:"",
    userInfo:"",
    companyName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ', res.result)
      }
    })

    const db = wx.cloud.database({
      env: 'jprail-prod-23b737',
    })

    const res = db.collection('iceland_exhibitors').doc('9f2a34705fe2c1100075c0fc14d9f88c').get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      this.setData({
        companyName: res.data.iceland_exhibitor_name
      })
    })


    let _that = this

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              _that.setData({
                userInfo: res.userInfo,
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    let _that = this
    
    if (!_that.data.logged && e.detail.userInfo) {
      _that.setData({
        isLogin: true,
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })

      app.globalData.isLogin = _that.data.isLogin
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
    console.log(this.data.userInfo.nickName)
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