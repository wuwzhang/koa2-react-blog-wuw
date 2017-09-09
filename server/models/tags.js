var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TagsSchema = new Schema({
  tag: {type: String, default: ''},
  created_at: { type: Date, default: Date.now }
}, { versionKey: false });

TagsSchema.set('toJSON', { getters: true, virtuals: true })
TagsSchema.set('toObject', { getters: true, virtuals: true })

module.exports = mongoose.model('Tags', TagsSchema);
