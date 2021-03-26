// pages/form/form.js
const app = getApp();
const db = app.globalData.db
Page({

    /**
     * 页面的初始数据
     */
    data: {
        visitorType: ["请选择贵司所属的参会类型", "采购商", "服务商", "媒体", "业内人员", "其他"],
        visitorTypeIndex: 0,
        visitorTypeArray: [{
                id: 0,
                name: '请选择贵司所属的参会类型'
            },
            {
                id: 1,
                name: '采购商'
            },
            {
                id: 2,
                name: '服务商'
            },
            {
                id: 3,
                name: '媒体'
            },
            {
                id: 4,
                name: '业内人员'
            },
            {
                id: 5,
                name: '其他'
            }
        ],

        visitorGoal: ["请选择贵司参会目的", "找寻冰岛旅游合作伙伴", "了解冰岛旅游最新动态", "其他"],
        visitorGoalIndex: 0,
        visitorGoalArray: [{
                id: 0,
                name: '请选择贵司参会目的'
            },
            {
                id: 1,
                name: '找寻冰岛旅游合作伙伴'
            },
            {
                id: 2,
                name: '了解冰岛旅游最新动态'
            },
            {
                id: 3,
                name: ' 其他'
            }
        ],
    },

    inputVisitorName: function (e) {
        this.setData({
            visitorName: e.detail.value
        })
    },

    inputVisitorJob: function (e) {
        this.setData({
            visitorJob: e.detail.value
        })
    },

    inputVisitorCompany: function (e) {
        this.setData({
            visitorCompany: e.detail.value
        })
    },

    inputVisitorPhone: function (e) {
        this.setData({
            visitorPhone: e.detail.value
        })
    },

    inputVisitorWechat: function (e) {
        this.setData({
            visitorWechat: e.detail.value
        })
    },

    inputVisitorEmail: function (e) {
        this.setData({
            visitorEmail: e.detail.value
        })
    },

    pickerVisitorType: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            visitorTypeIndex: e.detail.value,
            visitorTypeSelected: this.data.visitorTypeArray[e.detail.value].name
        })
    },

    pickerVisitorGoal: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            visitorGoalIndex: e.detail.value,
            visitorGoalSelected: this.data.visitorGoalArray[e.detail.value].name
        })

    },

    task1:function (){
        wx.showToast({
            title: '提交成功',
            image: '../../images/icon-happy.png',
            duration: 2000
        })
    },
    // task2:function (){
    //     wx.navigateTo({
    //         url: "/pages/landing/landing",
    //     })
    // },

    formSubmit: function () {
        const _that = this
        db.collection('iceland_visitor').add({
            data: {
                visitorName: _that.data.visitorName,
                visitorJob: _that.data.visitorJob,
                visitorCompany: _that.data.visitorCompany,
                visitorPhone: _that.data.visitorPhone,
                visitorWechat: _that.data.visitorWechat,
                visitorEmail: _that.data.visitorEmail,
                visitorType: _that.data.visitorTypeSelected,
                visitorGoal: _that.data.visitorGoalSelected,
            },
            success: function (res) {
                if (res._id) {
                    async function allTasks(){
                        await _that.task1(); 
                        // await _that.task2();                   
                    }
                    allTasks();
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},

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