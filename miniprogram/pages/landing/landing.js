// pages/landing/landing.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputValue:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    getInputValue(e){
        this.setData({
            inputValue: e.detail.value
        })
        console.log(e)
    },

    goToExhibition:function(){
        if(this.data.inputValue !== ''){
            if(this.data.inputValue == '0101'){
                wx.navigateTo({
                    url:"/pages/home/home",
                })
            }else{
                wx.showToast({
                    title: '邀请码无效',
                    image:'../../images/icon-error.png',
                    duration: 2000
                })               
            }
        }else{
            wx.showToast({
                title: '\n\n请填写邀请码',
                image:'../../images/icon-happy.png',
                duration: 2000
            })     
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