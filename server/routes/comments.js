const mongoose = require("mongoose");
const router = require("koa-router")();
const Models = require("../lib/core");
const $Article = Models.$Article;
const $Comments = Models.$Comments;
const $User = Models.$User;
const redisUtils = require("../utils/redisUtils");

/**
 * 文章添加一级评论
 */
router.post("/api/article_details/:articleId/comment", async ctx => {
  let { article, content } = ctx.request.body,
    articleId = article._id,
    articleTitle = article.title;

  let code = "1",
    message = "发表成功";

  var commentModel = null;

  commentModel = {
    userId: ctx.request.body.userId,
    articleId: articleId,
    content: content,
    _id: new mongoose.Types.ObjectId()
  };

  try {
    /**
     * 向mongodb中插入数据
     * 在comment表中插入数据
     * 在_id为aritleId的文章中添加commentId
     * 通过userId获取用户信息
     */
    var result = await Promise.all([
      $Comments.create(commentModel),
      $Article.addComment(articleId, commentModel._id),
      $User.getUserById(commentModel.userId)
    ]).then(async (res, err) => {
      if (err) {
        throw new Error(err);
      }

      try {
        await redisUtils.setCommentCount(articleId, articleTitle, 1);

        let userResult = res[2],
          user = {
            _id: userResult._id,
            username: userResult.username,
            avatar: userResult.avatar
          };
        return {
          user: user,
          _id: commentModel._id,
          created_at: res[0].created_at,
          thumbsDown: 0,
          thumbsUp: 0,
          isRePort: false,
          replies: [],
          content: content
        };
      } catch (e) {
        throw new Error(e);
      }
    });
  } catch (e) {
    code = "-1";
    message = e.message;
  }

  ctx.response.body = {
    code: code,
    message: message,
    comment: result
  };
});

/**
 * 获取文章的评论
 */
router.post("/api/article_details/:articleId/get_comment", async ctx => {
  let { articleId } = ctx.params,
    { page = 1, range = 4 } = ctx.request.body;

  let code = "1",
    message = "发表成功";

  try {
    var result = await $Comments.getCommentsByArticleId(articleId, page, range),
      ans;
    console.log(result);
    async function getComment(result) {
      let comments = [];
      for (let comment of result) {
        // console.log(comment.replies);
        let user = comment.user ? comment.user[0] : comment.user,
          commentId = comment._id,
          ans = await redisUtils.getThumbs(commentId);
        comments.push({
          ...comment,
          user: user,
          likes: ans[0],
          dislikes: ans[1]
        });
      }

      return comments;
    }

    ans = await getComment(result);
  } catch (e) {
    code = "-1";
    message = e.message;
  }

  ctx.response.body = {
    code: code,
    message: message,
    comments: ans
  };
});

/**
 * 添加二级评论
 */
router.post("/api/addSubComment", async ctx => {
  let code = "1",
    message = "写入子评论";
  const { parentId, userId, content } = ctx.request.body;

  try {
    var date = new Date(),
      data = {
        userId: userId,
        content: content,
        created_at: date
      };

    if (parentId && userId) {
      await $Comments.addSubComment(parentId, data);
    } else {
      (code = "-1"), (message = "数据缺失");
    }
  } catch (e) {
    code = "-2";
    message = e.message;
  }

  ctx.response.body = {
    code: code,
    message: message,
    created_at: date
  };
});

/**
 * 添加二级评论
 */
router.post("/api/deleteSubComment", async ctx => {
  let code = "1",
    message = "删除子评论";
  const { commentId, subCommentId } = ctx.request.body;
  console.log("route - parentId", commentId);
  try {
    await $Comments
      .deleteSubComment(subCommentId, commentId)
      .then(async res => {
        console.log("res", res);
        if (res.ok && res.n > 0) {
          return await redisUtils.deleteSubComment(subCommentId, commentId);
        } else {
          throw new Error("mongodb - deleteSubComment error");
        }
      });
  } catch (e) {
    code = "-2";
    message = e.message;
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

router.post("/api/chancelSubComment", async ctx => {
  let code = "1",
    message = "删除子评论";
  const { commentId, subCommentId } = ctx.request.body;
  console.log("route - parentId", commentId);
  try {
    await $Comments
      .cancelSubComment(subCommentId, commentId)
      .then(async res => {
        console.log("res", res);
        if (res.ok && res.n > 0) {
          return await redisUtils.deleteSubComment(subCommentId, commentId);
        } else {
          throw new Error("mongodb - deleteSubComment error");
        }
      });
  } catch (e) {
    code = "-2";
    message = e.message;
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

/**
 * 获取所有评论
 */
router.post("/api/comment_admin/getAll/comment", async ctx => {
  let code = "1",
    message = "获取成功",
    comments = [];

  const { page = 1, eachPageArticles = 5 } = ctx.request.body;

  try {
    var result = await Promise.all([
      $Comments.getAllCommentsCount(),
      $Comments.getPageComments(page, eachPageArticles)
    ]);
  } catch (e) {
    code = "-1";
    message = e.message;
  }

  comments = result[1].map(comment => {
    let {
      _id,
      userId,
      articleId,
      thumbsUp,
      thumbsDown,
      content,
      isRePort,
      isChecked,
      created_at,
      replies
    } = comment;
    return {
      id: _id,
      user: userId,
      article: {
        _id: articleId._id,
        title: articleId.title
      },
      thumbsUp,
      thumbsDown,
      content,
      isRePort,
      isChecked,
      created_at,
      replies
    };
  });

  ctx.response.body = {
    code: code,
    message: message,
    comments: comments,
    count: result[0]
  };
});

/**
 * 获取未确认的评论
 */
router.post("/api/getNotCheckedComments", async ctx => {
  let code = "1",
    message = "获取评论成功";

  try {
    var result = await $Comments.getCommentsByNotChecked();
  } catch (e) {
    code = "-1";
    message = e.message;
    throw new Error(e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    result: result
  };
});

/**
 * 通过文章Id删除评论
 */
router.post("/api/comment_delete/:commentId", async ctx => {
  let code = "1",
    message = "ok";
  const { commentId } = ctx.params;
  let { article } = ctx.request.body,
    articleId = article._id,
    articleTitle = article.title;

  console.log("route articleId", articleId, "commentId", commentId);

  try {
    await $Article
      .deleteComment(articleId, commentId)
      .then(async (res, err) => {
        console.log("Article.deleteComment", res);
        if (res.ok === 1 && res.nModified === 1) {
          return $Comments.deleteCommentById(commentId);
        } else {
          throw new Error(err);
        }
      })
      .then(async (res, err) => {
        console.log("Comments.deleteCommentById", res);
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
        return await redisUtils.delThumbs(commentId);
      })
      .then(async (res, err) => {
        if (err) {
          throw new Error(err);
        }

        try {
          return await redisUtils.setCommentCount(articleId, articleTitle, -1);
        } catch (e) {
          throw new Error(e);
        }
      });
  } catch (e) {
    (code = "-1"), (message = e.message);
    throw new Error(e.message);
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

router.post("/api/comment_cancel", async ctx => {
  let code = "1",
    message = "ok";

  let { commentId } = ctx.request.body;

  try {
    await $Comments.cancelComment(commentId).then(async (res, error) => {
      if (res.n === 1 && res.ok === 1) {
        return await redisUtils.cancleCommentById(commentId);
      } else {
        throw new Error(error);
      }
    });
  } catch (e) {
    (code = "-1"), (message = e.message);
    throw new Error(e.message);
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

/**
 * 通过评论Id确认评论
 */
router.post("/api/comment_checked/:commentId", async ctx => {
  let code = "1",
    message = "ok";
  const { commentId } = ctx.params;

  try {
    await $Comments.setCommentChecked(commentId);
  } catch (e) {
    (code = "-1"), (message = e.message);
    throw new Error(e.message);
  }

  ctx.response.body = {
    code: code,
    message: message
  };
});

/*
 * 一级评论点赞
 */
router.post("/api/comment/:commentId/thumbsUp", async ctx => {
  let code = "1",
    message = "一级评论点赞成功";
  const { commentId } = ctx.params;
  let { userId } = ctx.request.body;

  /**
   * 通过sadd方法添加userId
   * @key comments:${commentId}
   * @value userId
   */
  try {
    var result = await redisUtils
      .thumbsUpById({ commentId, userId })
      .then(async res => {
        if (res === -1) {
          try {
            await $Comments.thumbsUp(commentId, -1);
          } catch (e) {
            code = "-1";
            message = e.message;
          }

          return -1;
        } else {
          try {
            await $Comments.thumbsUp(commentId, 1);
          } catch (e) {
            code = "-2";
            message = e.message;
          }
          return 1;
        }
      });
  } catch (e) {
    code = "-3";
    message = e.message;
    throw new Error(e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    thumbsUp: result
  };
});

/*
 * 一级评论踩
 */
router.post("/api/comment/:commentId/thumbsDown", async ctx => {
  let code = "1",
    message = "一级评论踩成功";
  const { commentId } = ctx.params;
  let { userId } = ctx.request.body;

  try {
    var result = await redisUtils
      .thumbsDownById({ commentId, userId })
      .then(async res => {
        if (res === -1) {
          try {
            await $Comments.thumbsDown(commentId, -1);
          } catch (e) {
            code = "-1";
            message = e.message;
            throw new Error(e.message);
          }

          return -1;
        } else {
          try {
            await $Comments.thumbsDown(commentId, 1);
          } catch (e) {
            code = "-2";
            message = e.message;
            throw new Error(e.message);
          }

          return 1;
        }
      });
  } catch (e) {
    code = "-3";
    message = e.message;
    throw new Error(e.message);
  }

  ctx.response.body = {
    code: code,
    message: message,
    thumbsDown: result
  };
});

/*
 * 一级评论举报
 */
router.post("/api/comment/:commentId/report", async ctx => {
  let code = "1",
    message = "评论举报成功";
  const { commentId } = ctx.params;
  let { userId } = ctx.request.body;

  try {
    var result = await redisUtils
      .reportCommentById(commentId, userId)
      .then(async () => {
        try {
          let res = await $Comments.reportComment(commentId);
          if (res.ok === 1) {
            return true;
          } else {
            code = "-1";
            message = "存入mongodb错误";
            return false;
          }
        } catch (e) {
          code = "-2";
          message = e.message;
          throw new Error(e.message);
        }
      });
  } catch (e) {
    code = "-3";
    message = e.message;
  }

  ctx.response.body = {
    code: code,
    message: message,
    state: result
  };
});

/*
 * 二级评论举报
 */
router.post("/api/comment/:commentId/sub_report", async ctx => {
  let code = "1",
    message = "子评论评论举报成功";
  const { commentId } = ctx.params;
  let { userId, parentId } = ctx.request.body;

  try {
    var result = await redisUtils
      .reportSubCommentById({ commentId, parentId, userId })
      .then(async () => {
        try {
          let res = await $Comments.reportSubComment({ parentId, commentId });
          if (res.ok === 1) {
            return true;
          } else {
            code = "-1";
            message = "存入mongodb错误";
            return false;
          }
        } catch (e) {
          code = "-2";
          message = e.message;
          throw new Error(e.message);
        }
      });
  } catch (e) {
    code = "-3";
    message = e.message;
  }

  ctx.response.body = {
    code: code,
    message: message,
    state: result
  };
});

module.exports = router;
