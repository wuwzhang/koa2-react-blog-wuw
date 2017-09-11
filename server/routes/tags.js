const router = require('koa-router')();
const Models = require('../lib/core');
const $Tag = Models.$Tag;

/**
 * 获取count数量的标签
 */
router.post('/api/getTags', async(ctx, next) => {
  let code = '1', message = 'ok';

  const { count } = ctx.request.body;

  try {
    var result = await $Tag.getTags(count);
  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'tags': result
  }
});

/**
 * 获取所有标签
 */
router.get('/api/getAllTags', async(ctx, next) => {
  let code = '1', message = 'ok';

  try {
    var result = await $Tag.getAllTags();
  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'tags': result
  }
});

module.exports = router;
