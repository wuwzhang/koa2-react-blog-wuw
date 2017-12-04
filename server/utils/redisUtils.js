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
  }

  let { activeKey } = params;

  let keys = "create_user" + ":" + activeKey;
  return await client.set(keys, JSON.stringify(params), "EX", 5 * 60);
}

async function getCreateTmpUser(activeKey) {
  if (utils.isEmpty(activeKey)) {
    console.error("redis - getCreateTmpUser 参数错误");
  }

  let keys = "create_user" + ":" + activeKey;

  let user = await client.get(keys);

  if (user === null) {
    return null;
  }

  return JSON.parse(user);
}

async function delCreateTmpUser(activeKey) {
  if (utils.isEmpty(activeKey)) {
    console.error("redis - delCreateTmpUser 参数错误");
  }

  let keys = "create_user" + ":" + activeKey;
  return await client.del(keys, activeKey);
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
    return console.log("redis - delUser 参数错误");
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
    console.log("redis - reportCommentById 参数错误");
  }

  let keys = COMMENT_KEY + "_report:" + commentId;

  return await client.sadd(keys, userId);
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
  }

  let keys = "preview:" + ARTICLE_KEY,
    { _id, title, pv } = params,
    value = _id + ":" + title;

  await client.zadd(keys, pv, value);
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
  }

  let keys = "comments:" + ARTICLE_KEY,
    { _id, title, commentCount } = params,
    value = _id + ":" + title;

  await client.zadd(keys, commentCount, value);
}

async function setCommentCount(params) {
  if (utils.isEmpty(params, params.articleId, params.title, params.num)) {
    console.error("redis - incComment 参数错误");
  }

  let keys = "comments:" + ARTICLE_KEY,
    { articleId, title, num } = params,
    value = articleId + ":" + title;

  await client.zincrby(keys, num, value);
}

module.exports = {
  start,
  setCreateTmpUser,
  getCreateTmpUser,
  delCreateTmpUser,
  addUser,
  getUser,
  delUser,
  thumbsUpById,
  thumbsDownById,
  getThumbs,
  getTopPreviewArticle,
  setTopPreviewArticle,
  incPv,
  getTopCommentsArticle,
  setTopCommentsArticle,
  setCommentCount,
  reportCommentById,
  reportSubCommentById
};
