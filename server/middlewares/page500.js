module.exports = function(ctx, next) {
  return async (ctx, next) => {
    if (ctx.status === 500) {
      await ctx.render("500");
    }
    await next();
  };
};
