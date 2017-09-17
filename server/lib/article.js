var Article = require('../models').Article;
var Comments = require('../models').Comments;

/**
 * 创建新文章
 */
exports.create = (article) => {
  return Article.create(article)

};

/**
 * 获取所有文章，通过创建时间排序
 */
exports.getArticles = () => {
  const sort = {
    created_at: -1
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
    created_at: -1
  };
  return Article.find(query)
                .sort(sort)
                .exec();
};

/**
 * 通过文章id获取文章
 */
exports.getArticleById = (articleId) => {

  return Article.findOne({ _id: articleId })
                .exec();
};

/**
 * 通过文章标题获取文章（相同作者不能有相同标题的文章！！！！！！！！）
 */
exports.getArticleByTitle = (title) => {
  return Article.findOne({ title: title })
                .exec();
};
/**
 * 获取文章数量
 */
exports.getArticleCount = () => {
  return Article.count()
                .exec();
}

/**
 * 获取当前页的文章
 * @param  {number} page  第几页
 * @param  {number} range 每页显示的文章数
 */
exports.getPageArticle = (page, range) => {
  return Article.find({})
                .sort({created_at: -1})
                .skip(range * (page - 1))
                .limit(range)
                .exec();
}

/**
 * 修改文章
 * @param  {number} articleId 文章id
 * @param  {object} data      修改的内容
 */
exports.updateArticleById = (articleId, data) => {
  return Article.update({ _id: articleId }, { $set: data }, function(err){
    console.log(err);
  });
};

/**
 * 通过文章id删除文章
 * @param  {number} articleId 文章id
 */
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

/**
 * 返回归档数据
 * {
 *   _id: {year: ""}
 *   monthCount: {month: "", count: ""}
 * }
 */
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

/**
 * 返回归档格式的文章
 * {
 *   _id: {year: "", month: ""}
 *   articles: [{id: "", title: "", create_at: ""}, {}]
 * }
 */
exports.getArticleListByDate = () => {
  return Article.aggregate(
                  { $group: {
                    _id: { year: { $year: "$created_at"}, month: { $month: "$created_at"} },
                    articles: { $push: {id: "$_id", title: '$title', content: '$content', catalog: '$catalog', created_at: "$created_at"} }
                  }}
                )
                .sort({_id: -1});
}

exports.getArticlesByTag = (tag) => {
  return Article.find({ tags: { "$in": [tag] }})
                .exec();
}
exports.getArticlesByCatalog = (catalog) => {
  return Article.find({ catalog: catalog })
                .exec();
}

exports.getArticleCatalogs = () => {
  return Article.aggregate(
                  {
                    $group: {
                      _id: '$catalog',
                      count: { $sum: 1 }
                    }
                  }
                )
}
