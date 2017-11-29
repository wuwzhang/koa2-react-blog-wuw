module.exports = function(){
  return async (ctx,next) => {
    try {
      await next();
    } catch (e) {
      ctx.log.error(`${ctx.request.method} ${ctx.request.originalUrl} ${ctx.status}
        ${e}`);
    }
  }
}
