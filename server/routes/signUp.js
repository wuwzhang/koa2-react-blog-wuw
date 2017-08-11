const router = require('koa-router')();
const UserModel = require('../models/user');
const cheackNotLogin = require('../middlewares/check-login').cheackNotLogin;
const formidable = require('formidable');
const fs = require('async-file');
const path = require('path');
const uuidV4 = require('uuid/v4');
const crypto = require('crypto');

function formidablePromise(req, opts) {
  return new Promise(function(resolve, reject) {
    var form = new formidable.IncomingForm(opts)
    form.parse(req, function(err, fields, files) {
      if (err) return reject(err)
      resolve({
        fields: fields,
        files: files
      })
    })
  })
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
  try {
    // const {
    //   account,
    //   username,
    //   password
    // } = ctx.request.body;

    // password = crypto.createHash('md5').update(password).digest('hex');
    // console.log(account + ' ' + username + ' ' + password);

    const user = {
      account: 'wuwzhang@gmail.com',
      username: 'wuw',
      password: '12345678'
    }

    await UserModel.create(ctx.request.body);
    // const tmp = await $User.getUserByAccount(account);
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


  //确认账号是否存在
router.post('/api/checkAccount', async(ctx, next) => {
  const { account } = ctx.request.body,
        user = await UserModel.getUserByAccount(account);

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
