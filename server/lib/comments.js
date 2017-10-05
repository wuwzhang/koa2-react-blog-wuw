const Comments = require('../models/').Comments;

exports.create = (data) => (
  Comments.create(data)

);

exports.getCommentById = (id) => (
  Comments.findOne({_id: id})
          .exec()
);

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

exports.getCommentsByArticleId = (articleId) => {
  const sort = {
    _id: -1
  };
  return Comments.find({ articleId: articleId})
                 .populate({ path: 'userId'})
                 .populate({ path: 'articleId' })
                 .sort(sort)
                 .exec();
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
  const sort = {
    created_at: -1
  };
  return Comments.find({isChecked: false})
                 .populate({ path: 'userId'})
                 .populate({ path: 'articleId' })
                 .sort(sort)
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
