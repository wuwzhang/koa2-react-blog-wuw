const router = require("koa-router")();
const config = require("../config/blogConfig");
const fs = require("fs");

router.get("/api/get_config", async ctx => {
  let code = "1",
    message = "get config success";

  ctx.response.body = {
    code: code,
    message: message,
    config: config
  };
});

router.post("/api/set_config", async ctx => {
  let code = "1",
    message = "set config success",
    { config } = ctx.request.body;

  let data = `module.exports=${JSON.stringify(config)}`;

  fs.writeFile("config/blogConfig.js", data, function(err) {
    if (err) {
      code = "-1";
      message = "message write error";
      throw err;
    }
  });

  ctx.response.body = {
    code: code,
    message: message
  };
});

module.exports = router;
