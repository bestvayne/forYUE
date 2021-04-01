const cloud = require('wx-server-sdk')
cloud.init()

var nodemailer = require('nodemailer')

const ical = require('ical-generator');
const cal = ical();
cal.events([
  {
      start: new Date(),
      end: new Date(new Date().getTime() + 3600000),
      summary: 'Example Event',
      description: 'It works ;)',
      url: 'http://sebbo.net/'
  }
]);

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
exports.main = async (event, context) => {
  console.info(event)
  // 创建一个邮件对象
  var mail = {
    // 发件人
    from: 'vanceyax@163.com',
    // 主题
    subject: event.emailSubject,
    // 收件人
    to: "330359531@qq.com",
    // 邮件内容，text或者html格式
    text: "123", //可以是链接，也可以是验证码
    icalEvent: {
      // start: new Date(),
      // end: new Date(new Date().getTime() + 3600000),
      summary: 'Example Event',
      description: 'It works ;)',
      url: 'http://sebbo.net/'
    },
  };

  let res = await transporter.sendMail(mail);
  return res;
}