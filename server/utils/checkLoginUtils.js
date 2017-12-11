var checkLogin = ctx => {
  if (!ctx.session.user) {
    return false;
  }

  return true;
};

var cheackNotLogin = ctx => {
  if (ctx.session.user) {
    return false;
  }

  return true;
};

module.exports = {
  checkLogin,
  cheackNotLogin
};
