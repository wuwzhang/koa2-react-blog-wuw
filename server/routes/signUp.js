const router = require('koa-router')();
const UserModel = require('../models/user');
const cheackNotLogin = require('../middlewares/check-login').cheackNotLogin;
const fs = require('async-file');
const path = require('path');
const uuidV4 = require('uuid/v4');
const crypto = require('crypto');

router.get('/home/register', async(ctx, next) => {
  await ctx.render('home/register');
});

router.post('/signIn', async(ctx, next) => {
  await cheackNotLogin(ctx, next);
  ctx.response.body = ctx.flash.get();
});


router.post('/api/signUp', async(ctx, next) => {
  let code = '1', message = '注册成功';

  try {
    // console.log(ctx.request.body);
    var data = JSON.parse(ctx.request.body);
    // console.log(data);
    let {
      account,
      username,
      password
    } = data;

    // console.log(typeof data);
    // console.log(JSON.parse(data));
    password = crypto.createHash('md5').update(password).digest('hex');
    // console.log("ooooooooooooooo" + account + ' ' + username + ' ' + password);

    const user = {
      account: account,
      username: username,
      password: password
    }

    await UserModel.create(user);
    delete user.password;
    ctx.session.user = user;
  } catch(e) {
    if (e.message.match('E11000 duplicate key')) {
      code = '-1';
      message = '用户名已占用';
    } else {
      code = '-2';
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
        user = await UserModel.getUserByAccount(account);

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
