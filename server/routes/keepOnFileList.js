const router = require('koa-router')();
const Models = require('../lib/core');
const $Article = Models.$Article;

router.post('/api/getArticleDateList', async(ctx, next) => {
  let code = '1', message = 'ok';
  try {
    var result = await $Article.getArticleListByDate();
  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'articles': result
  }
});

module.exports = router;
