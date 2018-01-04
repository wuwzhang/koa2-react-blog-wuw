import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchs as commentFetch, actions as commentAction } from "../Comment/";

import { Popconfirm } from "antd";

import "./style.css";

import { injectIntl, FormattedMessage } from "react-intl";
import message from "../../locale/message";

class CommentOptionNav extends Component {
  async _deleteComment(event, article, commentId, isChecked, isRePort) {
    event.preventDefault();

    let result = await commentFetch.deleteComment(commentId, article);

    if (result.code === "1") {
      this.props.deleteComment(this.props.commentIndex, isChecked, isRePort);
    } else {
    }
  }

  async _checkComment(event, commentId) {
    event.preventDefault();

    let result = await commentFetch.changeCommentCheck(commentId);

    if (result.code === "1") {
      this.props.setCommentChecked(this.props.commentIndex);
    } else {
    }
  }

  async _chancelComment(event, commentId) {
    event.preventDefault();

    let result = await commentFetch.cancleComment(commentId);

    if (result.code === "1") {
      this.props.setCommentChancel(this.props.commentIndex, false);
    } else {
    }
  }

  render() {
    let { myStyle = { color: "#07689F" }, commentIndex, comments } = this.props,
      comment = comments[commentIndex],
      { isChecked, isRePort } = comment;

    return (
      <nav className="article-option-nav">
        <ul>
          <li>
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={e =>
                this._deleteComment(
                  e,
                  comment.article,
                  comment.id,
                  isChecked,
                  isRePort
                )
              }
              okText="Yes"
              cancelText="No"
            >
              <span style={myStyle}>
                <FormattedMessage id="Delete" defaultMessage="Delete" />
              </span>
            </Popconfirm>
          </li>
          <li>
            {isChecked ? (
              <span className="comment-checked">
                <FormattedMessage id="Checked" defaultMessage="Checked" />
              </span>
            ) : (
              <span>
                <Popconfirm
                  title={this.props.intl.formatMessage(message.CheckDelete)}
                  onConfirm={e => this._checkComment(e, comment.id)}
                  okText={this.props.intl.formatMessage(
                    message.PopcomfirmCheck
                  )}
                  cancelText={this.props.intl.formatMessage(
                    message.PopcomfirmCancel
                  )}
                >
                  <span style={myStyle}>
                    <FormattedMessage id="Check" defaultMessage="Check" />
                  </span>
                </Popconfirm>
              </span>
            )}
          </li>
          <li>
            {isRePort ? (
              <span>
                <Popconfirm
                  title={this.props.intl.formatMessage(message.CheckDelete)}
                  onConfirm={e => this._chancelComment(e, comment.id)}
                  okText={this.props.intl.formatMessage(
                    message.PopcomfirmCheck
                  )}
                  cancelText={this.props.intl.formatMessage(
                    message.PopcomfirmCancel
                  )}
                >
                  <span style={myStyle}>
                    <FormattedMessage id="Cancel" defaultMessage="Cancel" />
                  </span>
                </Popconfirm>
              </span>
            ) : null}
          </li>
        </ul>
      </nav>
    );
  }
}

CommentOptionNav.propTypes = {
  intl: PropTypes.object.isRequired,
  deleteComment: PropTypes.func,
  setCommentChecked: PropTypes.func,
  setCommentChancel: PropTypes.func,
  articleId: PropTypes.string.isRequired,
  commentIndex: PropTypes.number.isRePort,
  comments: PropTypes.array
};

const mapStateToProps = state => ({
  comments: state.comment.allComment
});

const mapDispatchToProps = dispatch => {
  return {
    deleteComment: (commentIndex, checked, reported) => {
      dispatch(commentAction.commentDelete(commentIndex, checked, reported));
    },
    setCommentChecked: commentIndex => {
      dispatch(commentAction.commentChecked(commentIndex));
    },
    setCommentChancel: (commentIndex, state) => {
      dispatch(commentAction.commentCancel({ commentIndex, state }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(CommentOptionNav, {
    withRef: true
  })
);
