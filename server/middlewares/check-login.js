var checkLogin = async(ctx, next) => {
  if (!ctx.session.user) {
    ctx.response.body = {
      'code': 0,
      'message': '未登录'
    }
  }
  await next();
}

var cheackNotLogin = async(ctx, next) => {
  if (ctx.session.user) {
    ctx.response.body = {
      'code': 0,
      'message': '已登录'
    }

    await next();
  }
}

module.exports = {
  checkLogin: checkLogin,
  cheackNotLogin: cheackNotLogin
}
