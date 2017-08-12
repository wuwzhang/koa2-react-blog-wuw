const router = require('koa-router')();
const checkLogin = require('../middlewares/check-login').checkLogin;

router.get('/signOut', async(ctx, next) => {
  await checkLogin(ctx, next);
  ctx.response.body = ctx.flash.get();
})
