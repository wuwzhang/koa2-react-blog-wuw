const Redis = require("ioredis");
const utils = require("./utils");
const config = require("config-lite")(__dirname).redis;

const USER_KEY = "users";
const ARTICLE_KEY = "articles";
const COMMENT_KEY = "comments";

var client = null;

function start() {
  client = new Redis({
    port: config.port,
    host: config.host,
    family: config.family,
    password: config.auth,
    db: config.db
  });

  client.on("error", async err => {
    console.error("连接redis错误", err);
  });
  client.on("connect", async () => {
    console.error("连接redis成功");
  });
}

async function setCreateTmpUser(params) {
  if (
    utils.isEmpty(
      params,
      params.username,
      params.account,
      params.activeKey,
      params.password,
      params.avatar
    )
  ) {
    console.error("redis - setCreateTmpUser 参数错误");
  } else {
    let { activeKey } = params;

    let keys = "create_user" + ":" + activeKey;
    return await client.set(keys, JSON.stringify(params), "EX", 5 * 60);
  }
}

async function getCreateTmpUser(activeKey) {
  if (utils.isEmpty(activeKey)) {
    console.error("redis - getCreateTmpUser 参数错误");
  } else {
    let keys = "create_user" + ":" + activeKey;

    let user = await client.get(keys);

    if (user === null) {
      return null;
    }

    return JSON.parse(user);
  }
}

async function delCreateTmpUser(activeKey) {
  if (utils.isEmpty(activeKey)) {
    console.error("redis - delCreateTmpUser 参数错误");
  } else {
    let keys = "create_user" + ":" + activeKey;
    return await client.del(keys, activeKey);
  }
}

async function createForgetUser(account, activeKey) {
  if (utils.isEmpty(account, activeKey)) {
    console.error("redis - createForgetUser 参数错误");
  } else {
    let keys = "create_forget_user" + ":" + activeKey;
    return await client.set(keys, account, "EX", 5 * 60);
  }
}

async function getForgetUser(activeKey) {
  if (utils.isEmpty(activeKey)) {
    console.error("redis - getForgetUser 参数错误");
  } else {
    let keys = "create_forget_user" + ":" + activeKey;
    let user = await client.get(keys);

    if (user === null) {
      return null;
    }

    return user;
  }
}

async function delForgetUser(activeKey) {
  if (utils.isEmpty(activeKey)) {
    console.error("redis - delForgetUser 参数错误");
  } else {
    let keys = "create_forget_user" + ":" + activeKey;
    return await client.del(keys, activeKey);
  }
}

/**
 * 向redis中添加用户信息
 * @param {object} params { user }
 */
async function addUser(params) {
  if (utils.isEmpty(params, params._id)) {
    return console.error("redis - addUser 参数错误");
  }

  let keys = USER_KEY + ":" + params._id;

  return await client.set(keys, JSON.stringify(params), "EX", 60 * 60);
}

/**
 * 通过userId获取用户
 * @param  {ObjectId} _id 用户Id
 * @return {object}     存在返回user的json格式，不存在返回null
 */
async function getUser(_id) {
  if (utils.isEmpty(_id)) {
    return console.error("redis - getUser 参数错误");
  }

  let keys = USER_KEY + ":" + _id;

  let user = await client.get(keys);

  if (user === null) {
    return null;
  }

  return JSON.parse(user);
}

async function delUser(_id) {
  if (utils.isEmpty(_id)) {
    return console.error("redis - delUser 参数错误");
  }

  let keys = USER_KEY + ":" + _id;
  return await client.del(keys);
}

/**
 * 每篇文章的评论的用户Id
 * @param {object} params { commentId, userId }
 */
async function thumbsUpById(params) {
  if (utils.isEmpty(params, params.commentId, params.userId)) {
    console.error("redis - addComment 参数错误");
  }

  let keys = COMMENT_KEY + "_likes:" + params.commentId,
    userId = params.userId;

  let res = await client.sismember(keys, userId);

  if (res === 1) {
    await client.srem(keys, userId);
    return -1;
  } else {
    await client.sadd(keys, userId);
    return 1;
  }
}

async function thumbsDownById(params) {
  if (utils.isEmpty(params, params.commentId, params.userId)) {
    console.error("redis - addComment 参数错误");
  }

  let keys = COMMENT_KEY + "_dislikes:" + params.commentId,
    userId = params.userId;

  let res = await client.sismember(keys, userId);

  if (res === 1) {
    await client.srem(keys, userId);
    return -1;
  } else {
    await client.sadd(keys, userId);
    return 1;
  }
}

async function delThumbs(commentId) {
  if (utils.isEmpty(commentId)) {
    console.error("redis - delThumbs 参数错误");
  }

  let key1 = COMMENT_KEY + "_likes:" + commentId,
    key2 = COMMENT_KEY + "_dislikes:" + commentId;

  return await Promise.all([client.del(key1), client.del(key2)]).then(res => {
    return res;
  });
}

async function getThumbs(commentId) {
  if (utils.isEmpty(commentId)) {
    console.error("redis - getThumbs 参数错误");
  }

  let keyLikes = COMMENT_KEY + "_likes:" + commentId,
    keyDislikes = COMMENT_KEY + "_dislikes:" + commentId,
    result = {};

  result = await Promise.all([
    client.smembers(keyLikes),
    client.smembers(keyDislikes)
  ]).then(res => {
    return res;
  });

  return result;
}

/**
 * 举报一级级评论
 * $ sadd
 * @key comment_report:${commentId}
 * @valur ${userId}
 */
async function reportCommentById(commentId, userId) {
  if (utils.isEmpty(commentId, userId)) {
    console.error("redis - reportCommentById 参数错误");
  } else {
    let keys = COMMENT_KEY + "_report:" + commentId;

    return await client.sadd(keys, userId);
  }
}

async function cancleCommentById(commentId) {
  if (utils.isEmpty(commentId)) {
    console.error("redis - cancelCommentById 参数错误");
  } else {
    let keys = COMMENT_KEY + "_report:" + commentId;

    return await client.del(keys);
  }
}

/**
 * 举报二级级评论
 * $ sadd
 * @key sub_comment_report:${parentId}:${commentId}
 * @valur ${userId}
 */
async function reportSubCommentById(params) {
  if (utils.isEmpty(params, params.userId, params.commentId, params.parentId)) {
    console.error("redis - reportSubCommentById 参数错误");
  }

  let { userId, parentId, commentId } = params,
    keys = "sub_" + COMMENT_KEY + "_report:" + parentId + ":" + commentId;

  return await client.sadd(keys, userId);
}

async function deleteSubComment(parentId, commentId) {
  if (utils.isEmpty(parentId, commentId)) {
    console.error("redis - deleteSubComment 参数错误");
  } else {
    let keys = "sub_" + COMMENT_KEY + "_report:" + parentId + ":" + commentId;

    await client.del(keys);
  }
}

/**
 * 查询浏览量默认前5的文章
 */
async function getTopPreviewArticle(start = 1, end = 5) {
  let keys = "preview:" + ARTICLE_KEY;

  return await client.zrevrange(keys, start, end, "WITHSCORES");
}

/**
 * 添加文章浏览量
 */
async function setTopPreviewArticle(params) {
  if (utils.isEmpty(params, params._id, params.title, params.pv)) {
    console.error("redis - setTopPreviewArticle 参数错误");
  } else {
    let keys = "preview:" + ARTICLE_KEY,
      { _id, title, pv } = params,
      value = _id + ":" + title;

    await client.zadd(keys, pv, value);
  }
}

async function delTopPreviewArticle(params) {
  if (utils.isEmpty(params, params._id, params.title)) {
    console.error("redis - delTopPreviewArticle 参数错误");
  } else {
    let keys = "preview:" + ARTICLE_KEY,
      { _id, title } = params,
      value = _id + ":" + title;

    await client.zrem(keys, value);
  }
}

/**
 * 添加文章浏览
 */
async function incPv(params) {
  if (utils.isEmpty(params, params.articleId, params.title)) {
    console.error("redis - incPv 参数错误");
  }

  let keys = "preview:" + ARTICLE_KEY,
    { articleId, title } = params,
    value = articleId + ":" + title;

  await client.zincrby(keys, 1, value);
}

async function getArticleCatalogs() {
  let keys = "catalog_count_" + ARTICLE_KEY;

  return client.zrevrange(keys, 0, -1, "WITHSCORES");
}

async function setArticleCatalogs(catalog, count) {
  if (utils.isEmpty(catalog, count)) {
    console.error("redis - setArticleCatalogs 参数错误");
  } else {
    let keys = "catalog_count_" + ARTICLE_KEY;
    return client.zincrby(keys, count, catalog);
  }
}

async function delArticleCatalogs(catalogs) {
  if (utils.isEmpty(catalogs)) {
    console.error("redis - delArticleCatalogs 参数错误");
  } else {
    let keys = "catalog_count_" + ARTICLE_KEY;

    catalogs.map(async catalog => {
      await client
        .zscore(keys, catalog)
        .then(async res => {
          if (res >= 1) {
            await client.zrem(keys, catalog);
          } else {
            await client.zincrby(keys, 1, catalog);
          }
        })
        .catch(e => e);
    });
  }
}

/**
 * 查询文章评论量默认前5的文章
 */
async function getTopCommentsArticle(start = 1, end = 5) {
  let keys = "comments:" + ARTICLE_KEY;

  return await client.zrevrange(keys, start, end, "WITHSCORES");
}

async function setTopCommentsArticle(params) {
  if (utils.isEmpty(params, params._id, params.title, params.commentCount)) {
    console.error("redis - setTopCommentsArticle 参数错误");
  } else {
    let keys = "comments:" + ARTICLE_KEY,
      { _id, title, commentCount } = params,
      value = _id + ":" + title;

    await client.zadd(keys, commentCount, value);
  }
}

async function delTopCommentsArticle(params) {
  if (utils.isEmpty(params, params._id, params.title)) {
    console.error("redis - delTopCommentsArticle 参数错误");
  } else {
    let keys = "comments:" + ARTICLE_KEY,
      { _id, title } = params,
      value = _id + ":" + title;
    await client.zrem(keys, value);
  }
}

async function setCommentCount(articleId, title, num) {
  if (utils.isEmpty(articleId, title, num)) {
    console.error("redis - incComment 参数错误");
  } else {
    let keys = "comments:" + ARTICLE_KEY,
      value = articleId + ":" + title;

    await client.zincrby(keys, num, value);
  }
}

async function delCommentCount(articleId, title, num) {
  if (utils.isEmpty(articleId, title, num)) {
    console.error("redis - incComment 参数错误");
  } else {
    let keys = "comments:" + ARTICLE_KEY,
      value = articleId + ":" + title;

    await client.zincrby(keys, num, value);
  }
}

async function addNotCheckedComment(params) {
  if (utils.isEmpty(params, params._id)) {
    console.error("redis - addNotCheckedComment 参数错误");
  } else {
    let keys = "not_checked_comments",
      value = JSON.stringify(params);

    await client.sadd(keys, value);
  }
}

async function delNotCheckedComment(params) {
  if (utils.isEmpty(params, params._id)) {
    console.error("redis - delNotCheckedComment 参数错误");
  } else {
    let keys = "not_checked_comments",
      value = JSON.stringify(params);

    await client.srem(keys, value);
  }
}

async function getNotCheckedComment() {
  let keys = "not_checked_comments";
  let exit = await client.exists(keys);
  if (exit === 0) {
    return "-1";
  } else {
    return await client.scard(keys);
  }
}

async function addNotCheckedMessage(params) {
  if (utils.isEmpty(params, params._id)) {
    console.error("redis - addNotCheckedMessage 参数错误");
  } else {
    let keys = "not_checked_messages",
      value = JSON.stringify(params);

    await client.sadd(keys, value);
  }
}

async function delNotCheckedMessage(params) {
  if (utils.isEmpty(params, params._id)) {
    console.error("redis - delNotCheckedMessage 参数错误");
  } else {
    let keys = "not_checked_messages",
      value = JSON.stringify(params);

    await client.srem(keys, value);
  }
}

async function getNotCheckedMessage() {
  let keys = "not_checked_messages";
  let exit = await client.exists(keys);
  if (exit === 0) {
    return "-1";
  } else {
    return await client.scard(keys);
  }
}

async function addReportedComment(params) {
  if (utils.isEmpty(params, params._id, params.parentId)) {
    console.error("redis - addReportedComment 参数错误");
  } else {
    let keys = "reported_comments",
      value = JSON.stringify({ _id: params._id, parentId: params.parentId });

    await client.sadd(keys, value);
  }
}

async function delReportedComment(params) {
  if (utils.isEmpty(params, params._id, params.parentId)) {
    console.error("redis - delReportedComment 参数错误");
  } else {
    let keys = "reported_comments",
      value = JSON.stringify({ _id: params._id, parentId: params.parentId });

    await client.srem(keys, value);
  }
}

async function getReportedComment() {
  let keys = "reported_comments";
  await client.scard(keys);
}

module.exports = {
  start,
  setCreateTmpUser,
  getCreateTmpUser,
  delCreateTmpUser,
  createForgetUser,
  getForgetUser,
  delForgetUser,
  addUser,
  getUser,
  delUser,
  thumbsUpById,
  thumbsDownById,
  getThumbs,
  delThumbs,
  getTopPreviewArticle,
  setTopPreviewArticle,
  delTopPreviewArticle,
  incPv,
  getTopCommentsArticle,
  setTopCommentsArticle,
  delTopCommentsArticle,
  setCommentCount,
  delCommentCount,
  getArticleCatalogs,
  setArticleCatalogs,
  delArticleCatalogs,
  reportCommentById,
  reportSubCommentById,
  cancleCommentById,
  deleteSubComment,
  addNotCheckedComment,
  delNotCheckedComment,
  getNotCheckedComment,
  addNotCheckedMessage,
  delNotCheckedMessage,
  getNotCheckedMessage,
  addReportedComment,
  delReportedComment,
  getReportedComment
};
