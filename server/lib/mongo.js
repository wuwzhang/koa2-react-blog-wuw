const config = require('config-lite')(__dirname);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

mongoose.connect(config.mongodb);

// mongoose.plugin('addCreatedAt', {
//   afterFind: function (results) {
//     results.forEach(function (item) {
//       item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
//     });
//     return results;
//   },
//   afterFindOne: function (result) {
//     if (result) {
//       result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
//     }
//     return result;
//   }
// });
UserSchema = new Schema({
  account: { type:String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})
UserSchema.index({account: 1});
exports.User = mongoose.model('User', UserSchema);
// exports.User.index({ account: 1 }, { unique: true });

const ArticleSchema = new Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})
ArticleSchema.index({title: 1})
exports.Article = mongoose.model('Article', ArticleSchema);
// exports.Article.index({ title: 1}, { unique: true }).exec();
