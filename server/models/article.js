var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

moment.locale('zh-cn');
const ArticleSchema = new Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  tags: [{ type: String }],
  catalog: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

ArticleSchema.index({title: 1})
ArticleSchema.set('toJSON', { getters: true, virtuals: true })
ArticleSchema.set('toObject', { getters: true, virtuals: true })
ArticleSchema.path('created_at').get(function(v) {
  return moment(v).format();
});
ArticleSchema.path('updated_at').get(function(v) {
  return moment(v).format();
});
module.exports = mongoose.model('Article', ArticleSchema);
