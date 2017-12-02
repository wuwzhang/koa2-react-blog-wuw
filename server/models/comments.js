var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  articleId: { type: Schema.Types.ObjectId, ref: 'Article', require: true },
  content: { type: String, require: true },
  created_at: { type: Date, default: Date.now },
  // thumbsUp: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  // thumbsDown: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  thumbsUp: { type: Number, default: 0 },
  thumbsDown: { type: Number, default: 0 },
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
      content: {
        type: String
      },
      isRePort: {
        type: Boolean,
        default: false
      }
    }
  ]
})

module.exports = mongoose.model('Comments', CommentsSchema);
