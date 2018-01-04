import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";

import {
  actions as messageActions,
  fetchs as messageFetchs
} from "../../Contact/";
import {
  actions as commentActions,
  fetchs as commentFetchs
} from "../../Comment/";
import {
  actions as loginActions,
  fetchs as loginFetchs
} from "../../../pages/Login/";

import "./style.css";
import FontAwesome from "react-fontawesome";
import { Badge, Icon, Menu, Dropdown, Row, Col, notification } from "antd";

import message from "../../../locale/message";

class TopMenu extends Component {
  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  async componentDidMount() {
    let token = window.localStorage.getItem("token");

    if (token && !this.props.user) {
      this.loginByToken(token);
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.messagecommentNotCheckedCount !==
        nextProps.messagecommentNotCheckedCount ||
      this.props.commentcommentReportedCount !==
        nextProps.commentcommentReportedCount ||
      this.props.commentcommentNotCheckedCount !==
        nextProps.commentcommentNotCheckedCount ||
      this.props.user !== nextProps.user ||
      this.props.location !== nextProps.location
    );
  }

  async handleSignOut(event) {
    event.preventDefault();
    let { user } = this.props;

    let result = await loginFetchs.logout(user._id);
    if (result.code === "1") {
      notification.open({
        message: this.props.intl.formatMessage(message.LogoutSuccessMsg),
        description: this.props.intl.formatMessage(message.LogoutSuccessDsc),
        icon: <Icon type="smile-o" style={{ color: "#ff7e67" }} />,
        style: {
          color: "#ff7e67",
          bacground: "#fafafa"
        }
      });
    } else {
      notification.open({
        message: this.props.intl.formatMessage(message.LogoutFailMsg),
        description: this.props.intl.formatMessage(message.LogoutFailDsc),
        icon: <Icon type="meh-o" style={{ color: "#A2D5F2" }} />,
        style: {
          color: "#ff7e67",
          bacground: "#fafafa"
        }
      });
    }

    this.props.loginOut(user);
    window.localStorage.removeItem("token");
  }

  async loginByToken(token) {
    await loginFetchs
      .getUserByToken(token)
      .then(async (res, err) => {
        if (err) {
          throw new Error(err);
        }

        let user = res.user;
        if (res.code === "1") {
          this.props.loginByToken(user);
        }

        if (user && user.level === 0) {
          try {
            return await Promise.all([
              messageFetchs.getNotCheckedMessages(),
              commentFetchs.getNotCheckedAndReportedComments()
            ]);
          } catch (e) {
            throw new Error(e);
          }
        } else {
          return res;
        }
      })
      .then(res => {
        if (Array.isArray(res) && res.length === 2) {
          let message = res[0],
            comment = res[1];

          if (message.code === "1") {
            this.props.initNotCheckedMessage(message.result);
          }

          if (comment.code === "1") {
            this.props.initNotCheckedAndReportedComment(
              comment.result.notCheckedCount,
              comment.result.reportedCount
            );
          }
        }
      });
  }

  render() {
    let {
      commentcommentNotCheckedCount = 0,
      commentcommentReportedCount = 0,
      messagecommentNotCheckedCount = 0,
      ...resProps
    } = this.props;

    return (
      <div className="container" {...resProps}>
        <Row>
          <nav className="top-menu">
            <Col md={16} sm={24} xs={24}>
              <ul className="base-option">
                <li className="base-item">
                  <Link to="/home">
                    <FontAwesome name="home" />
                    <FormattedMessage id="Home" defaultMessage="Home" />
                  </Link>
                </li>
                <li className="base-item">
                  <Link to="/Keep_On_File">
                    <FontAwesome name="pencil" />
                    <FormattedMessage id="Article" defaultMessage="Article" />
                  </Link>
                </li>
                <li className="base-item">
                  <Link to="/About">
                    <FontAwesome name="pagelines" />
                    <FormattedMessage id="About" defaultMessage="About Me" />
                  </Link>
                </li>
              </ul>
            </Col>
            <Col md={6} sm={8} xs={18}>
              {this.props.user ? (
                <ul className="base-option">
                  <li className="base-item">
                    <p className="base-item" onClick={this.handleSignOut}>
                      <FontAwesome
                        style={{ color: "#FF7E67" }}
                        name="user-circle-o"
                      />
                      <FormattedMessage id="Logout" defaultMessage="Sign Out" />
                    </p>
                  </li>
                  {this.props.user.level === 0 ? (
                    <li className="base-item">
                      {commentcommentNotCheckedCount > 0 ||
                      commentcommentReportedCount > 0 ||
                      messagecommentNotCheckedCount > 0 ? (
                        <Dropdown overlay={menu}>
                          <Link
                            className="ant-dropdown-link"
                            to="/article_admim"
                          >
                            <Badge
                              count={
                                commentcommentNotCheckedCount +
                                commentcommentReportedCount +
                                messagecommentNotCheckedCount
                              }
                            >
                              <Icon type="bell" style={{ color: "#FAFAFA" }} />
                            </Badge>
                            &nbsp;&nbsp;&nbsp;
                            <Icon type="down" />
                          </Link>
                        </Dropdown>
                      ) : (
                        <Dropdown overlay={menu}>
                          <Link
                            className="ant-dropdown-link"
                            to="/Keep_On_File"
                          >
                            <Icon type="bell" style={{ color: "#FAFAFA" }} />
                            &nbsp;&nbsp;&nbsp;
                            <Icon type="down" />
                          </Link>
                        </Dropdown>
                      )}
                    </li>
                  ) : (
                    <li className="login-tip" style={{ fontWight: 100 }}>
                      Hi! {this.props.user.username}~
                    </li>
                  )}
                </ul>
              ) : (
                <ul className="base-option">
                  <li className="base-item">
                    <Link
                      to={{
                        pathname: "/login",
                        state: { from: this.props.location }
                      }}
                    >
                      <FontAwesome name="user-circle" />
                      <FormattedMessage id="Login" defaultMessage="Sign In" />
                    </Link>
                  </li>
                  <li className="base-item">
                    <Link to="/regist">
                      <FontAwesome name="user-plus" />
                      <FormattedMessage id="Regist" defaultMessage="Sign Up" />
                    </Link>
                  </li>
                </ul>
              )}
            </Col>
            <Col md={2} sm={4} xs={6}>
              <section className="languageToggle base-option TopMenu-language">
                <ul>
                  <li>
                    <p>
                      <a href="?locale=zh-CN">
                        <FormattedMessage id="Chinses" defaultMessage="Zn" />
                      </a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="?locale=en-US">
                        <FormattedMessage id="English" defaultMessage="En" />
                      </a>
                    </p>
                  </li>
                </ul>
              </section>
            </Col>
          </nav>
        </Row>
      </div>
    );
  }
}
const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/article_admin">
        <FormattedMessage id="ArticleList" defaultMessage="Article List" />
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/comment_admin">
        <FormattedMessage id="Comment" defaultMessage="Comment" />
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/message_admin">
        <FormattedMessage id="Message" defaultMessage="Message" />
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/setting_admin">
        <FormattedMessage id="Setting" defaultMessage="Setting" />
      </Link>
    </Menu.Item>
  </Menu>
);

TopMenu.propTypes = {
  intl: PropTypes.object.isRequired,
  user: PropTypes.object,
  loginOut: PropTypes.func,
  loginByToken: PropTypes.func,
  initNotCheckedAndReportedComment: PropTypes.func,
  initNotCheckedMessage: PropTypes.func,
  commentcommentNotCheckedCount: PropTypes.number.isRequired,
  commentcommentReportedCount: PropTypes.number.isRequired,
  messagecommentNotCheckedCount: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  user: state.login.user,
  location: state.routing.location,
  commentcommentNotCheckedCount: state.comment.NotCheckedCount || 0,
  commentcommentReportedCount: state.comment.ReportCount || 0,
  messagecommentNotCheckedCount: state.message.NotCheckedCount || 0
});

const mapDispatchToProps = dispatch => {
  return {
    loginByToken: user => {
      dispatch(loginActions.finishLogin(user));
    },
    loginOut: user => {
      dispatch(loginActions.loginOut(user));
    },
    initNotCheckedAndReportedComment: (notCheckedCount, reportedCount) => {
      dispatch(
        commentActions.commentNotCheckedAndReported(
          notCheckedCount,
          reportedCount
        )
      );
    },
    initNotCheckedMessage: count => {
      dispatch(messageActions.messageNotChecked(count));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(TopMenu, { withRef: true })
);
