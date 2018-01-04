import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { actions as commentsActions } from "../Comment/";
import SubCommentLi from "../subCommentLi";
import CommentOptionNav from "../CommentOptionNav/commentOptionNav.js";

import { Icon, Badge, Row, Col } from "antd";

import "./style.css";

class CommentLi extends Component {
  _handleShowReply(params) {
    this.props.setShowReply(params);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.comments !== nextProps.comments;
  }

  render() {
    let { comments, commentIndex } = this.props,
      comment = comments[commentIndex],
      { user, article, replies = [], created_at } = comment;

    created_at = created_at ? created_at.slice(0, 10) : created_at;

    return (
      <section className="ArticleLi">
        <Row>
          <li className="commentLi-li">
            <section className="comementLi">
              <Col md={4}>
                {replies && replies.length > 0 && !comment.isShowReply ? (
                  <span
                    className="commentLi-toggle-btn"
                    onClick={() =>
                      this._handleShowReply({ commentIndex, state: true })
                    }
                  >
                    <Icon type="right" />&nbsp;&nbsp;
                  </span>
                ) : null}
                {replies && replies.length > 0 && comment.isShowReply ? (
                  <span
                    className="commentLi-toggle-btn"
                    onClick={() =>
                      this._handleShowReply({ commentIndex, state: false })
                    }
                  >
                    <Icon type="down" />&nbsp;&nbsp;
                  </span>
                ) : null}
                <Link to={`/article_details/${article._id}`}>
                  <span className="commentLi-articleTitle">
                    {article.title}
                  </span>
                </Link>
              </Col>
              <Col md={8}>
                <p className="commentLi-li-message">
                  <span>{comment.content}</span>
                  <span
                    style={{ color: "#999" }}
                    className="ArticleLi-UpdateTime"
                  >
                    ( {user.account}){" "}
                  </span>
                </p>
              </Col>
              <Col md={4}>
                <p className="commentLi-li-message commentAdmin-message">
                  <span>{created_at}</span>
                  <span>{comment.thumbsUp}</span>
                  <span>{comment.thumbsDown}</span>
                </p>
              </Col>
              <Col md={4}>
                {comment.isRePort ? (
                  <Badge status="error" text="reported" />
                ) : (
                  <Badge status="success" text="not reported" />
                )}
              </Col>
              <Col md={4}>
                <CommentOptionNav
                  commentIndex={commentIndex}
                  myStyle={{ color: "#FF7E67" }}
                />
              </Col>
            </section>
            {comment.isShowReply
              ? replies.map((reply, index) => {
                  return (
                    <SubCommentLi
                      key={`SubCommentLi${index}`}
                      commentIndex={commentIndex}
                      subCommentIndex={index}
                    />
                  );
                })
              : null}
          </li>
        </Row>
      </section>
    );
  }
}

CommentLi.PropTypes = {
  commentIndex: PropTypes.number.isRequired,
  comments: PropTypes.object.isRequired,
  setShowReply: PropTypes.func
};

const mapStateToProps = state => ({
  comments: state.comment.allComment
});

const mapDispatchToProps = dispatch => {
  return {
    setShowReply: params => {
      dispatch(commentsActions.setAdminIsShowReply(params));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentLi);
