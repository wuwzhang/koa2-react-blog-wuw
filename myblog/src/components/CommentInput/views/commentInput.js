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

import { injectIntl, FormattedMessage, defineMessages } from "react-intl";

import {
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";
import { notification, Icon, Row, Col } from "antd";
import "./style.css";

const message = defineMessages({
  CommentSucceedMsg: {
    id: "CommentSucceedMsg",
    defaultMessage: "Comment Succeed"
  },
  CommentSucceedDes: {
    id: "CommentSucceedDes",
    defaultMessage: "Commemnt Succeed"
  },
  CommentFailedMsg: {
    id: "CommentFailedMsg",
    defaultMessage: "Comment Failed"
  },
  CommentFailedDes: {
    id: "CommentFailedDes",
    defaultMessage: "Commemnt Failed"
  }
});

class CommentInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
      commentValid: null,
      commentHelp: "",
      pathname: null,
      redirectState: null
    };
  }

  _checkComment(value) {
    this.setState({
      commentValid: null,
      commentHelp: ""
    });

    if (value.length === 0) {
      this.setState({
        commentValid: "error",
        commentHelp: "评论不为空"
      });
    } else {
      this.setState({
        commentValid: "success"
      });
    }
  }

  async _addComment() {
    const { commentValid } = this.state;

    if (commentValid === "success") {
      const { user, article } = this.props,
        { comment } = this.state;

      const data = {
        userId: user._id,
        article: {
          _id: article._id,
          title: article.title
        },
        comment: comment
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
    }
  }

  _login() {
    let pathname = "/login",
      redirectState = { from: this.props.location };

    this.setState({
      pathname: pathname,
      redirectState: redirectState
    });
  }
  render() {
    let { pathname, redirectState } = this.state,
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
      <Form>
        <FormGroup>
          <Row>
            <Col md={2}>
              <ControlLabel
                validationState={this.state.commentValid}
                style={{ color: "#07689f" }}
              >
                {user && user.avatar ? (
                  <Avatar avatarNum={user.avatar.toString()} width="100%" />
                ) : (
                  <FormattedMessage
                    id="Comment"
                    defaultMessage="defineMessages"
                  />
                )}
              </ControlLabel>
            </Col>
            <Col md={22}>
              <FormControl
                componentClass="textarea"
                placeholder="Enter Comment"
                onChange={event =>
                  this.setState({ comment: event.target.value })
                }
                onBlur={event => this._checkComment(event.target.value)}
                style={{
                  height: "100px",
                  color: "#07689f",
                  border: "1px solid ##07689f"
                }}
              />
              {this.state.commentHelp && (
                <HelpBlock>{this.state.commentHelp}</HelpBlock>
              )}
            </Col>
          </Row>
          <Row>
            <Col md={4} mdOffset={20}>
              {this.props.user ? (
                <Button
                  className="commentButton submit-btn"
                  onClick={() => this._addComment()}
                >
                  <FormattedMessage id="Submit" defaultMessage="Submit" />
                </Button>
              ) : (
                <Button
                  className="commentButton submit-btn"
                  onClick={() => this._login()}
                >
                  <FormattedMessage id="Login" defaultMessage="Login" />
                </Button>
              )}
            </Col>
          </Row>
        </FormGroup>
      </Form>
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
