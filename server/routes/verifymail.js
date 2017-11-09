const router = require('koa-router')();
const Models = require('../lib/core');
const $User = Models.$User;
const jwtKoa = require('koa-jwt');

router.post('/api/registActive', async(ctx, next) => {
  let code = '1', message = '登录成功';
  var { verifyKey } = ctx.request.body;

  try {
    const activeKey = verifyKey.split('/')[2];
    await $User.verifymail(activeKey, true);
  } catch (e) {
    code = '-2';
    message = e.message;
  }

  ctx.response.body = {
    'code': code,
    'message': message
  }
});

module.exports = router;
