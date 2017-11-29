import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { view as SubCommentInput } from '../subCommentInput/';
import SubCommentItem from '../SubCommentItem/index.js';
import { Avatar } from '../Avatar/index.js';

import { actions as commentAction, fetchs as commentFetchs } from '../Comment/';

import {
  Row,
  Col
} from 'react-bootstrap';
import { notification, Button, Icon } from 'antd';
import FontAwesome from 'react-fontawesome';
import './style.css';

// import { FormattedMessage } from 'react-intl';

const marked = require('marked');

class CommentItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pathname: null,
      redirectState: null
    }
  }

  _login() {
    let pathname ='/login',
        redirectState = { from: this.props.location };

    this.setState({
      pathname: pathname,
      redirectState: redirectState
    })
  }

  _handleShowRepliy() {

    const btn = (
      <Button
        className="submit-btn subComment-btn"
        onClick={()=>this._login()}
      >
        Sign In
      </Button>
    );

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
      notification.open({
        message: 'Sign In',
        description: 'If you want to reply, please login first',
        btn,
        icon: <Icon type="meh-o" style={{ color: '#A2D5F2' }} />,
        style: {
          color: '#ff7e67',
          bacground: '#fafafa'
        }
      });
    }
  }

  async _handleThumbsUp(commentId) {

    const btn = (
      <Button
        className="submit-btn subComment-btn"
        onClick={()=>this._login()}
      >
        Sign In
      </Button>
    );

    let userId = this.props.user ? this.props.user._id : '';
    if (userId && commentId) {
      let result = await commentFetchs.thumbsUp(commentId, userId);

      if (result.code === '1') {
        this.props.setThumbsUp(1);
      } else {

      }
    } else if (!userId) {
      notification.open({
        message: 'Sign In',
        description: 'If you want to thumbs up, please login first',
        btn,
        icon: <Icon type="meh-o" style={{ color: '#A2D5F2' }} />,
        style: {
          color: '#ff7e67',
          bacground: '#fafafa'
        }
      });
    }
  }

  async _handleThumbsDown(commentId) {
    const btn = (
      <Button
        className="submit-btn subComment-btn"
        onClick={()=>this._login()}
      >
        Sign In
      </Button>
    );

    let userId = this.props.user ? this.props.user._id : '';

    if (userId && commentId) {
      let result = await commentFetchs.thumbsDown(commentId, userId);

      if (result.code === '1') {
        this.props.thumbsDown(1)
      } else {

      }
    } else if(!userId) {
      notification.open({
        message: 'Sign In',
        description: 'If you want to thums down, please login first',
        btn,
        icon: <Icon type="meh-o" style={{ color: '#A2D5F2' }} />,
        style: {
          color: '#ff7e67',
          bacground: '#fafafa'
        }
      });
    }
  }

  render() {
    let { comments, commentIndex } = this.props,
        comment = comments[commentIndex],
        { pathname, redirectState } = this.state,
        { replies = [], user = {} } = comment;

    if (pathname) {
      return <Redirect to={{
              pathname: pathname,
              state: redirectState
            }}/>
    }

    // user = user ? user[0] : user;
    console.log(user.avatar)

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
                      onClick={ () => this._handleThumbsUp(comment._id) }
                    > {comment.thumbsUp}</span>
                  </span>
                </li>
                <li>
                  <span className='commentItem-option-btn'>
                    <FontAwesome name='thumbs-o-down'/>
                    <span
                      onClick={ () => this._handleThumbsDown(comment._id) }
                    > {comment.thumbsDown}</span>
                  </span>
                </li>
                <li>
                  <span
                    onClick={ () => this._handleShowRepliy() }
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
                                        parentId = { comment._id }
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
    },
    setThumbsUp: (count) => {
      dispatch(commentAction.setThumbsUp(count));
    },
    setThumbsDown: (count) => {
      dispatch(commentAction.setThumbsDown(count));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
