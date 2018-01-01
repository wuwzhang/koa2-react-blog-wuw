const mongoose = require("mongoose");
const router = require("koa-router")();
const Models = require("../lib/core");
const utils = require("../utils/utils");
const redisUtils = require("../utils/redisUtils");
const $Article = Models.$Article;
const $Tag = Models.$Tag;
const $Catalog = Models.$Catalog;

router.post("/api/article_post", async ctx => {
  let { article } = ctx.request.body;
  let code = "1",
    message = "发表成功",
    result = {};

  let { tags, catalog, title, content } = article;

  if (utils.isEmpty(tags, catalog, title, content)) {
    code = "-1";
    message = "参数错误";
  } else {
    let _id = new mongoose.Types.ObjectId();

    let tagsArr = utils.getArrBySplitStr(tags, ";"),
      catalogArr = utils.getArrBySplitStr(catalog, ";");

    await Promise.all([
      $Article.create({
        title,
        content,
        tags: tagsArr,
        catalog: catalogArr,
        _id: _id
      }),
      $Tag.addTags(tagsArr, _id),
      $Catalog.addCatalog(catalogArr, _id)
    ])
      .then(async (res, err) => {
        if (err) {
          throw new Error(err);
        } else {
          return await Promise.all([
            redisUtils.setTopCommentsArticle({
              _id: _id,
              title: title,
              commentCount: 0
            }),
            redisUtils.setTopPreviewArticle({
              _id: _id,
              title: title,
              pv: 0
            })
          ]);
        }
      })
      .then(async (res, err) => {
        if (err) {
          code = "-2";
          message = err;
          throw new Error(err);
        } else {
          return catalogArr.forEach(async catalog => {
            await redisUtils.setArticleCatalogs(catalog, 1);
          });
        }
      })
      .catch(e => {
        throw new Error(e);
      });
  }

  ctx.response.body = {
    code: code,
    message: message,
    post: result
  };
});

router.post("/api/checkTitle", async ctx => {
  const { title } = ctx.request.body,
    article = await $Article.getArticleByTitle(title);

  let code = "1",
    message = "ok";

  if (article) {
    (code = "-1"), (message = "存在同名标题文章");
  } else {
    code, message;
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

module.exports = router;
