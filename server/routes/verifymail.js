const router = require("koa-router")();
const Models = require("../lib/core");
const $User = Models.$User;
const redisUtils = require("../utils/redisUtils");

router.post("/api/registActive", async ctx => {
  let code = "1",
    message = "登录成功";
  var { verifyKey } = ctx.request.body;

  try {
    const activeKey = verifyKey.split("/")[2];

    await redisUtils
      .getCreateTmpUser(activeKey)
      .then(async res => {
        /*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
        let { activeKey, ...user } = res;
        await $User.create(user);
      })
      .then(async () => {
        let result = await redisUtils.delCreateTmpUser(activeKey);

        if (result === 0) {
          code = "-1";
          message = "存入redis错误";
        }
      });
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
