import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { view as SubCommentInput } from "../subCommentInput/";
import SubCommentItem from "../SubCommentItem/index.js";
import { Avatar } from "../Avatar/index.js";

import { actions as commentAction, fetchs as commentFetchs } from "../Comment";

import { Row, Col } from "react-bootstrap";
import { notification, Button, Icon, Popconfirm } from "antd";
import FontAwesome from "react-fontawesome";
import "./style.css";

import { injectIntl, FormattedMessage } from "react-intl";
import message from "../../locale/message";
const marked = require("marked");

class CommentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pathname: null,
      redirectState: null
    };
  }

  _login() {
    let pathname = "/login",
      redirectState = { from: this.props.location };

    this.setState({
      pathname: pathname,
      redirectState: redirectState
    });
  }

  _handleShowReply() {
    const btn = (
      <Button
        className="submit-btn subComment-btn"
        onClick={() => this._login()}
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
        message: this.props.intl.formatMessage(message.LoginCheckMes),
        description: this.props.intl.formatMessage(message.ReplyLoginCheckDes),
        btn,
        icon: <Icon type="meh-o" style={{ color: "#A2D5F2" }} />,
        style: {
          color: "#ff7e67",
          bacground: "#fafafa"
        }
      });
    }
  }

  async _handleReport(commentId, event) {
    event.preventDefault(event);

    const btn = (
      <Button
        className="submit-btn subComment-btn"
        onClick={() => this._login()}
      >
        Sign In
      </Button>
    );

    let { user, commentIndex } = this.props;

    if (user) {
      if (commentId) {
        let result = await commentFetchs.reportCommentById(commentId, user._id);

        if (result.code === "1") {
          let state = result.state;
          this.props.setCommentReportedState({
            state,
            commentIndex
          });
          notification.open({
            message: this.props.intl.formatMessage(message.ReportSuccessMsg),
            description: this.props.intl.formatMessage(
              message.ReportSuccessDes
            ),
            icon: <Icon type="smile-o" style={{ color: "#ff7e67" }} />,
            style: {
              color: "#A2D5F2",
              bacground: "#fafafa"
            }
          });
        } else {
          notification.open({
            message: this.props.intl.formatMessage(message.ReportFailMsg),
            description: this.props.intl.formatMessage(message.ReportFailDes),
            icon: <Icon type="meh-o" style={{ color: "#A2D5F2" }} />,
            style: {
              color: "#ff7e67",
              bacground: "#fafafa"
            }
          });
        }
      } else {
        console.log("CommentItem - commentId 参数错误");
      }
    } else {
      notification.open({
        message: this.props.intl.formatMessage(message.LoginCheckMes),
        description: this.props.intl.formatMessage(
          message.ReportLoginCheackDes
        ),
        btn,
        icon: <Icon type="meh-o" style={{ color: "#A2D5F2" }} />,
        style: {
          color: "#ff7e67",
          bacground: "#fafafa"
        }
      });
    }
  }

  async _handleThumbsUp(commentId) {
    const btn = (
      <Button
        className="submit-btn subComment-btn"
        onClick={() => this._login()}
      >
        Sign In
      </Button>
    );

    let userId = this.props.user ? this.props.user._id : "",
      { commentIndex } = this.props;

    if (userId && commentId) {
      let result = await commentFetchs.thumbsUp(commentId, userId);

      if (result.code === "1") {
        this.props.setThumbsUp({
          state: result.thumbsUp,
          commentIndex: commentIndex
        });
      } else {
      }
    } else if (!userId) {
      notification.open({
        message: this.props.intl.formatMessage(message.LoginCheckMes),
        description: this.props.intl.formatMessage(
          message.thumbsUpLoginCheackDes
        ),
        btn,
        icon: <Icon type="meh-o" style={{ color: "#A2D5F2" }} />,
        style: {
          color: "#ff7e67",
          bacground: "#fafafa"
        }
      });
    }
  }

  async _handleThumbsDown(commentId) {
    const btn = (
      <Button
        className="submit-btn subComment-btn"
        onClick={() => this._login()}
      >
        Sign In
      </Button>
    );

    let userId = this.props.user ? this.props.user._id : "",
      { commentIndex } = this.props;

    if (userId && commentId) {
      let result = await commentFetchs.thumbsDown(commentId, userId);

      if (result.code === "1") {
        this.props.setThumbsDown({
          state: result.thumbsDown,
          commentIndex: commentIndex
        });
      } else {
      }
    } else if (!userId) {
      notification.open({
        message: this.props.intl.formatMessage(message.LoginCheckMes),
        description: this.props.intl.formatMessage(
          message.thumbsDownLoginCheackDes
        ),
        btn,
        icon: <Icon type="meh-o" style={{ color: "#A2D5F2" }} />,
        style: {
          color: "#ff7e67",
          bacground: "#fafafa"
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
      return (
        <Redirect
          to={{
            pathname: pathname,
            state: redirectState
          }}
        />
      );
    }

    return (
      <Row>
        <Col md={1}>
          <Avatar avatarNum={user.avatar} />
        </Col>
        <Col md={11}>
          <Row>
            <Col md={12} sm={12}>
              <p className="commentItem-username">{user.username}</p>
            </Col>
            <Col md={12} sm={12}>
              {comment.content ? (
                <span
                  className="commentItem-content"
                  dangerouslySetInnerHTML={{
                    __html: marked(comment.content, {
                      sanitize: true
                    })
                  }}
                />
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={12}>
              <ul className="commentItem-Ul commentItem-option">
                <li>
                  {comment && comment.created_at
                    ? comment.created_at.slice(0, 10)
                    : comment}
                </li>
                <li>
                  <span
                    className="commentItem-option-btn"
                    style={comment.likesState === 1 ? { color: "#ff7e67" } : {}}
                  >
                    <FontAwesome name="thumbs-o-up" />
                    <span onClick={() => this._handleThumbsUp(comment._id)}>
                      {" "}
                      {comment.thumbsUp}
                    </span>
                  </span>
                </li>
                <li>
                  <span
                    className="commentItem-option-btn"
                    style={
                      comment.dislikesState === 1 ? { color: "#ff7e67" } : {}
                    }
                  >
                    <FontAwesome name="thumbs-o-down" />
                    <span onClick={() => this._handleThumbsDown(comment._id)}>
                      {" "}
                      {comment.thumbsDown}
                    </span>
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => this._handleShowReply(comment._id)}
                    className="commentItem-option-btn"
                  >
                    <FormattedMessage id="Reply" defaultMessage="Reply" />
                  </span>
                </li>
                <li>
                  <Popconfirm
                    title={this.props.intl.formatMessage(message.CommentReport)}
                    onConfirm={e => this._handleReport(comment._id, e)}
                    okText={this.props.intl.formatMessage(
                      message.PopcomfirmCheck
                    )}
                    cancelText={this.props.intl.formatMessage(
                      message.PopcomfirmCancel
                    )}
                  >
                    <span className="commentItem-option-btn">
                      <FormattedMessage id="Report" defaultMessage="Report" />
                    </span>
                  </Popconfirm>
                </li>
              </ul>
            </Col>
          </Row>

          <Row>
            <Col md={12} sm={12}>
              {replies.map((reply, index) => {
                return (
                  <SubCommentItem
                    key={index}
                    reply={reply}
                    commentIndex={commentIndex}
                  />
                );
              })}
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={12}>
              {comment.isShowReply ? (
                <SubCommentInput commentIndex={commentIndex} />
              ) : null}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

CommentItem.propTypes = {
  intl: PropTypes.object.isRequired,
  user: PropTypes.object,
  comments: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = state => {
  return {
    user: state.login.user,
    comments: state.comment.articleComments,
    location: state.routing.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setIsShowReply: ({ state, commentIndex }) => {
      dispatch(
        commentAction.setIsShowReply({
          state,
          commentIndex
        })
      );
    },
    setThumbsUp: ({ state, commentIndex }) => {
      dispatch(commentAction.setThumbsUp({ state, commentIndex }));
    },
    setThumbsDown: ({ state, commentIndex }) => {
      dispatch(commentAction.setThumbsDown({ state, commentIndex }));
    },
    setCommentReportedState: ({ state, commentIndex }) => {
      dispatch(
        commentAction.setCommentReportedState({
          state,
          commentIndex
        })
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(CommentItem, {
    withRef: true
  })
);
