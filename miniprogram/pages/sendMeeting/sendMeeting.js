// const { threadId } = require("worker_threads");

// pages/sendMeeting/sendMeeting.js
const app = getApp();
const db = app.globalData.db
Page({

    /**
     * 页面的初始数据
     */
    data: {
        meetingToMail: '',
        meetingToName: '',
        exhibitors:[
            '请选择邀约的参展商',
            "Gray Line",
            "Terry Nova",
            "Reykjavik Excursions",
        ],
        exhibitorsIndex:0,
        exhibitorsList:[
            {
                id:0,
                name:'请选择邀约的参展商'
            },
            {
                id:1,
                name:'Gray Line',
                email:"iceland@grayline.is"
            },
            {
                id:2,
                name:'Terry Nova',
                email:"anton@terranova.is"
            },
            {
                id:3,
                name:'Reykjavik Excursions',
                email:"sales@re.is"
            }
        ],

        date:[
            '请选择预约日期',
            "4月20日",
            "4月21日",
            "4月22日",
        ],
        dateIndex:0,
        dateList:[
            {
                id:0,
                name:'请选择预约日期'
            },
            {
                id:1,
                name:'4月20日'
            },
            {
                id:2,
                name:'4月21日'
            },
            {
                id:3,
                name:'4月22日'
            }
        ],

        time:[
            '请选择预约时段',
            "13:00~14:00",
            "15:00~16:00",
            "17:00~18:00",
        ],
        timeIndex:0,
        timeList:[
            {
                id:0,
                name:'请选择预约时段'
            },
            {
                id:1,
                name:'13:00~14:00'
            },
            {
                id:2,
                name:'15:00~16:00'
            },
            {
                id:3,
                name:'17:00~18:00'
            }
        ],
    },

    pickerExhibitors:function(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            exhibitorsIndex: e.detail.value,
            meeting_name: this.data.exhibitorsList[e.detail.value].name,
            meeting_email: this.data.exhibitorsList[e.detail.value].email
        })
    },

    pickeDate:function(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            dateIndex: e.detail.value,
            meeting_date: this.data.dateList[e.detail.value].name
        })
    },

    pickeTime:function(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            timeIndex: e.detail.value,
            meeting_time: this.data.timeList[e.detail.value].name
        })
    },

    inputMeetingTheme:function(e){
        this.setData({
            meeting_theme: e.detail.value
        })
    },

    inputMeetingContent:function(e){
        this.setData({
            meeting_content: e.detail.value
        })
    },

    sendMeetingName:function(e){
        this.setData({
            send_meeting_name: e.detail.value
        })
    },

    sendMeetingCompany:function(e){
        this.setData({
            send_meeting_company: e.detail.value
        })
    },

    sendMeetingPhone:function(e){
        this.setData({
            send_meeting_phone: e.detail.value
        })
    },

    sendMeetingEmail:function(e){
        this.setData({
            send_meeting_email: e.detail.value
        })
    },

    sendMailToExhibitor: function () {
        const _that = this

        // create book meeting and add to DB
        db.collection('book_meeting').add({
            data:{
                meeting_name:this.data.meeting_name,
                meeting_email:this.data.meeting_email,
                meeting_date:this.data.meeting_date,
                meeting_time:this.data.meeting_time,
                meeting_theme:this.data.meeting_theme,
                meeting_content:this.data.meeting_content,
                meeting_sponsor_name:this.data.send_meeting_name,
                meeting_sponsor_company:this.data.send_meeting_company,
                meeting_sponsor_phone:this.data.send_meeting_phone,
                meeting_sponsor_email:this.data.send_meeting_email,
                meeting_confirm_url: "http://172.104.97.44/#/?id=",
                meeting_accept:false
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
                        wx.navigateTo({
                            url: "/pages/landing/landing",
                        })
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
                meeting_name: res.exhibitorName,
                meeting_email: res.email,
            })
        })
    },

})