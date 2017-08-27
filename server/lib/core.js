const User = require('./user');
const Article = require('./article');
const Comments = require('./comments');

module.exports = {
  get $User () {
    return User;
  },
  get $Article () {
    return Article;
  },
  get $Comments () {
    return Comments;
  }
};
