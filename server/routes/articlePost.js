const router = require('koa-router')();
const Models = require('../lib/core');
const $Article = Models.$Article;

router.post('/api/article_post', async(ctx, next) => {
  let { article } = ctx.request.body;
  let code = '1', message = '发表成功';

  const articleModel = {
    title: article.title,
    content: article.content
  };

  try {
    var result = await $Article.create(articleModel);
  }catch (e) {
    if (e.message.match('E11000 duplicate key')) {
      code = '-1';
      message = '存在同名标题文章'
    } else {
      code = '-2';
      message = e.message
    }
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'post': result
  }
});

router.post('/api/checkTitle', async(ctx, next) => {
  const { title } = ctx.request.body,
        article = await $Article.getArticleByTitle(title);

  let code = '1', message = 'ok';

  if (article) {
    code = '-1',
    message = '存在同名标题文章'
  } else {
    code,
    message
  }

  ctx.response.body = {
    'code': code,
    'message': message
  }
})

module.exports = router;