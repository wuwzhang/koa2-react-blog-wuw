const mongoose = require('mongoose');
const Comments = require('../models/').Comments;

exports.create = (data) => {
  return Comments.create(data, function(err) {
    if (err) {
      console.log(err)
    }
  })
};

exports.getCommentById = (id) => {
  return Comments.findOne({_id: id})
          .exec()
};

exports.getAllComment = () => {
  const sort = {
    created_at: -1
  };
  return Comments.find({})
                 .populate({ path: 'userId'})
                 .populate({ path: 'articleId' })
                 .sort(sort)
                 .exec()
}

exports.getPageComments = (page, range) => {
  const sort = {
    created_at: -1
  };
  return Comments.find({})
                 .populate({ path: 'userId'})
                 .populate({ path: 'articleId' })
                 .sort(sort)
                 .skip(range * (page - 1))
                 .limit(range)
                 .exec()
}

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

exports.getCommentsByArticleId = (articleId, page, range) => {

  return Comments.aggregate(
    { $match: { articleId: mongoose.Types.ObjectId(articleId) } },   //$match 不支持ObjectId， 需要使用mongoose.Types.ObjectId
    { $sort: { created_at: -1 } },
    { $skip: range * (page - 1) },
    { $limit: range },
    { $lookup: {
         from: "users",
         localField: "userId",
         foreignField: "_id",
         as: "user"
    }},
    { $lookup: {
        from: "users",
        localField: "replies.userId",
        foreignField: "_id",
        as: "repliesT"
    }},
    { $addFields: {
      replies: {
        $map: {
          input: '$repliesT',
          as: 'i',
          in: {
            _id: {
              $arrayElemAt: [
                '$replies._id',
                { '$indexOfArray': ['$replies.userId', '$$i._id'] }
              ]
            },
            user: '$$i',
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
                '$replies.created_at',
                { '$indexOfArray': ['$replies.isRePort', '$$i._id'] }
              ]
            },
            created_at: {
              $arrayElemAt: [
                '$replies.created_at',
                { '$indexOfArray': ['$replies.userId', '$$i._id'] }
              ]
            },
            content: {
              $arrayElemAt: [
                '$replies.content',
                { '$indexOfArray': ['$replies.userId', '$$i._id'] }
              ]
            }
          }
        }
      },
      thumbsUp: {
        $size: '$thumbsUp'
      },
      thumbsDown: {
        $size: '$thumbsDown'
      }
    }},
    { $project: {
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
    }}
  )
};

exports.getAllCommentsCount = () => {
  return Comments.count()
                 .exec();
}

exports.getCommentsCount = (articleId) => {
  return Comments.count({articleId: articleId}).exec();
};

exports.deleteCommentsByArticleId = (articleId) => {
  return Comments.remove({articleId: articleId})
                 .exec();
};

exports.getCommentsByNotChecked = () => {
  return Comments.count({isChecked: false})
                 .exec()
};

exports.deleteCommentById = (id) => {
  return Comments.remove({_id: id})
                 .exec()
}

exports.setCommentChecked = (id) => {
  return Comments.update({ _id: id }, { isChecked: true }, function(error) {
    console.log(error);
  })
}

/**
 * 添加二级评论
 * @param  {ObjectId} parentId 父评论Id
 * @param  {Object} data     子评论数据
 */
exports.addSubComment = (parentId, data) => {
  return Comments.update(
    { _id: parentId },
    { $addToSet: { replies: data }}
  )
}

/**
 * 一级平评论点赞
 * @param  {ObjectId} commentId 评论Id
 */
exports.thumbsUpById = (commentId, userId) => {
  return Comments.findOne({ _id: commentId })
                 .then((res) => {
                    let thumbsUp = res.thumbsUp;
                    if (thumbsUp && thumbsUp instanceof Array) {
                      if (thumbsUp.indexOf(userId) === -1) {
                        return Comments.update(
                          { _id: commentId },
                          { $addToSet: { thumbsUp: userId } }
                        )
                      } else {
                        return Comments.update(
                          { _id: commentId },
                          { $pull: { thumbsUp: userId } }
                        )
                      }
                    } else {

                    }
                 })
}

exports.thumbsDownById = (commentId, userId) => {
  return Comments.findOne({ _id: commentId })
                 .then((res) => {
                    let thumbsDown = res.thumbsDown;
                    if (thumbsDown && thumbsDown instanceof Array) {
                      if (thumbsDown.indexOf(userId) === -1) {
                        return Comments.update(
                          { _id: commentId },
                          { $addToSet: { thumbsDown: userId } }
                        )
                      } else {
                        return Comments.update(
                          { _id: commentId },
                          { $pull: { thumbsDown: userId } }
                        )
                      }
                    } else {

                    }
                 })
}
