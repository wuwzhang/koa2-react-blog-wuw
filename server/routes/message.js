const mongoose = require("mongoose");
const router = require("koa-router")();
const Models = require("../lib/core");
const $Messages = Models.$Messages;
const redisUtils = require("../utils/redisUtils");
const validator = require("validator");
const emailUtils = require("../utils/emailUtils");
const configSendEmail = require("../config/blogConfig").basic
  .NewMessageSendToEmail;

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
      let model = {
        email: email,
        content: content,
        _id: new mongoose.Types.ObjectId()
      };
      var result = await Promise.all([
        $Messages.create(model),
        redisUtils.addNotCheckedMessage({ _id: model._id })
      ]);

      if (configSendEmail) {
        emailUtils.sendEmail(
          "New Message Check",
          "New Message, message from <wuwZhang@126.com>",
          "wuwZhang@126.com",
          "<p>博客有新消息待确认，<a href='http://localhost:3000/message_admin'>点击确认</a></p>"
        );
      } else {
      }
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

router.get("/api/getNotCheckedMessages", async ctx => {
  let code = "1",
    message = "获取消息成功";

  try {
    // var result = await $Messages.getMessagesByNotChecked();
    var result = await redisUtils.getNotCheckedMessage();

    if (result === "-1") {
      let msg = await $Messages.getMessagesByNotChecked();

      if (msg.length > 0) {
        msg.map(async item => {
          return redisUtils.addNotCheckedMessage(item);
        });
      }

      result = msg.length;
    }
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
    await Promise.all([
      $Messages.deleteMessageById(messageId),
      redisUtils.delNotCheckedMessage({ _id: messageId })
    ]);
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
    await Promise.all([
      $Messages.setMessageChecked(messageId),
      redisUtils.delNotCheckedMessage({ _id: messageId })
    ]);
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

module.exports = router;
