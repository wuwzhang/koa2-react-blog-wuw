import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentItem from '../../CommentItem/';
import {
  fetchs as commentFetchs,
  actions as commentActions
} from '../../Comment/';
// import {
//   ListGroup,
//   ListGroupItem
// } from 'react-bootstrap';
import './style.css';

class CommentList extends Component {
  componentDidMount() {
    this.props.initComment(this.props.articleId);
  }
  render() {
    let { comments } = this.props;
    return (
      <section className="comment-list">
        <ul>
          {
            comments.map((comment, index) => (
              <CommentItem
                key = { index }
                user = { comment.user }
                content = { comment.content }
                create_at = { comment.create_at }
              />
            ))
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
    comments: state.comment,
    articleId: articleId
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    initComment: async (articleId) => {
      let result = await commentFetchs.getComment(articleId);

      if (result.code === '1') {
        dispatch(commentActions.commentInit(result.comments));
      } else {
        console.log(result);
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
