import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import { view as TopMenu } from '../../../components/TopMenu/';
import { view as CommentLi } from '../../../components/CommentLi/';
import {
  Grid,
  Row
} from 'react-bootstrap';
import QueueAnim from 'rc-queue-anim';

import { fetchs as commentFetch, actions as commentAction } from '../../../components/Comment/';

class CommentAdmin extends Component {

  async componentDidMount() {
    let result = await commentFetch.getAllComment();

    if (result.code === '1') {
      this.props.initAllComment(result.comments);
    } else {
      console.log(result);
    }
  }

  render() {

    let { comments = [] } = this.props;

    return (
      <section>
        <section className="All-Nav">
          <TopMenu />
        </section>
        <Grid>
          <section className="ArticleList-bg">
            <section className="ArticleList">
              <ul>
                <QueueAnim className="demo-content">
                  <Row key = 'a'></Row>
                  <Row key = 'b'></Row>
                  <section key = 'c'>
                    {
                      comments.map((comment, index) => {
                        return comment? <CommentLi
                                          id = {comment.id}
                                          index = {index}
                                          isChecked = {comment.isChecked}
                                          articleTitle = {comment.articleTitle}
                                          articleId = {comment.articleId}
                                          content = {comment.content}
                                          create_time = {comment.create_at}
                                        />
                                      : null
                      })
                    }
                  </section>
                </QueueAnim>
              </ul>
            </section>
          </section>
        </Grid>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comment.allComment
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initAllComment: (comments) => {
      dispatch(commentAction.commentAllInit(comments))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentAdmin);
