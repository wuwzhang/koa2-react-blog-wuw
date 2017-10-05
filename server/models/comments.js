var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  articleId: { type: Schema.Types.ObjectId, ref: 'Article', require: true },
  content: { type: String, require: true },
  created_at: { type: Date, default: Date.now },
  isChecked: { type: Boolean, default: false }
})

module.exports = mongoose.model('Comments', CommentsSchema);
