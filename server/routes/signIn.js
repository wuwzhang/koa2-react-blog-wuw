const router = require('koa-router')();
const Models = require('../lib/core');
const $User = Models.$User;
const cheackNotLogin = require('../middlewares/check-login').cheackNotLogin;
const crypto = require('crypto');

router.get('/home/login', async(ctx, next) => {
  await ctx.render('home/login');
});

router.post('/api/signIn', async(ctx, next) => {
  await cheackNotLogin(ctx, next);
  let code = '1', message = '登录成功';

  let { account, password } = ctx.request.body;
  // console.log(account + " : " + password)
  let user = await $User.getUserByAccount(account);

  password = crypto.createHash('md5').update(password).digest('hex');

  if (user && (password == user.password)) {
    delete user.password;
    // ctx.session.user = user;
    ctx.response.body = {
      'code': code,
      'message': message,
      'user': {
        level: user.level,
        ...ctx.session.user
      }
    }
  } else {
    code = '-1',
    message= '用户或密码错误',
    ctx.response.body = {
      'code': code,
      'message': message
    }
  }
});

module.exports = router;
