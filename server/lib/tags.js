const Tags = require("../models/").Tags;
// const Article = require('../models/').Article;

exports.addTags = (tags, articleId) => {
  // console.log("tags", tags);
  tags.forEach(async tag => {
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
  });
};
exports.findTagByTagName = tag => {
  return Tags.findOne({ tag: tag }).exec();
};
exports.deleteTag = tagId => {
  return Tags.remove({ _id: tagId }).exec();
};
exports.getTags = count => {
  return Tags.find()
    .limit(count)
    .exec();
};
exports.getAllTags = () => {
  return Tags.find().exec();
};
