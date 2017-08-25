const router = require('koa-router')();
const Models = require('../lib/core');
const $Article = Models.$Article;

router.post('/api/article_edit/:articleId', async(ctx, next) => {
  let code = '1', message = 'ok';
  const { articleId } = ctx.params;

  try {
    var result = await $Article.getArticleById(articleId);
    // console.log(result);
  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'article': result
  }
});

router.post('/api/article_update/:articleId', async(ctx, next) => {
  let code = '1', message = 'ok';
  const { articleId } = ctx.params,
        { title, content, update_time } = ctx.request.body;

  try {
    let data = {
      title: title,
      content: content,
      update_at: update_time
    }
    await $Article.updateArticleById(articleId, data)
  } catch (e) {
    message = e.message;
    code = '-1';
  }

  ctx.response.body = {
    'code': code,
    'message': message,
  }
})

module.exports = router;
