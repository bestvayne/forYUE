const cloud = require('wx-server-sdk')
cloud.init()
//引入发送邮件的类库
var nodemailer = require('nodemailer')
// 创建一个SMTP客户端配置
var config = {
  host: 'smtp.163.com', //网易163邮箱 smtp.163.com
  port: 25, //网易邮箱端口 25
  auth: {
    user: 'vanceyax@163.com', //邮箱账号
    pass: 'FITSWLRNZRKEMADN' //邮箱的授权码
  }
};
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
// 云函数入口函数
exports.main = async(event, context) => {
  // 创建一个邮件对象
  var mail = {
    // 发件人
    from: 'vanceyax@163.com',
    // 主题
    subject: 'inbit 邀请你参加视频会议',
    // 收件人
    to:['xiaonan@inbit.cn','330359531@qq.com',],
    // 邮件内容，text或者html格式
    text: 'Hello,我们对您的旅行产品很感兴趣，可以聊聊吗？' //可以是链接，也可以是验证码
  };

  let res = await transporter.sendMail(mail);
  return res;
}