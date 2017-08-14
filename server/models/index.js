var mongoose = require('mongoose');
var config = require('config-lite')(__dirname);

mongoose.connect(config.mongodb, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.mongodb, err.message);
    process.exit(1);
  }
});

exports.User = require('./user');
exports.Article = require('./article');
