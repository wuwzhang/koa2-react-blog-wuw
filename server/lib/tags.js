const Tags = require("../models/").Tags;
// const Article = require('../models/').Article;

exports.addTags = (tags, articleId) => {
  // console.log("tags", tags);
  tags.forEach(async tag => {
    try {
      await Tags.findOne({ tag: tag }).then(async (res, err) => {
        if (err) {
          throw new Error(err);
        }
        if (res) {
          return Tags.update(
            { tag: tag },
            { $addToSet: { articleId: articleId } }
          );
        } else {
          return Tags.create({ tag, articleId });
        }
      });
    } catch (e) {
      throw new Error(e);
    }
  });
};
exports.findTagByTagName = tag => {
  return Tags.findOne({ tag: tag }).exec();
};
exports.deleteTags = (tags, articleId) => {
  tags.forEach(async tag => {
    await Tags.update({ tag: tag }, { $pull: { articleId: articleId } }).then(
      async res => {
        if (res.ok != 1) {
          return false;
        }
        let ans = await Tags.aggregate(
          { $match: { tag: tag } },
          {
            $addFields: {
              count: {
                $size: "$articleId"
              }
            }
          },
          {
            $project: {
              count: 1
            }
          }
        );

        if (ans[0].count === 0) {
          return await Tags.remove({ tag: tag });
        } else {
          return true;
        }
      }
    );
  });
};
exports.getTags = count => {
  return Tags.find()
    .limit(count)
    .exec();
};
exports.getAllTags = () => {
  return Tags.find().exec();
};
