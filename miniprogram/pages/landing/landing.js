// pages/landing/landing.js
const app = getApp();
const db = app.globalData.db
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputValue:'',
        invitationCode: ['0101','0202']
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

            let verifyInvitationCode = this.data.invitationCode.indexOf(String(this.data.inputValue))

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

    goToForm:function(){
        wx.navigateTo({
            url:"/pages/form/form",
        })
    },

    // getMeetingExhibitorsThumbnail:function(){
    //     return new Promise(resolve=>{
    //         const _that = this
    //         // get meeting exhibitors's thumbnail
    //         db.collection('iceland_exhibitors').where({
    //             iceland_exhibitors_name:this.data.meeting_name
    //         }).get().then(res => {
    //             console.info(1)
    //             _that.setData({
    //                 meeting_thumbnail:res.data[0].iceland_exhibitors_thumbnail
    //             })
    //             resolve(res.data[0].iceland_exhibitors_id)
    //         })
    //     })
    // },

    // createBookingMeetingToDB:function(){
    //     return new Promise(resolve=>{
    //         // create book meeting and add to DB
    //         db.collection('book_meeting').add({
    //             data:{
    //                 meeting_thumbnail:this.data.meeting_thumbnail,
    //                 meeting_name:this.data.meeting_name,
    //                 meeting_email:this.data.meeting_email,
    //                 meeting_date:this.data.meeting_date,
    //                 meeting_time:this.data.meeting_time,
    //                 meeting_theme:this.data.meeting_theme,
    //                 meeting_content:this.data.meeting_content,
    //                 meeting_sponsor_name:this.data.send_meeting_name,
    //                 meeting_sponsor_company:this.data.send_meeting_company,
    //                 meeting_sponsor_phone:this.data.send_meeting_phone,
    //                 meeting_sponsor_email:this.data.send_meeting_email,
    //                 meeting_sponsor_openid:app.globalData.userOpenId,
    //                 meeting_confirm_url: "http://172.104.97.44/#/?id=",
    //                 meeting_status:"wait"
    //             }
    //         }).then(res=>{
    //             console.log(2)
    //             resolve(res._id)
    //         })
    //     })
    // },

    // getMeetingInfo:function(dbName,dataId){
    //     db.collection(dbName).doc( dataId ).get({}).then(res=>{
    //         console.log(3)
    //         console.log(res)

    //         wx.cloud.callFunction({
    //             name:"sendEmail",
    //             data: {
    //                 emailSubject: res.data.meeting_theme,
    //                 emailAccepted: 'vanceyax@163.com',
    //                 emailContent: res.data.meeting_confirm_url+res.data._id
    //             },
    //             success(res){
    //                 wx.hideLoading()
    //                 wx.showToast({
    //                     title: '提交成功',
    //                     image: '../../images/icon-happy.png',
    //                     duration: 2000,
    //                     success:function(){
    //                         wx.navigateTo({
    //                             url: "/pages/my/my",
    //                         })
    //                     }
    //                 })

    //             },
    //             fail(res){
    //                 // if this email send fail,delete this data form DB
    //                 console.info(res._id)
    //                 console.info(currentMeetingId)
    //                 db.collection('book_meeting').doc(currentMeetingId).remove({
    //                     success:function(i){
    //                         console.log(i)
    //                     }
    //                 })
    //             }
    //         })
    //     })
    // },

    //  mainPromise:async function(){
    //     await this.getMeetingExhibitorsThumbnail();
    //     await this.createBookingMeetingToDB().then(res=>{
    //         this.getMeetingInfo('book_meeting',res)
    //     });
    // },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
})