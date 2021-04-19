const cloud = require('wx-server-sdk')
// cloud.init()
cloud.init({
  env: 'promote-iceland-5g1bnckvaac9cfc3',
})

var nodemailer = require('nodemailer')

// const ical = require('ical-generator');
// const cal = ical();
// cal.events([
//   {
//       start: new Date(),
//       end: new Date(new Date().getTime() + 3600000),
//       summary: 'Example Event',
//       description: 'It works ;)',
//       url: 'http://sebbo.net/'
//   }
// ]);

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
  console.info("这个云函数的event:"+event)
  // 创建一个邮件对象
  var mail = {
    // 发件人
    from: 'vanceyax@163.com',
    // 主题
    subject: event.emailSubject,
    // 收件人
    to: event.emailAccepted,
    // 邮件内容，text或者html格式
    text: event.emailContent, 
  };

  let res = await transporter.sendMail(mail);
  return res;
}