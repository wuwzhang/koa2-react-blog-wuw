const router = require('koa-router')();
const Models = require('../lib/core');
const $Article = Models.$Article;

router.get('/api/article_details/:articleId', async(ctx, next) => {
  let code = '1', message = 'ok';
  const { articleId } = ctx.params;

  try {
    var result = await $Article.getArticleById(articleId);
    console.log(result);
  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'article': result
  }
})

module.exports = router;
