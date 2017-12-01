var checkLogin = (ctx, next) => {
  if (!ctx.session.user) {
    return false;
  }

  return true;
}

var cheackNotLogin = (ctx, next) => {
  if (ctx.session.user) {
    return false;
  }

  return true;
}

module.exports = {
  checkLogin,
  cheackNotLogin
}
