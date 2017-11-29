const router = require('koa-router')();
const Models = require('../lib/core');
const $User = Models.$User;
const cheackNotLogin = require('../middlewares/check-login').cheackNotLogin;
const fs = require('async-file');
const path = require('path');
const uuidV4 = require('uuid/v4');
const nodemailer = require('nodemailer');
const cryptoUtils = require('../utils/cryptoUtils');
const validator = require('validator');

// router.get('/home/register', async(ctx, next) => {
//   await ctx.render('home/register');
// });
//

function sendEmail(key, email) {
  var stmpTransport = nodemailer.createTransport({
    host:"smtp.126.com",
    secureConnection: true,
    port: 25,
    auth:{
      user:"wuwZhang@126.com", //你的邮箱帐号,
      pass:"sqwangyi22"//你的邮箱授权码
    }
  });

  var mailOptions = {
    from:"Fred Foo <wuwZhang@126.com>",//标题
    to: email,//收件人
    subject: "注册邮箱认证", // 标题
    html: "<a href='http://localhost:3000/verifyemail/" + key + "'>点击进行邮箱验证</a>" // html 内容
  };

  stmpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log('error', error);
    } else {
      console.log("Message sent:" + response.message);
    }
    stmpTransport.close();
  });
}

router.post('/signIn', async(ctx, next) => {
  await cheackNotLogin(ctx, next);
  ctx.response.body = ctx.flash.get();
});


router.post('/api/signUp', async(ctx, next) => {
  let code = '1', message = '注册成功';

  try {
    var data = JSON.parse(ctx.request.body);
    let {
      account,
      username,
      password,
      avatarValue
    } = data;

    if (!account || !validator.isEmail(account)) {
      code = '-1';
      message = '填写正确的邮箱格式'
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
      }

      await $User.create(user);
      delete user.password;
      // ctx.session.user = user;

      sendEmail(activeKey, account);
    }
  } catch(e) {
    if (e.message.match('E11000 duplicate key')) {
      code = '-2';
      message = '用户名已占用';
    } else {
      code = '-3';
      message = e.message;
    }
  }

  ctx.response.body = {
    'code': code,
    'message': message
  }
});

router.post('/api/checkAccount', async(ctx, next) => {
  const { account } = ctx.request.body,
        user = await $User.getUserByAccount(account);

  let code = '1', message = 'ok';

  if (user) {
    code = '-1',
    message = '用户名已存在'
  } else {
    code,
    message
  }
  ctx.response.body = {
    'code': code,
    'message': message
  }
});

module.exports = router;
