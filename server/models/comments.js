var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  articleId: { type: Schema.Types.ObjectId, ref: 'Article', require: true },
  content: { type: String, require: true },
  created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Comments', ArticleSchema);
