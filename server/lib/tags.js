const Tags = require('../models/').Tags;

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
