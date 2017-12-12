import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  actions as commentsActions,
  fetchs as commentsFetchs
} from "../Comment/";

import { notification, Badge, Icon, Popconfirm, Row, Col } from "antd";

import { injectIntl, FormattedMessage } from "react-intl";

import "./style.css";

import message from "../../locale/message";

class SubCommentLi extends Component {
  async _handleDeleteSubComment(commentId, subCommentId, e) {
    e.preventDefault();

    let result = await commentsFetchs.deleteSubComment({
      commentId,
      subCommentId
    });

    let { commentIndex, subCommentIndex } = this.props;

    if (result.code === "1") {
      this.props.setSubCommentDeleted(commentIndex, subCommentIndex);
      notification.open({
        message: this.props.intl.formatMessage(message.DeleteSuccessMsg),
        description: this.props.intl.formatMessage(message.DeleteSuccessDes),
        icon: <Icon type="smile-o" style={{ color: "#ff7e67" }} />,
        style: {
          color: "#A2D5F2",
          bacground: "#fafafa"
        }
      });
    } else {
      notification.open({
        message: this.props.intl.formatMessage(message.DeleteFailMsg),
        description: this.props.intl.formatMessage(message.DeleteFailDes),
        icon: <Icon type="meh-o" style={{ color: "#A2D5F2" }} />,
        style: {
          color: "#ff7e67",
          bacground: "#fafafa"
        }
      });
    }
  }

  async _handleChancelSubComment(commentId, subCommentId, e) {
    e.preventDefault();

    let result = await commentsFetchs.chancelSubComment({
      commentId,
      subCommentId
    });

    if (result.code === "1") {
      let { commentIndex, subCommentIndex } = this.props;
      this.props.setSubCommentCanceled(commentIndex, subCommentIndex);
      notification.open({
        message: this.props.intl.formatMessage(message.DeleteSuccessMsg),
        description: this.props.intl.formatMessage(message.DeleteSuccessDes),
        icon: <Icon type="smile-o" style={{ color: "#ff7e67" }} />,
        style: {
          color: "#A2D5F2",
          bacground: "#fafafa"
        }
      });
    } else {
      notification.open({
        message: this.props.intl.formatMessage(message.DeleteFailMsg),
        description: this.props.intl.formatMessage(message.DeleteFailDes),
        icon: <Icon type="meh-o" style={{ color: "#A2D5F2" }} />,
        style: {
          color: "#ff7e67",
          bacground: "#fafafa"
        }
      });
    }
  }

  render() {
    let { commentIndex, subCommentIndex, comments } = this.props,
      comment = comments[commentIndex],
      replies = comment.replies,
      reply = replies[subCommentIndex],
      { content, created_at, isRePort, _id } = reply;

    created_at = created_at ? created_at.slice(0, 10) : created_at;

    return (
      <section className="subCommentLi">
        <Row>
          <Col md={{ span: 8, offset: 4 }}>
            <span>{content}</span>
          </Col>
          <Col md={4}>
            <span>{created_at}</span>
          </Col>
          <Col md={4}>
            {isRePort ? (
              <Badge status="error" text="reported" />
            ) : (
              <Badge status="success" text="not reported" />
            )}
          </Col>
          <Col md={4}>
            <Popconfirm
              title={this.props.intl.formatMessage(message.CheckChancel)}
              onConfirm={e => this._handleDeleteSubComment(_id, comment.id, e)}
              okText={this.props.intl.formatMessage(message.PopcomfirmCheck)}
              cancelText={this.props.intl.formatMessage(
                message.PopcomfirmCancel
              )}
            >
              <span className="commentItem-option-btn subCommentItem-option-btn">
                <FormattedMessage id="Delete" defaultMessage="Delete" />
              </span>
            </Popconfirm>
            {isRePort ? (
              <Popconfirm
                title={this.props.intl.formatMessage(message.CheckChancel)}
                onConfirm={e =>
                  this._handleChancelSubComment(_id, comment.id, e)
                }
                okText={this.props.intl.formatMessage(message.PopcomfirmCheck)}
                cancelText={this.props.intl.formatMessage(
                  message.PopcomfirmCancel
                )}
              >
                <span className="commentItem-option-btn subCommentItem-option-btn">
                  <FormattedMessage id="Cancel" defaultMessage="Cancel" />
                </span>
              </Popconfirm>
            ) : null}
          </Col>
        </Row>
      </section>
    );
  }
}

SubCommentLi.PropTypes = {
  commentIndex: PropTypes.number.isRequired,
  subCommentIndex: PropTypes.number.isRequired,
  comments: PropTypes.object,
  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  comments: state.comment.allComment
});

const mapDispatchToProps = dispatch => {
  return {
    setSubCommentDeleted: (commentIndex, subCommentIndex) => {
      dispatch(
        commentsActions.deleteSubComment({ commentIndex, subCommentIndex })
      );
    },
    setSubCommentCanceled: (commentIndex, subCommentIndex) => {
      dispatch(
        commentsActions.cancelSubComment({ commentIndex, subCommentIndex })
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(SubCommentLi, {
    withRef: true
  })
);
