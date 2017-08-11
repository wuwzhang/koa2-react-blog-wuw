const config = require('config-lite');
const Mongolass = require('mongolass');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
const mongolass = new Mongolass();
mongolass.connect(config.mongodb);

mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    });
    return results;
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
    }
    return result;
  }
});

exports.User = mongolass.model('User',{
  account: { type:'string' },
  username: { type: 'string' },
  password: { type: 'string' },
  updated_at: { type: Date, default: Date.now }
});
exports.User.index({ account: 1 }, { unique: true }).exec();
