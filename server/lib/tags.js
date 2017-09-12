const Tags = require('../models/').Tags;
const Article = require('../models/').Article;

exports.create = (tag) => {
  return Tags.create(tag);
};
exports.findTagByTagName = (tag) => {
  return Tags.findOne({tag: tag}).exec()
}
exports.deleteTag = (tagId) => {
  return Tags.remove({ _id: tagId })
             .exec()
};
exports.getTags = (count) => {
  return Tags.find()
             .limit(count)
             .exec();
}
exports.getAllTags = () => {
  return  Tags.find()
              .exec()
}

