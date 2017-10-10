const router = require('koa-router')();
const Models = require('../lib/core');
const $User = Models.$User;
const cheackNotLogin = require('../middlewares/check-login').cheackNotLogin;
const crypto = require('crypto');

router.get('/home/login', async(ctx, next) => {
  await ctx.render('home/login');
});

router.post('/api/signIn', async(ctx, next) => {
  let code = '1', message = '登录成功';

  let { account, password } = ctx.request.body;

  try {
    let result = await $User.getUserByAccount(account);
    password = crypto.createHash('md5').update(password).digest('hex');

    if (result && result.password === password) {
      delete result.password;
      var user = {
        level: result.level,
        username: result.username,
        account: result.account,
        _id: result._id
      }
    } else {
      code = '-1';
      message = '用户名或密码错误'
    }
  } catch (e) {
    code = '-2';
    message = e.message;
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'user': user
  }
});

module.exports = router;
