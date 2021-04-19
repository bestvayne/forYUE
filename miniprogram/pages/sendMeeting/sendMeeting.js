// pages/sendMeeting/sendMeeting.js
const app = getApp();
const db = app.globalData.db
Page({

    /**
     * 页面的初始数据
     */
    data: {
        toMail: '',
        toName: '',
    },
    sendMailToExhibitor: function () {
        const _that = this

        // create book meeting and add to DB
        db.collection('book_meeting').add({
            data:{
                meeting_name:this.data.toName,
                meeting_email:this.data.toMail,
                meeting_time:new Date(),
                meeting_theme:"会议邀请",
                meeting_confirm_url: "http://172.104.97.44/#/?id=",
                meeting_content:"产品合作",
                send_email:"测试邮箱，reply to this mailaddress:330359531@qq.com"
            }
        }).then(res => {
            // get this meeting info by _id
            // add these info that send mail to exhibitor emaill
            db.collection('book_meeting').doc( res._id ).get({}).then(res=>{
                wx.cloud.callFunction({
                    name:"sendEmail",
                    data: {
                        emailSubject: res.data.meeting_theme,
                        emailAccepted: 'vanceyao0224@163.com',
                        emailContent: res.data.meeting_content+res.data.meeting_confirm_url+res.data._id
                    },
                    success(res){
                        console.info(res)
                    },
                    fail(res){
                        console.info(res)
                    }
                })
            })
        })


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const _that = this
        const eventChannel = _that.getOpenerEventChannel()
        eventChannel.on('sendData', function (res) {
            _that.setData({
                toMail: res.email,
                toName: res.exhibitorName
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