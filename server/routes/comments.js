const mongoose = require('mongoose');
const router = require('koa-router')();
const Models = require('../lib/core');
const $Article = Models.$Article;
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
      content: content,
      isChecked: false,
      _id: new mongoose.Types.ObjectId()
    };
  }

  try {
    var result = await Promise.all([$Comments.create(commentModel),
                                    $Article.incComment(commentModel.articleId),
                                    $User.getUserById(commentModel.userId)])
  }catch (e) {
    code = '-1';
    message = e.message
  }

  // console.log(result[0])

  ctx.response.body = {
    code: code,
    message: message,
    comment: {
      user: result[2],
      id: commentModel._id,
      content: content,
      create_at: result[0].created_at
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
      id: comment._id,
      content: comment.content,
      create_at: comment.created_at
    }
  ));


  ctx.response.body = {
    'code': code,
    'message': message,
    'comments': comments
  }
});

router.post('/api/comment_admin/getAll/comment', async(ctx, next) => {

  let code = '1', message = '发表成功';

  try {
    var result = await $Comments.getAllComment();
  }catch (e) {
    code = '-1';
    message = e.message
  }

  let comments = result.map((comment, index) => (
    {
      user: comment.userId,
      id: comment._id,
      articleId: comment.articleId._id,
      articleTitle: comment.articleId.title,
      isChecked: comment.isChecked,
      content: comment.content,
      create_at: comment.created_at
    }
  ));


  ctx.response.body = {
    'code': code,
    'message': message,
    'comments': comments
  }
});

/**
 * [ { _id: 59d4931dbb3ac62ccf20c8a1,
    userId: 59b7ffcbb0936c6910fe48f3,
    articleId:
     { _id: 59d4906268c5ba2ae8d075ff,
       title: '搜索',
       content: '是是是',
       catalog: '其他',
       pv: 7,
       commentCount: 1,
       isComment: true,
       isPublic: true,
       updated_at: '2017-10-04T15:40:18+08:00',
       created_at: '2017-10-04T15:40:18+08:00',
       tags: [Array],
       id: '59d4906268c5ba2ae8d075ff' },
    content: '多大',
    __v: 0,
    isChecked: false,
    created_at: 2017-10-04T07:51:57.981Z } ]
 */
router.post('/api/getNotCheckedComments', async(ctx, next) => {
  let code = '1', message = '获取评论成功';

  try {
    var result = await $Comments.getCommentsByNotChecked();

    var comments = result.map((comment, index) => (
      {
        user: comment.userId,
        id: comment._id,
        articleId: comment.articleId._id,
        articleTitle: comment.articleId.title,
        isChecked: comment.isChecked,
        content: comment.content,
        create_at: comment.created_at
      }
    ));
  }catch (e) {
    code = '-1';
    message = e.message
  }

  ctx.response.body = {
    code: code,
    message: message,
    comments: comments
  }
});

router.post('/api/comment_delete/:commentId', async(ctx, next) => {
  let code = '1', message = 'ok';
  const { commentId } = ctx.params;
  let { articleId } = ctx.request.body;

  try {

    var result = await Promise.all([
                                    $Comments.deleteCommentById(commentId),
                                    $Article.redComment(articleId)
                                  ]);


  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message
  }
});

router.post('/api/comment_checked/:commentId', async(ctx, next) => {
  let code = '1', message = 'ok';
  const { commentId } = ctx.params;

  try {
    var result = $Comments.setCommentChecked(commentId);
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
