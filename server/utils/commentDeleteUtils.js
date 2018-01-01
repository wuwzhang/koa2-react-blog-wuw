const Models = require("../lib/core");
const $Article = Models.$Article;
const $Comments = Models.$Comments;
const redisUtils = require("./redisUtils");
/**
 * 删除评论, 单挑
 */
async function deleteComment(articleId, commentId, articleTitle) {
  await $Article
    .deleteComment(articleId, commentId)
    .then(async (res, err) => {
      if (res.ok === 1 && res.nModified === 1) {
        return Promise.all([
          $Comments.deleteCommentById(commentId),
          redisUtils.delReportedComment({ _id: commentId, parentId: "-1" })
        ]);
      } else {
        throw new Error(err);
      }
    })
    .then(async (res, err) => {
      let replies = res[0].replies;
      if (err) {
        throw new Error(err);
      }
      if (replies.length === 0) {
        return res;
      } else {
        try {
          return replies.forEach(async reply => {
            await Promise.all([
              redisUtils.cancelSubComment(reply),
              redisUtils.delReportedComment({
                _id: reply._id,
                parentId: commentId
              })
            ]);
          });
        } catch (e) {
          throw new Error(e);
        }
      }
    })
    .then(async (res, err) => {
      if (err) {
        throw new Error(err);
      }
      return await redisUtils.delThumbs(commentId);
    })
    .then(async (res, err) => {
      if (err) {
        throw new Error(err);
      }

      try {
        return await Promise.all([
          redisUtils.setCommentCount(articleId, articleTitle, -1),
          redisUtils.delNotCheckedComment({ _id: commentId })
        ]);
      } catch (e) {
        throw new Error(e);
      }
    });
}

/**
 * 删除评论, 练级通过删除文章删除评论
 */
async function commentDelete(articleId, comments) {
  comments.map(async comment => {
    await $Comments
      .deleteCommentById(comment)
      .then(async (res, err) => {
        let replies = res.replies;
        if (err) {
          throw new Error(err);
        }
        if (replies.length === 0) {
          return res;
        } else {
          try {
            return replies.forEach(async reply => {
              await redisUtils.cancelSubComment(reply);
            });
          } catch (e) {
            throw new Error(e);
          }
        }
      })
      .then(async (res, err) => {
        if (err) {
          throw new Error(err);
        }
        return await Promise.all([
          redisUtils.delThumbs(comment),
          redisUtils.delNotCheckedComment({ _id: comment })
        ]);
      });
  });
}

module.exports = {
  deleteComment,
  commentDelete
};
