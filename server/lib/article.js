var mongoose = require('mongoose');
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

/**
 * 通过文章id获取文章
 */
exports.getArticleById = (articleId) => {

  return Article.aggregate(
    { $match: { _id: mongoose.Types.ObjectId(articleId) } },
    { $addFields: {
      comments: {
        $size: '$comments'
      }
    }}
  )
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
exports.getArticleListByDate = (page = 1, range = 4) => {
  return Article.aggregate(
                  {
                    $match: {
                      isPublic: true
                    }
                  },
                  { $group: {
                    _id: { year: { $year: "$created_at"}, month: { $month: "$created_at"} },
                    articles: {
                      $push: {
                        id: "$_id",
                        title: '$title',
                        content: '$content',
                        catalog: '$catalog',
                        created_at: "$created_at"
                      }
                    }
                  }},
                  {
                    $sort: {
                      '_id': -1
                    }
                  },
                  {
                    $skip: range * (page - 1)
                  },
                  {
                    $limit: range
                  }
                );
}

exports.getArticleListCountByDate = () => {
  return Article.aggregate(
                  {
                    $match: {
                      isPublic: true
                    }
                  },
                  { $group: {
                    _id: { year: { $year: "$created_at"}, month: { $month: "$created_at"} },
                    articles: {
                      $push: {
                        id: "$_id"
                      }
                    }
                  }}
                )
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

exports.getArticlesTagsCount = (tag) => {
  return Article.find({ tags: { "$in": [tag] }})
                .count()
                .exec();
}

exports.getArticlesCatalogCount = (catalog) => {
  return Article.find({ catalog: catalog })
                .count()
                .exec();
}

exports.getArticlesSearchCount = (keyword) => {
  const regex = { $regex: new RegExp(keyword, 'i')};
  return Article.find({
                    $or: [
                      { title: regex },
                      { catalog: regex },
                      { tags: { $in: [new RegExp(keyword, 'i')] }}
                    ]
                  })
                .count()
                .exec();
}

/**
 * 通过标签名查找文章
 */
exports.getArticlesByTag = (tag, page, range) => {

  return Article.find({ tags: { "$in": [tag] }})
                .sort({created_at: -1})
                .skip(range * (page - 1))
                .limit(range)
                .exec();
}

/**
 * 通过分类名查询文章
 */
exports.getArticlesByCatalog = (catalog, page, range) => {
  return Article.find({ catalog: catalog })
                .sort({created_at: -1})
                .skip(range * (page - 1))
                .limit(range)
                .exec();
}

exports.getArticleBySearch = (keyword, page, range) => {
  const regex = { $regex: new RegExp(keyword, 'i')};

  return Article.find({
                    $or: [
                      { title: regex },
                      { catalog: regex },
                      { tags: { $in: [new RegExp(keyword, 'i')] }}
                    ]
                  }).sort({updated_at: -1})
                    .skip(range * (page - 1))
                    .limit(range)
                    .exec();

}

/**
 * 返回分类和个分类所包含的文章书,按count数目由大到小排序
 * [
 *   {_id: '前端',count: 2},
 *   { _id: string, count: num}
 * ]
 */
exports.getArticleCatalogs = () => {
  return Article.aggregate(
                  {
                    $group: {
                      _id: '$catalog',
                      count: { $sum: 1 }
                    }
                  }
                )
                .sort({count: -1})
                .exec();
}

/**
 * 修改文章是否开放评论
 * @param  {objectId} articleId 文章Id
 * @param  {Boolean} state     [true为发放评论]
 * @return null
 */
exports.toggleComments = (articleId, state) => {
  return Article.update({ _id: articleId }, { isComment: state }, function(error) {
    console.log(error);
  })
}

/**
 * 修改文章是否公开
 * @param  {objectId} articleId 文章Id
 * @param  {Boolean} state     [true为文章]
 * @return null
 */
exports.toggleArticlePublic = (articleId, state) => {
  return Article.update({ _id: articleId }, { isPublic: state }, function(error) {
    console.log(error);
  })
}

/**
 * 阅读访问量+1
 */
exports.incPv = (articleId) => {
  return Article.update({ _id: articleId }, { $inc: { pv: 1 } })
                .exec();
}

/**
 * 评论量+1
 */
exports.addComment = (articleId, commentId) => {
  return Article.update({ _id: articleId }, { $addToSet: { comments: commentId } })
                .exec();
}

exports.redComment = (articleId, commentId) => {
  return Article.update({ _id: articleId }, { $pull: { comments: commentId } })
                .exec();
}

/**
 * 获取当前文章的上一篇文章
 * @param  {[ObjectId]} articleId [当前文章的Id]
 * @return {[object]}           [文章信息]
 */
exports.getPreArticleById = (articleId) => {
  return Article.findOne(
    { _id: {$lt: articleId} },
    { _id: 1, title: 1 }
  ).sort({_id: -1 })
  .exec()
}

/**
 * 获取当前文章的下一篇文章
 * @param  {[ObjectId]} articleId [当前文章的Id]
 * @return {[object]}           [文章信息]
 */
exports.getNextArticleById = (articleId) => {
  return Article.findOne(
    { _id: {$gt: articleId} },
    { _id: 1, title: 1 }
  )
  .sort({_id: 1 })
  .exec()
}

exports.getTopPreviewArticle = () => {
  return Article.aggregate(
                  { $match: { isPublic: true } },
                  { $sort: { created_at: -1 } },
                  { $project: {
                      _id: 1,
                      title: 1,
                      pv: 1
                    }
                  }
                )
                .sort({pv: -1})
                .exec();
}

exports.getTopCommentsArticle = () => {
  return Article.aggregate(
                  { $match: { isPublic: true } },
                  { $addFields: {
                    commentCount: {
                      $size: '$comments'
                    }
                  } },
                  { $project: {
                    _id: 1,
                    title: 1,
                    commentCount: 1
                  } }
                ).exec()
}
