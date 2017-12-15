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
    console.log("TopMenu - loginByToken- func");
  } else {
    let tagsArr = tags.split(";"),
      catalogArr = catalog.split(";"),
      _id = new mongoose.Types.ObjectId();

    //去空去重的tag和catalog
    let tagAns = [...new Set(tagsArr)].filter(tag => {
      return tag.length > 0;
    });
    let catalogAns = [...new Set(catalogArr)].filter(catalog => {
      return catalog.length > 0;
    });

    await Promise.all([
      $Article.create({
        title,
        content,
        tags: tagAns,
        catalog: catalogAns,
        _id: _id
      }),
      $Tag.addTags(tagAns, _id),
      $Catalog.addCatalog(catalogAns, _id)
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
          return catalogAns.forEach(async catalog => {
            await redisUtils.setArticleCatalogs(catalog, 1);
          });
        }
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
