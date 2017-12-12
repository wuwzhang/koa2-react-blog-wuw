import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";

import { Avatar } from "../../Avatar/index.js";

import {
  fetchs as commentFetchs,
  actions as commentAction
} from "../../Comment/";

import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { notification, Icon, Row, Col } from "antd";
import "./style.css";

import { injectIntl, FormattedMessage, defineMessages } from "react-intl";

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

class SubCommentInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subComment: "",
      pathname: null,
      redirectState: null
    };
  }

  async _addSubComment() {
    let { user, commentIndex, comments } = this.props,
      comment = comments[commentIndex],
      parentId = comment.id,
      { subComment } = this.state;

    const data = {
      parentId: parentId,
      subComment: subComment,
      userId: user._id
    };

    let result = await commentFetchs.addSubComment(data);

    if (result.code === "1") {
      this.props.successComment(
        {
          subComment: {
            user: user,
            content: subComment,
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

  render() {
    let { pathname, redirectState } = this.state,
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
        <Form>
          <FormGroup>
            <Row>
              <Col md={2}>
                {this.props.user ? (
                  <Avatar avatarNum={user.avatar} />
                ) : (
                  <FormattedMessage id="Comment" defaultMessage="Comment" />
                )}
              </Col>
              <Col md={20}>
                <FormControl
                  componentClass="textarea"
                  placeholder="Enter Comment"
                  onChange={event =>
                    this.setState({ subComment: event.target.value })
                  }
                />
              </Col>
              <Col md={2}>
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
              </Col>
            </Row>
          </FormGroup>
        </Form>
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
