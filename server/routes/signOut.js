const router = require("koa-router")();
const redisUtils = require("../utils/redisUtils");
const checkLoginUtils = require("../utils/checkLoginUtils");

router.post("/api/signOut", async ctx => {
  let { userId } = ctx.request.body,
    code = "1",
    message = "注销成功";

  if (checkLoginUtils.cheackNotLogin(ctx)) {
    try {
      await redisUtils.delUser(userId);
    } catch (e) {
      code = "-2";
      message = e.message;
    }
  } else {
    code = "-3";
    message = "未登录";
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

module.exports = router;
