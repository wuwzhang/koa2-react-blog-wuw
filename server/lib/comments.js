const Comments = require('../models/').Comments;

exports.create = (data) => (
  Comments.create(data)

);

exports.getCommentById = (id) => (
  Comments.findOne({_id: id})
          .exec()
);

exports.getCommentsByArticleId = (articleId) => {
  const sort = {
    _id: -1
  };
  return Comments.find({ articleId: articleId})
                 .populate({ path: 'userId'})
                 .sort(sort)
                 .exec();
};

exports.getCommentsCount = (articleId) => {
  return Comments.count({articleId: articleId}).exec();
}

exports.deleteCommentsByArticleId = (articleId) => {
  return Comments.remove({articleId: articleId})
                 .exec();
}


