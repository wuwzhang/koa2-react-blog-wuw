const mongoose = require('mongoose');
const router = require('koa-router')();
const Models = require('../lib/core');
const $Article = Models.$Article;
const $Comments = Models.$Comments;
const $User = Models.$User;

/**
 * 文章添加一级评论
 */
router.post('/api/article_details/:articleId/comment', async(ctx, next) => {

  let { articleId, content } = ctx.request.body;

  let code = '1', message = '发表成功';

  var commentModel = null;

  if (ctx.params.articleId === articleId) {
    commentModel = {
      userId: ctx.request.body.userId,
      articleId: articleId,
      content: content,
      _id: new mongoose.Types.ObjectId()
    };
  }

  try {
    var result = await Promise.all([$Comments.create(commentModel),
                                    $Article.addComment(commentModel.articleId, commentModel._id),
                                    $User.getUserById(commentModel.userId)])
  } catch (e) {
    code = '-1';
    message = e.message
  }

  let userResult = result[2],
      user = {
        _id: userResult._id,
        username: userResult.username,
        avatar: userResult.avatar
      }

  ctx.response.body = {
    code: code,
    message: message,
    comment: {
      user: user,
      id: commentModel._id,
      created_at: result[0].created_at,
      thumbsDown: 0,
      thumbsUp: 0,
      isRePort: false,
      replies: [],
      content: content
    }
  }
});

/**
 * 获取文章的评论
 */
router.post('/api/article_details/:articleId/get_comment', async(ctx, next) => {

  let { articleId } = ctx.params,
      { page = 1, range = 4 } = ctx.request.body;

  let code = '1', message = '发表成功';

  try {
    var result = await $Comments.getCommentsByArticleId(articleId, page, range);
  } catch (e) {
    code = '-1';
    message = e.message;
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'comments': result
  }
});

/**
 * 添加二级评论
 */
router.post('/api/addSubComment', async(ctx, next) => {
  let code = '1', message = '写入子评论';
  const {
    parentId,
    userId,
    content
  } = ctx.request.body;

  try {
    var date = new Date,
        data = {
          userId: userId,
          content: content,
          created_at: date
        };

    if (parentId && userId) {
      await $Comments.addSubComment(parentId, data);
    } else {
      code = '-1',
      message = '数据缺失'
    }

  } catch(e) {
    code = '-2';
    message = e.message;
  }

  ctx.response.body = {
    'code': code,
    'message': message,
    'created_at': date
  }
})

/**
 * 获取所有评论
 */
router.post('/api/comment_admin/getAll/comment', async(ctx, next) => {

  let code = '1', message = '获取成功';
  const { page = 1, eachPageArticles = 5 } = ctx.request.body;

  try {
    var result = await Promise.all([$Comments.getAllCommentsCount(),
                                    $Comments.getPageComments(page, eachPageArticles)]);
  } catch(e) {
    code = '-1';
    message = e.message
  }

  let thisComments = result[1];

  let comments = thisComments.map((comment, index) => (
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
    'comments': comments,
    'count': result[0]
  }
});

/**
 * 获取未确认的评论
 */
router.post('/api/getNotCheckedComments', async(ctx, next) => {
  let code = '1', message = '获取评论成功';

  try {
    var result = await $Comments.getCommentsByNotChecked();
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

/**
 * 通过文章Id删除评论
 */
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

/**
 * 通过评论Id确认评论
 */
router.post('/api/comment_checked/:commentId', async(ctx, next) => {
  let code = '1', message = 'ok';
  const { commentId } = ctx.params;

  try {
    await $Comments.setCommentChecked(commentId);
  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message
  }
});

/*
 * 以及评论点赞
 */

router.post('/api/comment/:commentId/thumbsUp', async(ctx, next) => {
  let code = '1', message = '一级评论点赞成功';
  const { commentId } = ctx.params;
  let { userId } = ctx.request.body;

  try {
    let res = await $Comments.thumbsUpById(commentId, userId);
    console.log(res);
  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message
  }
})

router.post('/api/comment/:commentId/thumbsDown', async(ctx, next) => {
  let code = '1', message = '一级评论点赞成功';
  const { commentId } = ctx.params;
  let { userId } = ctx.request.body;

  try {
    await $Comments.thumbsDownById(commentId, userId);
  } catch (e) {
    code = '-1',
    message = e.message
  }

  ctx.response.body = {
    'code': code,
    'message': message
  }
})
module.exports = router;
