const router = require("koa-router")();
const Models = require("../lib/core");
const $Article = Models.$Article;
const $Catalog = Models.$Catalog;
const redisUtils = require("../utils/redisUtils");

router.get("/api/getArticleDateList", async ctx => {
  let code = "1",
    message = "ok";
  try {
    var result = await $Article.getArticleListByDate();
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    articles: result
  };
});

router.post("/api/getArticleDateList", async ctx => {
  let code = "1",
    message = "ok",
    result = [];

  let { page, eachPageArticle } = ctx.request.body;

  try {
    result = await Promise.all([
      $Article.getArticleListByDate(page, eachPageArticle),
      $Article.getArticleListCountByDate()
    ]);
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    articles: result[0],
    count: result[1].length
  };
});

router.get("/api/article_Catalog_And_Count", async ctx => {
  let code = "1",
    message = "ok",
    result = [],
    resultArr = [];
  try {
    result = await redisUtils.getArticleCatalogs();

    if (result.length > 0) {
      let len = result.length,
        cnt = Math.floor(len / 2);
      for (let i = 0; i < cnt; i += 1) {
        resultArr.push({
          _id: result[i * 2],
          count: result[i * 2 + 1]
        });
      }
    } else {
      resultArr = await $Catalog.getArticleCatalogs();
      resultArr.forEach(async catalog => {
        await redisUtils.setArticleCatalogs(catalog.catalog, catalog.count);
      });
    }
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    catalogs: resultArr
  };
});

module.exports = router;
