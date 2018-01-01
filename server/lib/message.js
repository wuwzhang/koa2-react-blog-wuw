const Messages = require("../models/").Messages;

exports.create = data => {
  return Messages.create(data);
};
exports.getMessagesByNotChecked = () => {
  return Messages.find({ isChecked: false }, { _id: 1 }).exec();
};

exports.getPageMessages = (page, range) => {
  const sort = {
    created_at: -1
  };
  return Messages.find({})
    .sort(sort)
    .skip(range * (page - 1))
    .limit(range)
    .exec();
};
exports.getAllMessagesCount = () => {
  return Messages.count().exec();
};

exports.deleteMessageById = id => {
  return Messages.remove({ _id: id }).exec();
};

exports.setMessageChecked = id => {
  return Messages.update({ _id: id }, { isChecked: true }, function(error) {
    console.log(error);
  });
};
