var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
  account: { type:String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
  avatar: { type: String, default: '1' },
  level: { type: Number, default: 1},
  // isActive: { type: Boolean, default: false },
  // activeKey: { type:String,required:true},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})
UserSchema.index({account: 1});
module.exports = mongoose.model('User', UserSchema);
