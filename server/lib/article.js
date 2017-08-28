var Article = require('../models').Article;
var Comments = require('../models').Comments;

exports.create = (article) => {
  return Article.create(article);
};
exports.getArticles = () => {
  const sort = {
    _id: -1
  };
  return Article.find()
                .sort(sort)
                .exec();
}
exports.getArticlesByType = (type) => {
  const query = {}
  if (type) {
    query.type = type;
  }
  const sort = {
    _id: -1
  };
  return Article.find(query)
                .sort(sort)
                .exec();
}
exports.getArticleById = (articleId) => {
  return Article.findOne({ _id: articleId })
                .exec();
};
exports.getArticleByTitle = (title) => {
  return Article.findOne({ title: title })
                .exec();
};
exports.updateArticleById = (articleId, data) => {

  return Article.update({ _id: articleId }, { $set: data }, function(err){
    console.log(err);
  }).exec();
};
exports.deleteArticleById = (articleId) => {

  return Article.remove({ _id: articleId })
                .exec()
                .then((res) => {
                  if (res.result.ok && res.result.n > 0) {
                    return Comments.remove({articleId: articleId})
                                   .exec();
                  }
                })
}
