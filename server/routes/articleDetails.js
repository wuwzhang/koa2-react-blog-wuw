const router = require('koa-router')();
const Models = require('../lib/core');
const $Article = Models.$Article;

router.get('/api/article_details/:articleId', async(ctx, next) => {
  let code = '1', message = 'ok';
  const { articleId } = ctx.params;

  try {
    var result = await Promise.all([
                                    $Article.getArticleById(articleId),
                                    $Article.incPv(articleId),
                                    $Article.getPreArticleById(articleId),
                                    $Article.getNextArticleById(articleId)
                                  ]);
  } catch (e) {
    code = '-1',
    message = e.message
  }
  let Pre, Next;

  if (result[2]) {
    Pre = {
      title: result[2].title,
      _id: result[2]._id
    };
  } else {
    Pre = null;
  }

  if (result[3]) {
    Next = {
      title: result[3].title,
      _id: result[3]._id
    };
  } else {
    Next = null;
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'article': result[0],
    'preArticle': Pre,
    'nextArticle': Next
  }
});

router.get('/api/article_edit/:articleId', async(ctx, next) => {
  let code = '1', message = 'ok';
  const { articleId } = ctx.params;

  try {
    var result = await $Article.getArticleById(articleId);
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


module.exports = router;
