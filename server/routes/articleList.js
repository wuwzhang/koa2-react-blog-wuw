const router = require("koa-router")();
const Models = require("../lib/core");
const $Article = Models.$Article;
const redisUtils = require("../utils/redisUtils");

router.post("/api/article_list", async ctx => {
  let code = "1",
    message = "ok";

  try {
    var result = await $Article.getArticles();
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    articles: result
  };
});

router.get("/api/article_date_list", async ctx => {
  let code = "1",
    message = "ok";

  try {
    var result = await $Article.getArticlesCountByMonth();
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    result: result
  };
});

router.post("/api/article_list/init", async ctx => {
  let code = "1",
    message = "ok";
  const { page = 1, eachPageArticles = 5 } = ctx.request.body;

  try {
    var result = await Promise.all([
      $Article.getArticleCount(),
      $Article.getPageArticle(page, eachPageArticles)
    ]);
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    count: result[0],
    articles: result[1]
  };
});

/**
 *   通过标签查找文章
 */
router.post("/api/getArticlesByTag", async ctx => {
  let code = "1",
    message = "ok";

  const { tag, page = 1, eachPageArticles = 5 } = ctx.request.body;

  try {
    var result = await Promise.all([
      $Article.getArticlesTagsCount(tag),
      $Article.getArticlesByTag(tag, page, eachPageArticles)
    ]);
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    count: result[0],
    articles: result[1]
  };
});

router.get("/api/getArticlesByTag", async ctx => {
  let code = "1",
    message = "ok";

  const { tag, page = 1, eachPageArticles = 5 } = ctx.request.body;

  try {
    var result = await Promise.all([
      $Article.getArticlesTagsCount(tag),
      $Article.getArticlesByTag(tag, page, eachPageArticles)
    ]);
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    count: result[0],
    articles: result[1]
  };
});
/**
 *   通过分类查找文章
 */
router.post("/api/getArticlesByCatalog", async ctx => {
  let code = "1",
    message = "ok";
  // console.log('-----Catalog_post----------')

  const { catalog, page = 1, eachPageArticles = 5 } = ctx.request.body;

  try {
    var result = await Promise.all([
      $Article.getArticlesCatalogCount(catalog),
      $Article.getArticlesByCatalog(catalog, page, eachPageArticles)
    ]);
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    count: result[0],
    articles: result[1]
  };
});
router.get("/api/getArticlesByCatalog", async ctx => {
  let code = "1",
    message = "ok";
  // console.log('-----Catalog_get----------')

  const { catalog, page = 1, eachPageArticles = 5 } = ctx.request.body;

  try {
    var result = await Promise.all([
      $Article.getArticlesCatalogCount(catalog),
      $Article.getArticlesByCatalog(catalog, page, eachPageArticles)
    ]);
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    count: result[0],
    articles: result[1]
  };
});
/**
 *   通过关键词查找文章
 */
router.post("/api/getArticleBySearch", async ctx => {
  let code = "1",
    message = "ok";
  // console.log('-----search_post----------')
  const { value, page = 1, eachPageArticle = 5 } = ctx.request.body;

  try {
    var result = await Promise.all([
      $Article.getArticlesSearchCount(value),
      $Article.getArticleBySearch(value, page, eachPageArticle)
    ]);
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    count: result[0],
    articles: result[1]
  };
});
router.post("/api/getArticleBySearch/:value", async ctx => {
  let code = "1",
    message = "ok";
  // console.log('-----search_get----------')

  const { page = 1, eachPageArticle = 5 } = ctx.request.body;
  // const page = 1, eachPageArticle = 5;
  const { value } = ctx.params;

  try {
    var result = await Promise.all([
      $Article.getArticlesSearchCount(value),
      $Article.getArticleBySearch(value, page, eachPageArticle)
    ]);
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    count: result[0],
    articles: result[1]
  };
});
/**
 * 文章是否开放评论
 */
router.post("/api/article_toggle_Comments", async ctx => {
  let { articleId, state } = ctx.request.body;

  let code = "1",
    message = "修改成功";

  try {
    await $Article.toggleComments(articleId, state);
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

/**
 * 文章是否公开
 */
router.post("/api/article_toggle_ArticlePublic", async ctx => {
  let { articleId, state } = ctx.request.body;

  let code = "1",
    message = "修改成功";

  try {
    await $Article.toggleArticlePublic(articleId, state);
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

/**
 * 获取浏览量排行前五的文章
 */
router.get("/api/top_preview_article", async ctx => {
  let code = "1",
    message = "获取浏览排行成功",
    result = [],
    resultArr = [];

  try {
    /**
     * 返回排行前5浏览量的文章
     * @type {array}
     * ['${articleId_1}:${title_1}', pv1, ..., '${articleId_n}:${title_n}', pv2]
     */
    result = await redisUtils.getTopPreviewArticle(0, 4);

    //如果redis中数据为空,从mongodb中获取,并将获得的数据添加到redis中
    if (result.length === 0) {
      result = await $Article.getTopPreviewArticle();

      result.forEach(async article => {
        await redisUtils.setTopPreviewArticle(article);
      });

      resultArr = result.slice(0, 4);
    } else {
      let len = result.length,
        cnt = Math.floor(len / 2);
      for (let i = 0; i < cnt; i += 1) {
        let str = result ? result[i * 2] : result,
          articleIdTitle = str ? str.split(":") : str,
          pv = result[i * 2 + 1];

        resultArr[i] = {
          _id: articleIdTitle ? articleIdTitle[0] : "",
          title: articleIdTitle ? articleIdTitle[1] : "",
          pv: pv
        };
      }
    }
  } catch (e) {
    (code = "-1"), (message = e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    result: resultArr
  };
});

router.get("/api/top_comments_article", async ctx => {
  let code = "1",
    message = "获取评论排行",
    result = [],
    resultArr = [];

  try {
    result = await redisUtils.getTopCommentsArticle(0, 4);
    // console.log('redis - topComment - exit', result)

    if (result.length === 0) {
      result = await $Article.getTopCommentsArticle();

      result.forEach(async article => {
        await redisUtils.setTopCommentsArticle(article);
      });

      resultArr = result.slice(0, 4);
    } else {
      let len = result.length,
        cnt = Math.floor(len / 2);
      for (let i = 0; i < cnt; i += 1) {
        let str = result ? result[i * 2] : result,
          articleIdTitle = str ? str.split(":") : str,
          commentCount = result[i * 2 + 1];

        resultArr[i] = {
          _id: articleIdTitle ? articleIdTitle[0] : "",
          title: articleIdTitle ? articleIdTitle[1] : "",
          commentCount: commentCount
        };
      }
    }
  } catch (e) {
    code = "-1";
    message = e.message;
  }

  ctx.response.body = {
    code: code,
    message: message,
    result: resultArr
  };
});
module.exports = router;
