module.exports = function(ctx, next) {
  return async (ctx, next) => {
    if (ctx.status === 404) {
      await ctx.render("404");
    }
    await next();
  };
};
