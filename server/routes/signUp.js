const router = require('koa-router')();
const Models = require('../lib/core');
const $User = Models.$User;
const cheackNotLogin = require('../middlewares/check-login').cheackNotLogin;
const formidable = require('formidable');
const fs = require('async-file');
const path = require('path');
const uuidV4 = require('uuid/v4');
const crypto = require('crypto');

function formidablePromise(req, option) {
  return new Promise((resolve, reject) => {
    let form = new formidable.IncomingForm(option);

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      } else {
        resolve({
          fields: fields,
          files: files
        })
      }
    })
  });
}

router.get('/home/register', async(ctx, next) => {
  await ctx.render('home/register');
});

router.post('/signIn', async(ctx, next) => {
  await cheackNotLogin(ctx, next);
  ctx.response.body = ctx.flash.get();
});


router.post('/api/signUp', async(ctx, next) => {
  let code = '1', message = '注册成功';
  // const formidableResult = await formidablePromise(ctx.req);
  ctx.response.body = {
    'code': code,
    'message': message
  }
});


  //确认账号是否存在
router.post('/api/checkAccount', async(ctx, next) => {
  const { account } = ctx.request.body,
        user = await $User.getUserByAccount(account);

  let code = '1', message = '';

  if (user) {
    code = '-1',
    message = '用户名已存在'
  } else {
    code,
    message
  }

});
module.exports = router;
