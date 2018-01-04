import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withRouter, Redirect } from "react-router-dom";

import { Avatar } from "../../Avatar/index.js";

import {
  fetchs as commentFetchs,
  actions as CommentAction
} from "../../Comment/";
import { actions as ArticleAction } from "../../../pages/ArticleDetails/";

import { injectIntl, FormattedMessage } from "react-intl";

import { notification, Icon, Row, Col, Form, Input, Button } from "antd";
import "./style.css";
import message from "../../../locale/message";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

function validateComment(value) {
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

class CommentInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: {
        value: ""
      },
      pathname: null,
      redirectState: null
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.comment !== nextState.comment ||
      this.state.pathname !== nextState.pathname ||
      this.state.redirectState !== nextState.redirectState ||
      this.props.user !== nextProps.user ||
      this.props.article !== nextProps.article
    );
  }

  async _addComment() {
    const { comment } = this.state;

    if (comment.validateStatus === "success") {
      const { user, article } = this.props;

      const data = {
        userId: user._id,
        article: {
          _id: article._id,
          title: article.title
        },
        comment: comment.value
      };

      let result = await commentFetchs.addComment(data);
      if (result.code === "1") {
        this.props.addComment(result.comment);

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

  _handleComment = e => {
    let value = e.target.value;

    this.setState({
      comment: {
        ...validateComment(value),
        value: value
      }
    });
  };

  _login() {
    let pathname = "/login",
      redirectState = { from: this.props.location };

    this.setState({
      pathname: pathname,
      redirectState: redirectState
    });
  }
  render() {
    let { pathname, redirectState, comment } = this.state,
      { user } = this.props;

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
        <Col md={3}>
          <p className="CommentInput-label">
            {user && user.avatar ? (
              <Avatar
                avatarNum={user.avatar.toString()}
                className="CommentInput-label-avatar"
              />
            ) : (
              <FormattedMessage id="Comment" defaultMessage="defineMessages" />
            )}
          </p>
        </Col>
        <Col md={21}>
          {!user ? (
            <section className="CommentInput-UnLoginForm">
              <p className="CommentInput-UnLoginForm-text">
                <span>Please </span>
                <Button onClick={() => this._login()} className="submit-btn">
                  <FormattedMessage id="Login" defaultMessage="Sign In" />
                </Button>
                <span>（￣工￣lll）</span>
              </p>
            </section>
          ) : (
            <section className="CommentInput-form">
              <Form>
                <FormItem
                  validateStatus={comment.validateStatus}
                  help={comment.errorMsg}
                >
                  <TextArea
                    value={comment.value}
                    placeholder="<(▰˘◡˘▰)> 。。。。"
                    onChange={this._handleComment}
                  />
                </FormItem>
                <FormItem>
                  <Button
                    onClick={() => this._addComment()}
                    className="submit-btn commentButton"
                  >
                    <FormattedMessage id="Submit" defaultMessage="Submit" />
                  </Button>
                </FormItem>
              </Form>
            </section>
          )}
        </Col>
      </Row>
    );
  }
}

CommentInput.propTypes = {
  intl: PropTypes.object.isRequired,
  user: PropTypes.object,
  location: PropTypes.object,
  article: PropTypes.object,
  addComment: PropTypes.func
};

const mapStateToProps = state => ({
  user: state.login.user,
  location: state.routing.location,
  article: state.articleDetails.article
});

const mapDispatchToProps = dispatch => {
  return {
    addComment: comment => {
      dispatch(CommentAction.commentAdd(comment));
      dispatch(ArticleAction.commentAdd());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(CommentInput, {
      withRef: true
    })
  )
);
