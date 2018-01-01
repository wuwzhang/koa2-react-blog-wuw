const router = require("koa-router")();
const Models = require("../lib/core");
const utils = require("../utils/utils");
const redisUtils = require("../utils/redisUtils");
const commentUtils = require("../utils/commentDeleteUtils");
const $Article = Models.$Article;
const $Tag = Models.$Tag;
const $Catalog = Models.$Catalog;

/**
 * 通过文章id获取要修改的文章
 */
router.post("/api/article_edit/:articleId", async ctx => {
  let code = "1",
    message = "ok";
  const { articleId } = ctx.params;

  try {
    var result = await $Article.getArticleById(articleId);

    result = result ? result[0] : result;
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    article: result
  };
});

/**
 * 通过文章id删除文章
 */
router.post("/api/article_delete/:articleId", async ctx => {
  let code = "1",
    message = "ok";
  const { articleId } = ctx.params;

  try {
    await $Article
      .getDeleteArticle(articleId)
      .then(async res => {
        if (res) {
          let { comments, tags, catalog, title } = res;
          await Promise.all([
            $Article.deleteArticleById(articleId),
            redisUtils.delTopCommentsArticle({ _id: articleId, title: title }),
            redisUtils.delTopPreviewArticle({ _id: articleId, title: title }),
            redisUtils.delArticleCatalogs(catalog),
            $Tag.deleteTags(tags, articleId),
            $Catalog.deleteCatalog(catalog, articleId),
            commentUtils.commentDelete(articleId, comments, title)
          ]);
        }
      })
      .catch(e => e);
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

/**
 * 通过文章Id修改文章
 */
router.post("/api/article_update/:articleId", async ctx => {
  let code = "1",
    message = "ok";
  const { articleId } = ctx.params,
    {
      content,
      update_time,
      tags,
      catalog,
      preTags,
      preCatalog
    } = ctx.request.body;

  let tagsArr = utils.getArrBySplitStr(tags, ";"),
    catalogArr = utils.getArrBySplitStr(catalog, ";");

  let interTags = utils.intersectionArray(preTags, tagsArr),
    interCatalog = utils.intersectionArray(preCatalog, catalogArr);

  let incTagsArr = utils.differenceArray(interTags, tagsArr),
    incCatalogArr = utils.differenceArray(interCatalog, catalogArr),
    decTagsArr = utils.differenceArray(interTags, preTags),
    decCatalogArr = utils.differenceArray(interCatalog, preCatalog);

  try {
    let data = {
      content: content,
      tags: tagsArr,
      catalog: catalogArr,
      updated_at: update_time
    };

    await Promise.all([
      $Article.updateArticleById(articleId, data),
      $Tag.addTags(incTagsArr, articleId),
      $Catalog.addCatalog(incCatalogArr, articleId),
      $Tag.deleteTags(decTagsArr, articleId),
      $Catalog.deleteCatalog(decCatalogArr, articleId)
    ]);
  } catch (e) {
    message = e.message;
    code = "-1";
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

module.exports = router;
