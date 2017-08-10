var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  account: { type: 'string', require: true },
  username: { type: 'string' },
  password: { type: 'string', require: true },
  profile: { type: 'string' },
  gender: { type: 'string', enum: ['0', '1', '2']},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

UserSchema.index({account: 1});

module.exports = mongoose.model('User', UserSchema);
