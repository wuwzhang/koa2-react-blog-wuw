var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})
ArticleSchema.index({title: 1})
module.exports = mongoose.model('Article', ArticleSchema);
