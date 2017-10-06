var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MessagesSchema = new Schema({
  email: { type:String, require: true },
  content: { type: String, require: true },
  created_at: { type: Date, default: Date.now },
  isChecked: { type: Boolean, default: false }
})

module.exports = mongoose.model('Messages', MessagesSchema);
