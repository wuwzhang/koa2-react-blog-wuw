import React, { Component } from "react";
import { CommentInput } from "../../CommentInput/";
import CommentList from "../../CommentList/views/commentList.js";

import "./style.css";

class Comment extends Component {
  render() {
    return (
      <section className="commnet">
        <CommentInput />
        <CommentList />
      </section>
    );
  }
}

export default Comment;
