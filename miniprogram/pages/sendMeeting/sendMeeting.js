// const { threadId } = require("worker_threads");

// pages/sendMeeting/sendMeeting.js
const app = getApp();
const db = app.globalData.db

Page({

    /**
     * 页面的初始数据
     */
    data: {
        exhibitors:[
            '请选择邀约的参展商',
            "Grayline Iceland",
            "Terra Nova",
            "Reykjavik Excursions",
            "Nonni Travel",
            "Iceland Europe Travel",
            "Elding",
        ],
        exhibitorsIndex:0,
        exhibitorsList:[
            {
                id:0,
                name:'请选择邀约的参展商'
            },
            {
                id:1,
                name: "Grayline Iceland",
                email: "iceland@grayline.is"
            },
            {
                id:2,
                name:'Terra Nova',
                email:"anton@terranova.is"
            },
            {
                id:3,
                name:'Reykjavik Excursions',
                email:"sales@re.is"
            },
            {
                id:4,
                name:'Nonni Travel',
                email:"double@nonnitravel.is"
            },
            {
                id:5,
                name:'Iceland Europe Travel',
                email:"xiaohang@icelandeuropetravel.com"
            },
            {
                id:6,
                name:'Elding',
                email:"saga@elding.is"
            }
        ],

        dateTemplete:[
            '请选择预约日期',
            "2021-04-20",
            "2021-04-21",
            "2021-04-22",
        ],

        date:[
            '请选择预约日期',
            "2021-04-20",
            "2021-04-21",
            "2021-04-22",
        ],
        dateIndex:0,
        dateList:[
            {
                id:0,
                name:'请选择预约日期'
            },
            {
                id:1,
                name:'2021-04-20'
            },
            {
                id:2,
                name:'2021-04-21'
            },
            {
                id:3,
                name:'2021-04-22'
            }
        ],

        time:[
            '请选择预约时段',
            "13:00~14:00",
            "15:00~16:00",
            "17:00~18:00",
        ],
        timeTemplete:[
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

    pickerExhibitors: function(e){
        /*
        |--------------------------------------------------------------------------
        |   @meeting_sponsor_openid	            DB query value        
        |   @meeting_name                       DB query value
        |   @res.data                           judge condition
        |--------------------------------------------------------------------------
        |	
        |   1.get current user open Id
        |   2.get user selected exhibitors
        |   3.according to 1 and 2, query DB => whether user has booked this exhibitors
        | 
        */ 
        db.collection("book_meeting").where({
            meeting_sponsor_openid: this.data.userOpenId,
            meeting_name: this.data.exhibitorsList[e.detail.value].name,
        }).get().then(res=>{
            this.setData({
                meeting_name: this.data.exhibitorsList[e.detail.value].name,
            })
            if(res.data.length > 0){
                wx.showModal({
                    title: '友情提示',
                    content: '您已经预约过 '+ this.data.exhibitorsList[e.detail.value].name,
                    showCancel:false,
                    success (res) {
                        if (res.confirm) {
                            console.log("user click confirm button")
                        } 
                    }
                })
            }else{
                this.setData({
                    exhibitorsIndex: e.detail.value,
                    meeting_name: this.data.exhibitorsList[e.detail.value].name,
                    meeting_email: this.data.exhibitorsList[e.detail.value].email
                })
            }
        })
    },

    pickeDate: function(e){
        db.collection("book_meeting").where({

            /*
            |--------------------------------------------------------------------------
            |   @res	                            DB function callback value
            |   @this.data.timeTemplete             page global variable
            |   @currentExhibitorsMeeingTime        local variable
            |--------------------------------------------------------------------------
            |	get this exhibitors has meeting_date
            | 
            */ 
            meeting_name: this.data.meeting_name,
            meeting_date: this.data.dateList[e.detail.value].name
        }).get().then(res=>{
            console.log(res)

            /*
            |--------------------------------------------------------------------------
            |   @getUsableData()	                function
            |   @this.data.timeTemplete             page global variable
            |   @currentExhibitorsMeeingTime        local variable
            |--------------------------------------------------------------------------
            |	
            |   1.Get current exhibitors and selected date has been reserved meeting time
            |   2.Calculate the meeting time that the current exhibitors is not booked
            |   3.set page data => timeList by this.time
            |   !!! this setData function, I use this.data.dateTemplete data,
            |   because use this.data.time will cause data update error
            | 
            */ 
            let currentExhibitorsMeeingTime = res.data.map(x=>{return x.meeting_time})

            this.setData({
                time: this.getUsableData(this.data.timeTemplete,currentExhibitorsMeeingTime)
            })

            for(let i=0; i<this.data.time.length; i++){
                this.data.timeList[i]={}
                this.data.timeList[i].id = i
                this.data.timeList[i].name = this.data.time[i]
            }
        })
        if(e.detail.value != 0){
            this.setData({
                dateIndex: e.detail.value,
                meeting_date: this.data.dateList[e.detail.value].name
            })
        }else{
            this.setData({
                dateIndex: 0,
                meeting_date: undefined
            })
        }
    },

    pickeTime:function(e){
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        if(e.detail.value != 0){
            this.setData({
                timeIndex: e.detail.value,
                meeting_time: this.data.timeList[e.detail.value].name
            })
        }else{
            this.setData({
                timeIndex: 0,
                meeting_time: undefined
            })
        }
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

    verifyFormDate: async function(e){
        const verifyResult = await e.every(x => typeof(x)==="string")
        // if (verifyResult){
        //     resolve([this.data.meeting_name,this.data.meeting_date])
        // }
        return verifyResult
    },

    getMeetingExhibitorsThumbnail:function(){
        return new Promise(resolve=>{
            const _that = this
            db.collection('iceland_exhibitors').where({
                iceland_exhibitors_name:this.data.meeting_name
            }).get().then(res => {
                _that.setData({
                    meeting_thumbnail:res.data[0].iceland_exhibitors_thumbnail
                })
                resolve(res.data[0].iceland_exhibitors_id)
            })
        })
    },

    createBookingMeetingToDB:function(){
        return new Promise(resolve=>{
            // create book meeting and add to DB
            db.collection('book_meeting').add({
                data:{
                    meeting_thumbnail:this.data.meeting_thumbnail,
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
                    meeting_sponsor_openid:app.globalData.userOpenId,
                    meeting_confirm_url: "http://172.104.97.44/#/?id=",
                    meeting_status:"wait"
                }
            }).then(res=>{
                resolve(res._id)
            })
        })
    },

    getMeetingInfo:function(dbName,dataId){
        // get meeting info by id
        // set some mail message by this meeting info and send mail
        db.collection(dbName).doc( dataId ).get({}).then(res=>{
            wx.cloud.callFunction({
                name:"sendEmail",
                data: {
                    emailSubject: res.data.meeting_theme,
                    emailAccepted: 'lindsay.li@plus8h.com',
                    emailContent: res.data.meeting_confirm_url+res.data._id
                },
                success(res){
                    wx.hideLoading()
                    wx.showToast({
                        title: '提交成功',
                        image: '../../images/icon-happy.png',
                        duration: 2000,
                        success:function(){
                            wx.navigateTo({
                                url: "/pages/my/my",
                            })
                        }
                    })

                },
                fail(res){
                    // if this email send fail,delete this data form DB
                    console.info(res._id)
                    db.collection('book_meeting').doc(res._id).remove({
                        success:function(i){
                            console.log(i)
                        }
                    })
                }
            })
        })
    },

    sendMailToExhibitor: async function () {
        let verifyForm = [
            this.data.meeting_name,
            this.data.meeting_email,
            this.data.meeting_date,
            this.data.meeting_time,
            this.data.meeting_theme,
            this.data.meeting_content,
            this.data.send_meeting_name,
            this.data.send_meeting_company,
            this.data.send_meeting_phone,
            this.data.send_meeting_email,
        ]
        console.log(verifyForm)
        // if(this.verifyFormDate(verifyForm)){
        //     wx.showLoading({
        //         title: '发送中',
        //     })
        //     const _that = this
        //     await this.getMeetingExhibitorsThumbnail();
        //     await this.createBookingMeetingToDB().then(res=>{
        //         this.getMeetingInfo('book_meeting',res)
        //     });
        // }else{
        //     wx.showToast({
        //         title: '请完整填写表单',
        //         image: '../../images/icon-error.png',
        //         duration: 2000,
        //     })
        // }
        this.verifyFormDate(verifyForm).then(res=>console.log("res 是: "+res))
    },

    getUsableData:function (arr1, arr2) {
        return arr1.concat(arr2).filter(function(v, i, arr) {
            return arr.indexOf(v) === arr.lastIndexOf(v);
        });
    },

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

    onShow:function(){
        /*
        |--------------------------------------------------------------------------
        |   @meeting_sponsor_openid	            DB query value        
        |   @meeting_name                       DB query value
        |   @res.data                           judge condition
        |--------------------------------------------------------------------------
        |	
        |   1.get user openid by wx.cloud.callFunction()
        |   2.get user selected exhibitors（this exhibitors get by onLoad function ）
        |   3.according to 1 and 2, query DB => whether user has booked this exhibitors
        | 
        */ 
        wx.cloud.callFunction({
            name: 'login',
            success: res => {
                app.globalData.userOpenId = res.result.openid
                this.setData({
                    userOpenId: res.result.openid
                })
                db.collection("book_meeting").where({
                    meeting_sponsor_openid: res.result.openid,
                    meeting_name: this.data.meeting_name,
                }).get().then(res=>{
                    if(res.data.length > 0){
                        wx.showModal({
                            title: '友情提示',
                            content: '您已经预约过 '+ this.data.meeting_name,
                            showCancel:false,
                            success (res) {
                                if (res.confirm) {
                                    wx.navigateBack()
                                } 
                            }
                        })
                    }
                })
            },
            fail: err => {
                console.error('Retrieve user openid failed: ', err)
            },
        })
    }
})