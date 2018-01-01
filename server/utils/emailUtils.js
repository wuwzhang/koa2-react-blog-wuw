const nodemailer = require("nodemailer");

function sendEmail(subject, from, email, value) {
  if (subject) {
    subject = "Message Check";
  }
  var stmpTransport = nodemailer.createTransport({
    host: "smtp.126.com",
    secureConnection: true,
    port: 25,
    auth: {
      user: "wuwZhang@126.com", //你的邮箱帐号,
      pass: "sqwangyi22" //你的邮箱授权码
    }
  });

  var mailOptions = {
    from: from, //标题
    to: email, //收件人
    subject: subject, // 标题
    html: value // html 内容
  };

  stmpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log("error", error);
    } else {
      console.log("Message sent:" + response.message);
    }
    stmpTransport.close();
  });
}

module.exports = {
  sendEmail
};
