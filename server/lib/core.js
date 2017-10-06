const User = require('./user');
const Article = require('./article');
const Comments = require('./comments');
const Messages = require('./message')
const Tag = require('./tags');
const Catalog = require('./catalog');

module.exports = {
  get $User () {
    return User;
  },
  get $Article () {
    return Article;
  },
  get $Comments () {
    return Comments;
  },
  get $Messages () {
    return Messages;
  },
  get $Tag () {
    return Tag;
  },
  get $Catalog () {
    return Catalog;
  }
};
