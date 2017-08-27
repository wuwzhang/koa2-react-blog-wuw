const router = require('koa-router')();
const Models = require('../lib/core');
const $Comments = Models.$Comments;
const $User = Models.$User;

router.post('/api/article_details/:articleId/comment', async(ctx, next) => {

  let { articleId, content } = ctx.request.body;

  let code = '1', message = '发表成功';

  let commentModel = null;
  if (ctx.params.articleId === articleId) {
    commentModel = {
      userId: ctx.session.user._id || ctx.request.body.userId,
      articleId: articleId,
      content: content
    };
  }

  try {
    var result = await $Comments.create(commentModel);
    var user = await $User.getUserById(commentModel.userId);
  }catch (e) {
    code = '-1';
    message = e.message
  }

  ctx.response.body = {
    code: code,
    message: message,
    comment: {
      user: user,
      result
    }
  }
});

router.post('/api/article_details/:articleId/get/comment', async(ctx, next) => {

  let { articleId } = ctx.params;

  let code = '1', message = '发表成功';

  try {
    var result = await $Comments.getCommentsByArticleId(articleId);
  }catch (e) {
    code = '-1';
    message = e.message
  }

  let comments = result.map((comment, index) => (
    {
      user: comment.userId,
      articleId: comment.articleId,
      content: comment.content,
      create_at: comment.created_at
    }
  ));

  ctx.response.body = {
    code: code,
    message: message,
    comments: comments
  }
});

module.exports = router;
