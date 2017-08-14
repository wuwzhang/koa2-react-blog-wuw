const User = require('./user');
const Article = require('./article');

module.exports = {
  get $User () {
    return User;
  },
  get $Article () {
    return Article;
  }
};
