const cloud = require('wx-server-sdk')
// cloud.init()
cloud.init({
  env: 'promote-iceland-5g1bnckvaac9cfc3',
})

var nodemailer = require('nodemailer')

// 创建一个SMTP客户端配置
var config = {
  host: 'smtp.163.com', //网易163邮箱 smtp.163.com
  port: 25, //网易邮箱端口 25
  auth: {
    user: 'promote_iceland@163.com', //邮箱账号
    // pass: 'FITSWLRNZRKEMADN' //vanceyao@163.com
    pass:'PIUNTAVOFTUFQJIB' // promote_iceland@163.com
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
    from: 'promote_iceland@163.com',
    // 主题
    subject: "Promote Iceland " + event.emailSubject,
    // 收件人
    to: event.emailAccepted,
    // 邮件内容，text或者html格式
    html: "<p>You have a meeting invitation from Promote Iceland, please click the link to view the details：</p>"+"<a href="+event.emailContent+">Meeting link</a>", 
  };

  let res = await transporter.sendMail(mail);
  return res;
}