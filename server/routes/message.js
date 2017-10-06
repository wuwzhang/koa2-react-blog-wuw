const mongoose = require('mongoose');
const router = require('koa-router')();
const Models = require('../lib/core');
const $Messages = Models.$Messages;

router.post('/api/post_message', async(ctx, next) => {

  let { email, content } = ctx.request.body;

  let code = '1', message = '发送成功';

  try {
    var result = await $Messages.create({ email, content });
  }catch (e) {
    code = '-1';
    message = e.message
  }

  ctx.response.body = {
    code: code,
    message: message,
    result: result
  }
});

router.post('/api/getNotCheckedMessages', async(ctx, next) => {
  let code = '1', message = '获取消息成功';

  try {
    var result = await $Messages.getMessagesByNotChecked();
  }catch (e) {
    code = '-1';
    message = e.message
  }

  ctx.response.body = {
    code: code,
    message: message,
    result: result
  }
});

router.post('/api/message_admin/getAll/message', async(ctx, next) => {

  let code = '1', message = '获取成功';
  const { page = 1, eachPageArticles = 5 } = ctx.request.body;

  try {
    var result = await Promise.all([$Messages.getAllMessagesCount(),
                                    $Messages.getPageMessages(page, eachPageArticles)]);
  }catch (e) {
    code = '-1';
    message = e.message
  }


  ctx.response.body = {
    'code': code,
    'message': message,
    'messages': result[1],
    'count': result[0]
  }
});

router.post('/api/message_delete/:messageId', async(ctx, next) => {
  let code = '1', message = 'ok';
  const { messageId } = ctx.params;

  try {

    var result = await $Messages.deleteMessageById(messageId)


  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message
  }
});

router.post('/api/message_checked/:messageId', async(ctx, next) => {
  let code = '1', message = 'ok';
  const { messageId } = ctx.params;

  try {
    var result = $Messages.setMessageChecked(messageId);
  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message
  }
});

module.exports = router;
