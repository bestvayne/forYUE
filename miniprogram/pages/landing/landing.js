// pages/landing/landing.js
const invitationCode = ['0101','0202']

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

            /*
            |--------------------------------------------------------------------------
            |   @invitationCode	            Array
            |   @this.data.inputValue       Object
            |   @verifyInvitationCode       Object
            |--------------------------------------------------------------------------
            |	1.Get the input entered code -> this.data.inputValue
            |   2.When user click the go to exhibitors button,verify this code
            |   3.According to this code true/false,give return
            | 
            */            

            let verifyInvitationCode = invitationCode.indexOf(String(this.data.inputValue))

            if(verifyInvitationCode !== -1){
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
                title: '请填写邀请码',
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