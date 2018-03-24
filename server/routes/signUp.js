const router = require("koa-router")();
const Models = require("../lib/core");
const $User = Models.$User;
const redisUtils = require("../utils/redisUtils");

const emailUtils = require("../utils/emailUtils");
const cryptoUtils = require("../utils/cryptoUtils");
const validator = require("validator");

/**
 * 用户注册
 */
router.post("/api/signUp", async ctx => {
  let code = "1",
    message = "注册成功";

  try {
    var data = JSON.parse(ctx.request.body);
    let {
      account,
      username,
      password,
      avatarValue
    } = data;

    if (!account || !validator.isEmail(account)) {
      code = "-1";
      message = "填写正确的邮箱格式";
    } else {
      password = cryptoUtils.md5(validator.trim(password));
      account = validator.trim(account);
      var activeKey = cryptoUtils.md5(validator.trim(account));

      const user = {
        account: account,
        username: username,
        password: password,
        activeKey: activeKey,
        avatar: avatarValue
      };

      // await $User.create(user);
      await redisUtils.setCreateTmpUser(user);
      delete user.password;
      // ctx.session.user = user;

      emailUtils.sendEmail(
        "邮箱注册",
        "Fred Foo <wuwZhang@126.com>",
        account,
        "<a href='http://zhanglisha.xyz/verifyemail/" +
        activeKey +
        "'>点击进行邮箱验证</a>"
      );
    }
  } catch (e) {
    if (e.message.match("E11000 duplicate key")) {
      code = "-2";
      message = "用户名已占用";
    } else {
      code = "-3";
      message = e.message;
    }
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

/**
 * 确认账户是否存在
 */
router.post("/api/checkAccount", async ctx => {
  const {
    account
  } = ctx.request.body,
    user = await $User.getUserByAccount(account);

  let code = "1",
    message = "ok";

  if (user) {
    (code = "-1"), (message = "用户名已存在");
  } else {
    code,
    message;
  }
  ctx.response.body = {
    code: code,
    message: message
  };
});

/**
 * 忘记密码
 */
router.post("/api/forgetPsw", async ctx => {
  let {
    account
  } = ctx.request.body;

  let code = "1",
    message = "ok";

  try {
    account = validator.trim(account);
    var activeKey = cryptoUtils.md5(validator.trim(account));

    await redisUtils.createForgetUser(account, activeKey);

    emailUtils.sendEmail(
      "邮箱重置",
      "Fred Foo <wuwZhang@126.com>",
      account,
      "<a href='http://zhanglisha.xyz/reset_password/" +
      activeKey +
      "'>点击进行密码重置</a>"
    );
  } catch (e) {
    code = "-1";
    message = e.message;
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

/**
 * 重置密码
 */
router.post("/api/reset_password", async ctx => {
  let {
    activeKey,
    password
  } = ctx.request.body,
    code = "1",
    message = "reset password succeed";

  try {
    let account = await redisUtils.getForgetUser(activeKey);
    password = cryptoUtils.md5(validator.trim(password));

    if (account) {
      await $User.updatePasswordByAccount(account, password).then(async () => {
        await redisUtils.delForgetUser(activeKey);
      });
    } else {
      code = "-1";
      message = "redis中用户不存在";
    }
  } catch (e) {
    code = "-2";
    message = e.message;
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

module.exports = router;
