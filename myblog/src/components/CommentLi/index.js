import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { actions as commentsActions } from "../Comment/";
import SubCommentLi from "../subCommentLi";
import CommentOptionNav from "../CommentOptionNav/commentOptionNav.js";

import { Row, Col } from "react-bootstrap";
import { Icon, Badge } from "antd";

import "./style.css";

class CommentLi extends Component {
  _handleShowReply(params) {
    this.props.setShowReply(params);
  }

  render() {
    let { comments, commentIndex } = this.props,
      comment = comments[commentIndex],
      { user, article, replies = [], created_at } = comment;

    created_at = created_at ? created_at.slice(0, 10) : created_at;

    return (
      <section className="ArticleLi">
        <Row>
          <li className="ArticleLi-li">
            <Col md={2}>
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
                <span>{article.title}</span>
              </Link>
            </Col>
            <Col md={4}>
              <span>{comment.content}</span>
              <span style={{ color: "#999" }} className="ArticleLi-UpdateTime">
                ( {user.account}){" "}
              </span>
            </Col>
            <Col md={2}>
              <span>{created_at}</span>
              <span>{comment.thumbsUp}</span>
              <span>{comment.thumbsDown}</span>
            </Col>
            <Col md={2}>
              {comment.isRePort ? (
                <Badge status="error" text="reported" />
              ) : (
                <Badge status="success" text="not reported" />
              )}
            </Col>
            <Col md={2}>
              <CommentOptionNav
                commentIndex={commentIndex}
                myStyle={{ color: "#FF7E67" }}
              />
            </Col>
            {comment.isShowReply
              ? replies.map((reply, index) => {
                  return (
                    <SubCommentLi
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
