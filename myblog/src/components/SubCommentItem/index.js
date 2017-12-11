import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { Avatar } from "../Avatar/index.js";
import { fetchs as commentFetchs } from "../Comment/";

import "./style.css";

import { notification, Button, Icon, Popconfirm } from "antd";
import { injectIntl, FormattedMessage, defineMessages } from "react-intl";

const marked = require("marked");

const message = defineMessages({
  CommentReport: {
    id: "CommentReport",
    defaultMessage: "Are you sure"
  },
  LoginCheckMes: {
    id: "LoginCheckMes",
    defaultMessage: "Sign In"
  },
  ReportLoginCheackDes: {
    id: "ReportLoginCheackDes",
    defaultMessage: "Please sign in first"
  },
  ReportSuccessMsg: {
    id: "ReportSuccessMsg",
    defaultMessage: "Report Success"
  },
  ReportSuccessDes: {
    id: "ReportSuccessDes",
    defaultMessage: "Report Success"
  },
  ReportFailMsg: {
    id: "ReportFailMsg",
    defaultMessage: "Report Failed"
  },
  ReportFailDes: {
    id: "ReportFailDes",
    defaultMessage: "Report Failed"
  },
  PopcomfirmCheck: {
    id: "PopcomfirmCheck",
    defaultMessage: "yes"
  },
  PopcomfirmCancel: {
    id: "PopcomfirmCancel",
    defaultMessage: "cancle"
  }
});

class SubCommentItem extends Component {
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

  async _handleSubReport(commentId, e) {
    e.preventDefault();

    const btn = (
      <Button
        className="submit-btn subComment-btn"
        onClick={() => this._login()}
      >
        Sign In
      </Button>
    );

    let { user, commentIndex, comments } = this.props,
      comment = comments[commentIndex],
      parentId = comment._id;

    // console.log(parentId);

    if (user) {
      console.log("parentId", parentId, "commentId", commentId);
      if (parentId && commentId) {
        let userId = user._id,
          result = await commentFetchs.subCommentReport({
            commentId,
            parentId,
            userId
          });

        if (result.code === "1") {
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
            message: this.props.intl.formatMessage(message.ReportSuccessMsg),
            description: this.props.intl.formatMessage(
              message.ReportSuccessDes
            ),
            icon: <Icon type="meh-o" style={{ color: "#A2D5F2" }} />,
            style: {
              color: "#ff7e67",
              bacground: "#fafafa"
            }
          });
        }
      } else {
        console.error("subCommentItem - parentId 参数错误");
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

  render() {
    let { reply } = this.props,
      { pathname, redirectState } = this.state,
      user = reply.user;

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
      <section className="subCommentItem">
        <ul className="subCommentItem-ul">
          <li style={{ width: "4%", marginRight: "5px", minWidth: "34px" }}>
            <Avatar avatarNum={user.avatar} width={"100%"} />
          </li>
          <li style={{ width: "94%" }}>
            <ul>
              <li>
                <p className="commentItem-username">
                  {user.username}:&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
              </li>
              <li>
                {reply.content ? (
                  <span
                    className="commentItem-content"
                    dangerouslySetInnerHTML={{
                      __html: marked(reply.content, { sanitize: true })
                    }}
                  />
                ) : null}
              </li>
            </ul>
            <ul>
              <li>
                {reply.created_at ? reply.created_at.slice(0, 10) : reply}
              </li>
              <li>
                <Popconfirm
                  title={this.props.intl.formatMessage(message.CommentReport)}
                  onConfirm={e => this._handleSubReport(reply._id, e)}
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
          </li>
        </ul>
      </section>
    );
  }
}

SubCommentItem.propTypes = {
  comments: PropTypes.object,
  user: PropTypes.object,
  commentIndex: PropTypes.number.isRequired,
  reply: PropTypes.object,
  intl: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  comments: state.comment.articleComments,
  user: state.login.user,
  location: state.routing.location
});

export default connect(mapStateToProps)(
  injectIntl(SubCommentItem, {
    withRef: true
  })
);
