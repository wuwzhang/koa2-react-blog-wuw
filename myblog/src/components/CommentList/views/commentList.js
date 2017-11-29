import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentItem from '../../CommentItem/';
import CommentPagination from '../../CommentPagination/index.js';

import {
  fetchs as commentFetchs,
  actions as commentActions
} from '../../Comment/';

import './style.css';

class CommentList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1
    }

    this.handlePage = this.handlePage.bind(this);
  }

  async componentDidMount() {
    let result = await commentFetchs.getComment(this.props.articleId, 1, 4);

    if (result.code === '1') {

      this.props.initComment(result.comments);

    } else {

    }
  }

  async handlePage(currentPage) {
    this.setState({
      currentPage: currentPage
    })

    let result = await commentFetchs.getComment(this.props.articleId, currentPage, 4);

    if (result.code === '1') {
      this.setState({

      })
      this.props.initComment(result.comments);
    }
  }

  render() {
    let { comments = [], commentCount } = this.props,
        { currentPage } = this.state,
        totalPages = Math.ceil(commentCount / 4)

    return (
      <section className="comment-list">
        <CommentPagination
          commentsCount = { commentCount }
          currentPage = { currentPage }
          totalPages = { totalPages }
          range = { 5 }
          onChange = { this.handlePage }
        />
        <ul>
        {
          comments.map((comment, index) => {
            if (comment) {
              return <CommentItem
                        key = { index }
                        commentIndex = { index }
                      />
            }
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
    commentCount: state.articleDetails.article.comments,
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
