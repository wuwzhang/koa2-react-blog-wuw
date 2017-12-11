const mongoose = require("mongoose");
const Comments = require("../models/").Comments;

exports.create = data => {
  return Comments.create(data, function(err) {
    if (err) {
      console.log(err);
    }
  });
};

exports.getCommentById = id => {
  return Comments.findOne({ _id: id }).exec();
};

exports.getAllComment = () => {
  const sort = {
    created_at: -1
  };
  return Comments.find({})
    .populate({ path: "userId" })
    .populate({ path: "articleId" })
    .sort(sort)
    .exec();
};

exports.getPageComments = (page, range) => {
  const sort = {
    created_at: -1
  };
  return Comments.find({})
    .sort(sort)
    .skip(range * (page - 1))
    .limit(range)
    .populate({ path: "userId", select: { account: 1 } })
    .populate({
      path: "articleId",
      select: { title: 1, _id: 1 }
    })
    .exec();
};

// exports.getCommentsByArticleId = (articleId) => {
//   const sort = {
//     _id: -1
//   };
//   return Comments.find({ articleId: articleId})
//                  .populate('userId')
//                  .populate('replies.userId')
//                  .sort(sort)
//                  .exec();
// };
//$match 不支持ObjectId， 需要使用mongoose.Types.ObjectId
exports.getCommentsByArticleId = (articleId, page, range) => {
  return Comments.aggregate(
    { $match: { articleId: mongoose.Types.ObjectId(articleId) } },
    { $sort: { created_at: -1 } },
    { $skip: range * (page - 1) },
    { $limit: range },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "replies.userId",
        foreignField: "_id",
        as: "repliesT"
      }
    },
    {
      $addFields: {
        replies: {
          $map: {
            input: "$repliesT",
            as: "i",
            in: {
              _id: {
                $arrayElemAt: [
                  "$replies._id",
                  { $indexOfArray: ["$replies.userId", "$$i._id"] }
                ]
              },
              user: "$$i",
              // thumbsUp: {
              //   $size: {
              //     $arrayElemAt: [
              //       '$replies.thumbsUp',
              //       { '$indexOfArray': ['$replies.userId', '$$i._id'] }
              //     ]
              //   }
              // },
              isRePort: {
                $arrayElemAt: [
                  "$replies.created_at",
                  { $indexOfArray: ["$replies.isRePort", "$$i._id"] }
                ]
              },
              created_at: {
                $arrayElemAt: [
                  "$replies.created_at",
                  { $indexOfArray: ["$replies.userId", "$$i._id"] }
                ]
              },
              content: {
                $arrayElemAt: [
                  "$replies.content",
                  { $indexOfArray: ["$replies.userId", "$$i._id"] }
                ]
              }
            }
          }
        }
      }
    },
    {
      $project: {
        userId: 0,
        articleId: 0,
        repliesT: 0,
        __v: 0,
        user: {
          password: 0,
          activeKey: 0,
          updated_at: 0,
          isActive: 0,
          level: 0,
          __v: 0
        },
        replies: {
          __v: 0
        },
        "replies.user": {
          password: 0,
          activeKey: 0,
          updated_at: 0,
          isActive: 0,
          level: 0,
          __v: 0
        }
      }
    }
  );
};

exports.getAllCommentsCount = () => {
  return Comments.count().exec();
};

exports.getCommentsCount = articleId => {
  return Comments.count({ articleId: articleId }).exec();
};

exports.deleteCommentsByArticleId = articleId => {
  return Comments.remove({ articleId: articleId }).exec();
};

exports.getCommentsByNotChecked = () => {
  return Comments.count({ isChecked: false }).exec();
};

exports.deleteCommentById = async id => {
  return await Comments.findOne({ _id: id }, { replies: 1 }).then(
    async (res, err) => {
      if (res) {
        await Comments.remove({ _id: id });
        return res;
      } else {
        throw new Error(err);
      }
    }
  );
};

exports.setCommentChecked = id => {
  return Comments.update({ _id: id }, { isChecked: true }, function(error) {
    console.log(error);
  });
};

/**
 * 添加二级评论
 * @param  {ObjectId} parentId 父评论Id
 * @param  {Object} data     子评论数据
 */
exports.addSubComment = (parentId, data) => {
  return Comments.update({ _id: parentId }, { $addToSet: { replies: data } });
};

/**
 * 删除二级评论
 * @param  {ObjectId} parentId 父评论Id
 * @param  {ObjectId} commentId  子评论Id
 */
exports.deleteSubComment = (parentId, commentId) => {
  return Comments.update(
    { _id: parentId },
    { $pull: { replies: { _id: commentId } } }
  );
};

// exports.thumbsUpById = (commentId, userId) => {
//   return Comments.findOne({ _id: commentId })
//                  .then((res) => {
//                     let thumbsUp = res.thumbsUp;
//                     if (thumbsUp && thumbsUp instanceof Array) {
//                       if (thumbsUp.indexOf(userId) === -1) {
//                         return Comments.update(
//                           { _id: commentId },
//                           { $addToSet: { thumbsUp: userId } }
//                         )
//                       } else {
//                         return Comments.update(
//                           { _id: commentId },
//                           { $pull: { thumbsUp: userId } }
//                         )
//                       }
//                     } else {

//                     }
//                  })
// }

exports.thumbsUp = (commentId, val) => {
  return Comments.update(
    { _id: commentId },
    { $inc: { thumbsUp: val } }
  ).exec();
};

exports.thumbsDown = (commentId, val) => {
  return Comments.update(
    { _id: commentId },
    { $inc: { thumbsDown: val } }
  ).exec();
};

// exports.thumbsDownById = (commentId, userId) => {
//   return Comments.findOne({ _id: commentId })
//                  .then((res) => {
//                     let thumbsDown = res.thumbsDown;
//                     if (thumbsDown && thumbsDown instanceof Array) {
//                       if (thumbsDown.indexOf(userId) === -1) {
//                         return Comments.update(
//                           { _id: commentId },
//                           { $addToSet: { thumbsDown: userId } }
//                         )
//                       } else {
//                         return Comments.update(
//                           { _id: commentId },
//                           { $pull: { thumbsDown: userId } }
//                         )
//                       }
//                     } else {

//                     }
//                  })
// }

exports.cancelComment = commentId => {
  return Comments.updateOne({ _id: commentId }, { isRePort: false }).exec();
};

exports.reportComment = commentId => {
  return Comments.update({ _id: commentId }, { isRePort: true }).exec();
};

exports.reportSubComment = params => {
  let { commentId, parentId } = params;
  return Comments.update(
    { _id: parentId, "replies._id": commentId },
    { "replies.$.isRePort": true }
  );
};

exports.cancelSubComment = (parentId, commentId) => {
  return Comments.updateOne(
    { _id: parentId, "replies._id": commentId },
    { $set: { "replies.$.isRePort": false } }
  );
};
