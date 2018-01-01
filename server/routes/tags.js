const router = require("koa-router")();
const Models = require("../lib/core");
const $Tag = Models.$Tag;
const config = require("../config/blogConfig");

/**
 * 获取count数量的标签
 */
router.get("/api/getTags", async ctx => {
  let code = "1",
    message = "ok";

  // const { count } = ctx.request.body;
  const { count = 10 } = config.keepOnFile;
  try {
    var result = await $Tag.getTags(count);
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    tags: result
  };
});

/**
 * 获取所有标签
 */
router.get("/api/getAllTags", async ctx => {
  let code = "1",
    message = "ok";

  try {
    var result = await $Tag.getAllTags();
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    tags: result
  };
});

module.exports = router;
