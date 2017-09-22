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
  const { page = 1, eachPageArticles = 5 } = ctx.request.body;

  try {
    var result = await Promise.all([$Article.getArticleCount(),
                                    $Article.getPageArticle(page, eachPageArticles)]);

  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'count': result[0],
    'articles': result[1]
  }
});

/**
 *   通过标签查找文章
 */
router.post('/api/getArticlesByTag', async(ctx, next) => {
  let code = '1', message = 'ok';

  const { tag, page = 1, eachPageArticles = 5 } = ctx.request.body;

  try {
    var result = await Promise.all([$Article.getArticlesTagsCount(tag),
                                    $Article.getArticlesByTag(tag, page, eachPageArticles)]);
  } catch(e) {
    code = '-1',
    message = e.message
  }


  ctx.response.body = {
    'code': code,
    'message': message,
    'count': result[0],
    'articles': result[1]
  }
})
/**
 *   通过分类查找文章
 */
router.post('/api/getArticlesByCatalog', async(ctx, next) => {
  let code = '1', message = 'ok';

  const { catalog, page = 1, eachPageArticles = 5 } = ctx.request.body;

  try {
    var result = await Promise.all([$Article.getArticlesCatalogCount(catalog),
                                    $Article.getArticlesByCatalog(catalog, page, eachPageArticles)]);
  } catch(e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'count': result[0],
    'articles': result[1]
  }
})

/**
 *   通过关键词查找文章
 */
router.post('/api/getArticleBySearch', async(ctx, next) => {
  let code = '1', message = 'ok';

  const { value } = ctx.request.body;

  console.log(value)

  try {
    var result = await $Article.getArticleBySearch(value);
  } catch(e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'articles': result
  }
})

/**
 * 文章是否开放评论
 */
router.post('/api/article_toggle_Comments', async(ctx, next) => {

  let { articleId, state } = ctx.request.body;

  let code ='1', message = '修改成功';

  try {
    var result = await $Article.toggleComments(articleId, state);
  } catch(e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message
  }

})

/**
 * 文章是否公开
 */
router.post('/api/article_toggle_ArticlePublic', async(ctx, next) => {

  let { articleId, state } = ctx.request.body;

  let code ='1', message = '修改成功';

  try {
    var result = await $Article.toggleArticlePublic(articleId, state);
  } catch(e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message
  }

})
module.exports = router;
