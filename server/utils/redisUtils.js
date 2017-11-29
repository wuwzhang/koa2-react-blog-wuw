const Redis = require('ioredis');
const utils = require('./utils');
const config = require('config-lite')(__dirname).redis;

const USER_KEY = 'users';
const ARTICLE_PREVIEW_KEY = 'articlesPreview';

var client = null;

function start() {
  client = new Redis({
    port: config.port,
    host: config.host,
    family: config.family,
    db: config.db
  })

  client.on('error', async (err, res) => {
    console.log('连接redis错误', err);
  })
  client.on('connect', async () => {
    console.log('连接redis成功');
  })
}

async function addUser(params) {
  if (utils.isEmpty(params, params.userId)) {
    return console.error('redis - addUser 参数错误')
  }

  await client.hset('user', params.userId, JSON.stringifyI(params))
}

async function getUser(params) {
  if (utils.isEmpty(userId)) {
    return console.error('redis - getUser 参数错误')
  }

  let user = await client.hget(USER_KEY, userId);

  if (user === null) {
    return null;
  }

  return JSON.parse(user);
}

module.exports = {
  start,
  addUser,
  getUser
}
