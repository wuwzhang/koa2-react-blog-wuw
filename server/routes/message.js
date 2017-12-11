// const mongoose = require("mongoose");
const router = require("koa-router")();
const Models = require("../lib/core");
const $Messages = Models.$Messages;
const validator = require("validator");
const nodemailer = require("nodemailer");

router.post("/api/post_message", async ctx => {
  let { email, content } = ctx.request.body;

  let code = "1",
    message = "发送成功";

  try {
    if (!email || !validator.isEmail(email)) {
      code = "-1";
      message = "填写正确的邮箱格式";
    } else {
      email = validator.trim(email);
      var result = await $Messages.create({ email, content });

      function sendEmail() {
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
          from: "Messages <wuwZhang@126.com>", //标题
          to: "wuwZhang@126.com", //收件人
          subject: "Message Check", // 标题
          html: "<p>博客有新消息待确认</p>" // html 内容
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

      sendEmail(email);
    }
  } catch (e) {
    code = "-2";
    message = e.message;
  }

  ctx.response.body = {
    code: code,
    message: message,
    result: result
  };
});

router.post("/api/getNotCheckedMessages", async ctx => {
  let code = "1",
    message = "获取消息成功";

  try {
    var result = await $Messages.getMessagesByNotChecked();
  } catch (e) {
    code = "-1";
    message = e.message;
  }

  ctx.response.body = {
    code: code,
    message: message,
    result: result
  };
});

router.post("/api/message_admin/getAll/message", async ctx => {
  let code = "1",
    message = "获取成功";
  const { page = 1, eachPageArticles = 5 } = ctx.request.body;

  try {
    var result = await Promise.all([
      $Messages.getAllMessagesCount(),
      $Messages.getPageMessages(page, eachPageArticles)
    ]);
  } catch (e) {
    code = "-1";
    message = e.message;
  }

  ctx.response.body = {
    code: code,
    message: message,
    messages: result[1],
    count: result[0]
  };
});

router.post("/api/message_delete/:messageId", async ctx => {
  let code = "1",
    message = "ok";
  const { messageId } = ctx.params;

  try {
    await $Messages.deleteMessageById(messageId);
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

router.post("/api/message_checked/:messageId", async ctx => {
  let code = "1",
    message = "ok";
  const { messageId } = ctx.params;

  try {
    $Messages.setMessageChecked(messageId);
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

module.exports = router;
