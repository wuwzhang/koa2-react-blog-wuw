import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentItem from '../../CommentItem/';
import {
  fetchs as commentFetchs,
  actions as commentActions
} from '../../Comment/';

import './style.css';

class CommentList extends Component {

  async componentDidMount() {
    let result = await commentFetchs.getComment(this.props.articleId);

    if (result.code === '1') {
      this.props.initComment(result.comments);
    } else {

    }
  }

  render() {
    let { comments = [] } = this.props;

    return (
      <section className="comment-list">
        <ul>
        {
          comments.map((comment, index) => {
            return <CommentItem
                      key = { index }
                      commentIndex = { index }
                    />
          })
        }
        </ul>
      </section>
    );
  }
}
const mapStateToProps = (state) => {

  let pathname = state.routing.location.pathname,
      articleId = pathname.split('/')[2];

  return {
    comments: state.comment.articleComments,
    articleId: articleId
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    initComment: (comments) => {
      dispatch(commentActions.commentInit(comments));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
