const router = require('koa-router')();
const Models = require('../lib/core');
const $User = Models.$User;
const jwtUtils = require('../utils/jwtUtils')
const cryptoUtils = require('../utils/cryptoUtils');
const redisUtils = require('../utils/redisUtils')
const config = require('config-lite')(__dirname)

router.get('/home/login', async(ctx, next) => {
  await ctx.render('home/login');
});

router.post('/api/signIn', async(ctx, next) => {
  let code = '1', message = '登录成功', user = null, token = '';

  let { account, password } = ctx.request.body;

  try {

    user = await redisUtils.getCreateTmpUser(cryptoUtils.md5(account))

    if (user) {
      code = '-1';
      message = '邮箱未确认'
    } else  {

      var result = await $User.getUserByAccount(account);
      password = cryptoUtils.md5(password);

      if (result && result.password === password) {
        delete result.password;

        user = {
          level: result.level,
          username: result.username,
          account: result.account,
          avatar: result.avatar,
          _id: result._id
        }

        token = jwtUtils.setToken(result._id, config.secretKey);

        await redisUtils.addUser({
          ...user,
          token: token
        })

        ctx.session.user = user;
      } else {
        code = '-2';
        message = '用户名或密码错误'
      }
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
  let code = '1', message = 'token获取用户成功', _id = '',
      user = null;

  try {
    if (token) {

      //验证token是否过期，此处设置为1小时


      _id = jwtUtils.getToken(token, config.secretKey);

      if (_id === -1) {
        code = '-1';
        message = 'token过期'
      } else {

        let result = await redisUtils.getUser(_id);

        if (!result) {
          result = await $User.getUserId(_id)
        }

        // console.log('result', result)

        user = {
          level: result.level,
          username: result.username,
          account: result.account,
          avatar: result.avatar,
          _id: result._id
        }
      }

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
