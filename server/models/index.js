var mongoose = require('mongoose');

const config = require('config-lite')(__dirname);

mongoose.connect(config.mongodb, function(err){
  if (err) {
    console.err('connect to %s error: ', config.mongodb, err.message);
    process.exit(1);
  }
});

exports.User = require('./user');
