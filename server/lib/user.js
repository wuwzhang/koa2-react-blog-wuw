const User = require("../models/").User;

exports.create = data => User.create(data);

exports.getUserById = id => User.findOne({ _id: id }).exec();

exports.getUserByAccount = account => User.findOne({ account: account }).exec();

exports.verifymail = activeKey => {
  return User.update({ activeKey: activeKey }, { isActive: true });
};

exports.updatePasswordByAccount = (account, password) => {
  return User.update({ account: account }, { password: password });
};
