const router = require('koa-router')();
const Models = require('../lib/core');
const $User = Models.$User;
const jwt = require('jsonwebtoken');
const jwtKoa = require('koa-jwt');
const crypto = require('crypto');
const config = require('config-lite')(__dirname)

router.get('/home/login', async(ctx, next) => {
  await ctx.render('home/login');
});

router.post('/api/signIn', async(ctx, next) => {
  let code = '1', message = '登录成功';

  let { account, password } = ctx.request.body;

  try {
    var token = jwt.sign({
      data: account,
    }, config.secretKey, { expiresIn: '1h' });

    let result = await $User.getUserByAccount(account);
    password = crypto.createHash('md5').update(password).digest('hex');

    if (result.isActive === false) {
      code = '-1';
      message = '邮箱未确认'
    } else if (result && result.password === password) {

      // ctx.session.user = account;
      // ctx.session.isLogin = true;

      delete result.password;

      var user = {
        level: result.level,
        username: result.username,
        account: result.account,
        _id: result._id
      }
    } else {
      code = '-2';
      message = '用户名或密码错误'
    }
  } catch (e) {
    code = '-3';
    message = e.message;
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'user': user,
    'token': token
  }
});

router.post('/api/getUserByToken', async(ctx, next) => {
  let { token } = ctx.request.body;
  let code = '1', message = 'token获取用户成功', account = '';

  try {
    if (token) {
      jwt.verify(token, config.secretKey, function(err, decoded) {
        if (err) {
          console.log(err)
        } else {
          // console.log(decoded.data)
          account = decoded.data;
          console.log(account);
        }
      })

      if (account) {
        let result = await $User.getUserByAccount(account)

        var user = {
          level: result.level,
          username: result.username,
          account: result.account,
          _id: result._id
        }
      }
    }


  } catch (e) {
    code = '-1';
    message = e.message;
  }
  ctx.response.body = {
    'code': code,
    'message': message,
    'user': user
  }
})

module.exports = router;
