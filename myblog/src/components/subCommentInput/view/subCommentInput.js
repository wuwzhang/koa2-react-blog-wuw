import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";

import { Avatar } from "../../Avatar/index.js";

import {
  fetchs as commentFetchs,
  actions as commentAction
} from "../../Comment/";

import { notification, Icon, Row, Col, Form, Button, Input } from "antd";
import "./style.css";
import message from "../../../locale/message";

import { injectIntl, FormattedMessage } from "react-intl";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

function validateSubComment(value) {
  if (value.length === 0) {
    return {
      validateStatus: "error",
      errorMsg: "评论不为空"
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  }
}

class SubCommentInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subComment: {
        value: ""
      },
      pathname: null,
      redirectState: null
    };
  }

  async _addSubComment() {
    let { user, commentIndex, comments } = this.props,
      comment = comments[commentIndex],
      parentId = comment._id,
      { subComment } = this.state;

    if (subComment.validateStatus === "success") {
      const data = {
        parentId: parentId,
        subComment: subComment.value,
        userId: user._id
      };

      console.log(data);

      let result = await commentFetchs.addSubComment(data);

      if (result.code === "1") {
        this.props.successComment(
          {
            subComment: {
              _id: result._id,
              user: user,
              content: subComment.value,
              created_at: result.created_at,
              isRePort: false
            },
            commentIndex: commentIndex
          },
          {
            state: false,
            commentIndex: commentIndex
          }
        );

        notification.open({
          message: this.props.intl.formatMessage(message.CommentSucceedMsg),
          description: this.props.intl.formatMessage(message.CommentSucceedDes),
          icon: <Icon type="smile-o" style={{ color: "#A2D5F2" }} />,
          style: {
            color: "#ff7e67",
            bacground: "#fafafa"
          }
        });
      } else {
        notification.open({
          message: this.props.intl.formatMessage(message.CommentFailedMsg),
          description: this.props.intl.formatMessage(message.CommentFailedDes),
          icon: <Icon type="meh-o" style={{ color: "#ff7e67" }} />,
          style: {
            color: "#A2D5F2",
            bacground: "#fafafa"
          }
        });
      }
    } else {
      notification.open({
        message: this.props.intl.formatMessage(message.CheckMsgMsg),
        description: this.props.intl.formatMessage(message.CheckMsgDes),
        icon: <Icon type="meh-o" style={{ color: "#ff7e67" }} />,
        style: {
          color: "#A2D5F2",
          bacground: "#fafafa"
        }
      });
    }
  }

  _login(e) {
    e.preventDefault();
    let pathname = "/login",
      redirectState = { from: this.props.location };

    this.setState({
      pathname: pathname,
      redirectState: redirectState
    });
  }

  _handleSubComment = e => {
    let value = e.target.value;

    this.setState({
      subComment: {
        ...validateSubComment(value),
        value: value
      }
    });
  };

  render() {
    let { pathname, redirectState, subComment } = this.state,
      { user } = this.props;
    if (pathname && redirectState) {
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
      <section className="subCommentInput">
        <Row>
          <Col md={2}>
            {user && user.avatar ? (
              <Avatar
                avatarNum={user.avatar.toString()}
                className="CommentInput-label-avatar"
                width="40px"
              />
            ) : (
              <FormattedMessage id="Comment" defaultMessage="defineMessages" />
            )}
          </Col>
          <Col md={20}>
            <Row>
              <Form>
                <Col md={20}>
                  <FormItem
                    validateStatus={subComment.validateStatus}
                    help={subComment.errorMsg}
                  >
                    <TextArea
                      value={subComment.value}
                      placeholder=""
                      onChange={this._handleSubComment}
                    />
                  </FormItem>
                </Col>
                <Col md={{ span: 2, offset: 1 }}>
                  <FormItem>
                    {this.props.user ? (
                      <Button
                        className="submit-btn subComment-btn"
                        onClick={() => this._addSubComment()}
                      >
                        <FormattedMessage id="Submit" defaultMessage="Submit" />
                      </Button>
                    ) : (
                      <Button
                        className="submit-btn subComment-btn"
                        onClick={e => this._login(e)}
                      >
                        <FormattedMessage id="Login" defaultMessage="Login" />
                      </Button>
                    )}
                  </FormItem>
                </Col>
              </Form>
            </Row>
          </Col>
        </Row>
      </section>
    );
  }
}

SubCommentInput.propTypes = {
  intl: PropTypes.object.isRequired,
  commentIndex: PropTypes.number.isRequired,
  user: PropTypes.object,
  location: PropTypes.object,
  comments: PropTypes.object,
  successComment: PropTypes.func
};

const mapStateToProps = state => {
  return {
    user: state.login.user,
    location: state.routing.location,
    comments: state.comment.articleComments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    successComment: (addSubData, replyState) => {
      dispatch(commentAction.setIsShowReply(replyState));
      dispatch(commentAction.addSubComment(addSubData));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(SubCommentInput, {
      withRef: true
    })
  )
);
