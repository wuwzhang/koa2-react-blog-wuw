import React, { Component } from 'react';
import { CommentInput } from '../../CommentInput/';
import CommentList from '../../CommentList/views/commentList.js';

class Comment extends Component {
  render() {
    return (
      <section>
        <CommentList />
        <CommentInput />
      </section>
    )
  }
}

export default Comment;
