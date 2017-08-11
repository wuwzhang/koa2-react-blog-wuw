const User = require('../models/').User;

exports.addUser = (data) => (
  User.create(data)
);

exports.getUserById = (id) => (
  User.findById(id)
);

exports.getUserByAccount = (account) => (
  User.findOne({account: account}).exec()
);
