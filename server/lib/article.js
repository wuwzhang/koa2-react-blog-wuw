var Article = require('../models').Article;
var Comments = require('../models').Comments;

exports.create = (article) => {
  return Article.create(article)

};
exports.getArticles = () => {
  const sort = {
    _id: -1
  };
  return Article.find()
                .sort(sort)
                .exec();
};

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
};

exports.getArticleById = (articleId) => {
  return Article.findOne({ _id: articleId })
                .exec();
};

exports.getArticleByTitle = (title) => {
  return Article.findOne({ title: title })
                .exec();
};
exports.getArticleCount = () => {
  return Article.count()
                .exec();
}
exports.getPageArticle = (page, range) => {
  return Article.find({})
                .sort({created_at: -1})
                .skip(range * (page - 1))
                .limit(range)
                .exec();
}

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
                    return  Comments.remove({articleId: articleId})
                                    .exec()
                  }
                })
}

exports.getArticlesCountByMonth = () => {
  return Article.aggregate(
    {
      $group: {
        _id: { year: { $year: "$created_at"}, month: { $month: "$created_at"} },
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: { year: "$_id.year" },
        monthCount: { $push: { month: "$_id.month", count: "$count"}}
      }
    }
  );

}

exports.getArticleListByDate = () => {
  return Article.aggregate(
                    { $group: {
                      _id: { year: { $year: "$created_at"}, month: { $month: "$created_at"} },
                      articles: { $push: {id: "$_id", title: '$title', created_at: "$created_at"} }
                    }}
                  );
}
