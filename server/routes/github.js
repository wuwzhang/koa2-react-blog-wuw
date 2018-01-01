const mongoose = require("mongoose");
const Models = require("../lib/core");
const $User = Models.$User;
const config = require("config-lite")(__dirname);
const router = require("koa-router")();
const jwtUtils = require("../utils/jwtUtils");
const fetch = require("node-fetch");
// const cryptoUtils = require("../utils/cryptoUtils");
// const validator = require("validator");
const redisUtils = require("../utils/redisUtils");

router.get("/api/signIn/github", async ctx => {
  let code = "1",
    message = "ok";
  var dataStr = new Date().valueOf();
  //重定向到认证接口,并配置参数
  var path = "https://github.com/login/oauth/authorize";
  path += "?client_id=" + config.github.client_id;
  path += "&scope=" + config.github.scope;
  path += "&state=" + dataStr;
  //转发到授权服务器
  // ctx.redirect(path)
  ctx.response.body = {
    code: code,
    message: message,
    path: path
  };
});

router.get("/github/oauth/callback", async ctx => {
  var code = "1",
    message = "ok";

  const codes = ctx.query.code;
  let path = "https://github.com/login/oauth/access_token";
  const params = {
    client_id: config.github.client_id,
    client_secret: config.github.client_secret,
    code: codes
  };

  var result = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
    .then(res => {
      return res.text();
    })
    .then(body => {
      const args = body.split("&");
      let arg = args[0].split("=");
      const access_token = arg[1];
      return access_token;
    })
    .then(async token => {
      const url = " https://api.github.com/user?access_token=" + token;

      let ans = await fetch(url)
        .then(res => {
          return res.json();
        })
        .then(response => {
          let user = {
            username: response.name,
            account: response.email,
            avatar: response.avatar_url
          };

          return user;
        });

      return ans;
    })
    .then(async result => {
      // const url = "/api/addUser/github";

      let exit = await $User.getUserByAccount(result.account),
        _id;

      if (!exit) {
        // var activeKey = cryptoUtils.md5(validator.trim(result.account));

        _id = new mongoose.Types.ObjectId();

        await $User.create({
          _id: _id,
          ...result
        });
      } else {
        _id = exit._id;
      }
      return {
        _id: _id,
        ...result
      };
    })
    .catch(e => {
      code = "-1";
      message = e.message;
    });

  try {
    var token = jwtUtils.setToken(result._id, config.secretKey);

    redisUtils.addUser({
      token: token,
      ...result
    });

    ctx.session.user = result;
  } catch (e) {
    code = "-2";
    message = e.message;
  }

  ctx.response.body = {
    code: code,
    message: message,
    user: result,
    token: token
  };
});

module.exports = router;
