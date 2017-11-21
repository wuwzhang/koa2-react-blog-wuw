const User = require('../models/').User;

exports.create = (data) => (
  User.create(data)
);

exports.getUserById = (id) => (
  User.findOne({_id: id})
      .exec()
);

exports.getUserByAccount = (account) => (
  User.findOne({account: account}).exec()
);

exports.verifymail = (activeKey, state = true) => {

  return User.update(
    {
      activeKey: activeKey
    },
    {
      isActive: true
    }
  )
}

