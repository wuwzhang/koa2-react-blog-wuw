const router = require('koa-router')();
const Models = require('../lib/core');
const $Article = Models.$Article;
const $Tag = Models.$Tag;
const $Catalog = Models.$Catalog;

/**
 * 通过文章id获取要修改的文章
 */
router.post('/api/article_edit/:articleId', async(ctx, next) => {
  let code = '1', message = 'ok';
  const { articleId } = ctx.params;

  try {
    var result = await $Article.getArticleById(articleId);

    result = result ? result[0] : result;
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

/**
 * 通过文章id删除文章
 */
router.post('/api/article_delete/:articleId', async(ctx, next) => {
  let code = '1', message = 'ok';
  const { articleId } = ctx.params;

  try {

    var result = await Promise.all([$Article.deleteArticleById(articleId),

                                  ])

  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message
  }
});

/**
 * 通过文章Id修改文章
 */
router.post('/api/article_update/:articleId', async(ctx, next) => {
  let code = '1', message = 'ok';
  const { articleId } = ctx.params,
        { title, content, update_time, tags, catalog } = ctx.request.body;

  let tagsArr = (typeof tags === 'string' && tags.constructor === String) ? tags.split(';') : tags;

  let tagsIdArr = [];
  tagsArr.map(async (iteam, index) => {
    if (iteam) {
      let exist = await $Tag.findTagByTagName(iteam);

      if (!exist) {
        try {
          let res = await $Tag.create({ tag: iteam });

        } catch(e) {
          message = e.message;
          code =  '-2';
        }
      }
    }
  })

  try {
    let data = {
      title: title,
      content: content,
      tags: tagsArr,
      catalog: catalog,
      updated_at: update_time
    }
    await $Article.updateArticleById(articleId, data);
    let exit = await $Catalog.getCatalogrByCatalogName(catalog);
    console.log(exit)

    if (!exit) {
      await $Catalog.create({catalog: catalog});
    }
  } catch (e) {
    message = e.message;
    code = '-1';
  }

  ctx.response.body = {
    'code': code,
    'message': message
  }
})

module.exports = router;
