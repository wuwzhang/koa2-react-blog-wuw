const User = require('./user');
const Article = require('./article');
const Comments = require('./comments');
const Tag = require('./tags');
const Catalog = require('./catalog.js');

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
  get $Tag () {
    return Tag;
  },
  get $Catalog () {
    return Catalog;
  }
};
