const router = require('koa-router')();
const Models = require('../lib/core');
const $Article = Models.$Article;

router.post('/api/article_list', async(ctx, next) => {
  let code = '1', message = 'ok';

  try {
    var result = await $Article.getArticles()
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

router.post('/api/article_delete/:articleId', async(ctx, next) => {
  let code = '1', message = 'ok';
  const { articleId } = ctx.params;

  try {

    var result = await $Article.deleteArticleById(articleId);

  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message
  }
});

router.post('/api/article_date_list', async(ctx, next) => {
  let code = '1', message = 'ok';

  try {

    var result = await $Article.getArticlesCountByMonth();

  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'result': result
  }
});

router.post('/api/article_list/init', async(ctx, next) => {
  let code = '1', message = 'ok';
  const { page, eachPageArticles } = ctx.request.body;

  console.log(page)
  console.log(eachPageArticles)

  try {
    var count = await $Article.getArticleCount(),
        result = await $Article.getPageArticle(page, eachPageArticles);

  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'count': count,
    'articles': result
  }
});

module.exports = router;
