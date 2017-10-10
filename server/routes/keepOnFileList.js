const router = require('koa-router')();
const Models = require('../lib/core');
const $Article = Models.$Article;

router.get('/api/getArticleDateList', async(ctx, next) => {
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

router.post('/api/article_Catalog_And_Count', async(ctx, next) => {
  let code = '1', message = 'ok';
  try {
    var result = await $Article.getArticleCatalogs();

    // console.log(result);

  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'catalogs': result
  }
});

module.exports = router;
