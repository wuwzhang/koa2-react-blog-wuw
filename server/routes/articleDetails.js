const router = require('koa-router')();
const Models = require('../lib/core');
const $Article = Models.$Article;
const redisUtils = require('../utils/redisUtils');

router.get('/api/article_details/:articleId', async(ctx, next) => {
  let code = '1', message = 'ok';
  const { articleId } = ctx.params;

  try {
    var result = await Promise.all([
                                    $Article.getArticleById(articleId),
                                    $Article.incPv(articleId),
                                    $Article.getPreArticleById(articleId),
                                    $Article.getNextArticleById(articleId)
                                  ])
                                  .then(async (values) => {
                                    if (values && values[0] && values[0][0] && values[0][0].title) {
                                      let title = values[0][0].title;
                                      await redisUtils.incPv({articleId, title});
                                    }

                                    if (values) {
                                      return {
                                        article: values[0] ? values[0][0] : '',
                                        pre: values[2] ? values[2] : null,
                                        next: values[3] ? values[3] : null
                                      }
                                    }
                                  })
  } catch (e) {
    code = '-1',
    message = e.message
  }

  // console.log(result)

  ctx.response.body = {
    'code': code,
    'message': message,
    'article': result.article,
    'preArticle': result.pre,
    'nextArticle': result.next
  }
});


module.exports = router;
