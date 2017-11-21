import React, { Component } from 'react';
import { connect } from 'react-redux';

import { view as SubCommentInput } from '../subCommentInput/';
import SubCommentItem from '../SubCommentItem/index.js';
import { Avatar } from '../Avatar/index.js';

import { actions as commentAction, fetchs as commentFetchs } from '../Comment/';

import {
  Row,
  Col
} from 'react-bootstrap';
import { notification } from 'antd';
import FontAwesome from 'react-fontawesome';
import './style.css';

const marked = require('marked');

class CommentItem extends Component {

  _handleShowRepliy() {

    let { user, commentIndex, comments = [] } = this.props,
        comment = comments[commentIndex];

    if (comment && comment.isShowReply) {
      this.props.setIsShowReply({
        state: false,
        commentIndex: commentIndex
      });
    } else if (user) {
      this.props.setIsShowReply({
        state: true,
        commentIndex: commentIndex
      });
    } else {
      notification.warning({
        message: 'Notification',
        description: 'please login first',
        style: {
          color: '#ff7e67',
          bacground: '#fafafa'
        }
      });
    }
  }

  async _handleThumbsUp(commentId) {
    console.log(commentId);
    let result = await commentFetchs.thumbsUp(commentId);

    if (result.code === '1') {

    } else {

    }
  }

  render() {
    let { comments, commentIndex } = this.props,
        comment = comments[commentIndex],
        { replies = [], user = {} } = comment;

    return (
      <Row>
        <Col md={1}>
          <Avatar avatarNum={user.avatar} />
        </Col>
        <Col md={11}>
          <Row>
            <Col md={12} sm={12}>
              <p className='commentItem-username'>{ user.username }</p>
            </Col>
            <Col md={12} sm={12}>
              {
                comment.content ? <span
                                    className='commentItem-content'
                                    dangerouslySetInnerHTML={{
                                      __html: marked(comment.content, {sanitize: true})
                                    }}
                                  ></span>
                                : null
              }
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={12}>
              <ul className='commentItem-Ul commentItem-option'>
                <li>
                  {
                    comment && comment.created_at ? comment.created_at.slice(0, 10)
                                                  : comment
                  }
                </li>
                <li>
                  <span className='commentItem-option-btn'>
                    <FontAwesome name='thumbs-o-up'/>
                    <span
                      onClick={ () => this._handleThumbsUp() }
                    > {comment.thumbsUp}</span>
                  </span>
                </li>
                <li>
                  <span className='commentItem-option-btn'>
                    <FontAwesome name='thumbs-o-down'/>
                    <span> {comment.thumbsDown}</span>
                  </span>
                </li>
                <li>
                  <span
                    onClick={ () => this._handleShowRepliy(comment.id) }
                    className='commentItem-option-btn'
                  >
                    回复
                  </span>
                </li>
                <li>
                  <span className='commentItem-option-btn'>举报</span>
                </li>
              </ul>
            </Col>
          </Row>

          <Row>
            <Col md={12} sm={12}>
              {
                replies.map((reply, index) => {
                  return <SubCommentItem
                            key = { index }
                            reply = { reply }
                            commentIndex = { commentIndex }
                          />
                })
              }
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={12}>
              {
                comment.isShowReply ? <SubCommentInput
                                        parentId = { comment.id }
                                        commentIndex = { commentIndex }
                                      />
                                    : null
              }
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    comments: state.comment.articleComments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIsShowReply: (state, commentIndex) => {
      dispatch(commentAction.setIsShowReply(state, commentIndex));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
