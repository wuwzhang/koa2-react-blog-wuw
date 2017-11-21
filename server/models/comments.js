var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  articleId: { type: Schema.Types.ObjectId, ref: 'Article', require: true },
  content: { type: String, require: true },
  created_at: { type: Date, default: Date.now },
  thumbsUp: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  thumbsDown: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isChecked: { type: Boolean, default: false },
  isRePort: { type: Boolean, default: false },
  replies: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      created_at: {
        type: Date,
        default: Date.now
      },
      thumbsUp: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      content: {
        type: String
      }
    }
  ]
})

module.exports = mongoose.model('Comments', CommentsSchema);
