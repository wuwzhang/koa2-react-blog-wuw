var Article = require('../models').Article;

exports.create = (article) => {
  return Article.create(article);
};
exports.getArticleById = (articleId) => {
  return Article.findOne({_id: articleId})
                .exec();
};
exports.getArticleByTitle = (title) => {
  return Article.findOne({title: title})
                .exec();
};
exports.updateArticleById = (articleId, data) => {
  return Article.update({_id: articleId}, { $set: data }).exec();
};
exports.deleteArticleById = (articleId) => {
  return Article.remove({  _id: articleId })
                .exec();
}
