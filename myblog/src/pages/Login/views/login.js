import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";

import { login, loginByGithub } from "../fetch";
import { view as TopMenu } from "../../../components/TopMenu/";
// import { view as FieldGroup } from "../../../components/FieldGroup";
import {
  fetchs as commentFetch,
  actions as commentAction
} from "../../../components/Comment/";
import {
  fetchs as messageFetch,
  actions as messageAction
} from "../../../components/Contact/";
import { injectIntl, FormattedMessage } from "react-intl";

import {
  startLogin,
  finishLogin,
  failLogin,
  loginFail,
  loginSuccess
} from "../action";

import { notification, Icon, Input, Form, Button, Col, Row } from "antd";
import QueueAnim from "rc-queue-anim";

import "./style.css";
import message from "../../../locale/message";

const FormItem = Form.Item;

function validateAccount(value) {
  if (value.length < 6) {
    return {
      validateStatus: "error",
      errorMsg: "账号长度不小于6"
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  }
}

function validatePassword(value) {
  if (value.length < 6) {
    return {
      validateStatus: "error",
      errorMsg: "密码长度不小于6"
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  }
}

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      account: { value: "" },
      password: { value: "" },
      loading: false,
      failMessage: ""
    };

    this._signInByGithub = this._signInByGithub.bind(this);
    let { fromPath } = this.props;
    let path = fromPath.state ? fromPath.state.from.pathname : "";
    if (path) {
      sessionStorage.setItem("fromPath", path);
    }
  }

  async _signIn() {
    let { account, password } = this.state;

    this.props.startLogin();

    if (
      account.validateStatus === "success" &&
      password.validateStatus === "success"
    ) {
      account = account.value;
      password = password.value;
      await login({ account, password })
        .then(async res => {
          if (res.code === "1") {
            this.props.successLogin(res.user, res.message);
            notification.open({
              message: this.props.intl.formatMessage(message.LoginSuccessMsg),
              description: this.props.intl.formatMessage(
                message.LoginSuccessDsc
              ),
              icon: <Icon type="smile-o" style={{ color: "#ff7e67" }} />,
              style: {
                color: "#ff7e67",
                bacground: "#fafafa"
              }
            });

            if (res.token) {
              window.localStorage.setItem("token", res.token);
            }

            if (res.user && res.user.level === 0) {
              try {
                return await Promise.all([
                  messageFetch.getNotCheckedMessages(),
                  commentFetch.getNotCheckedAndReportedComments()
                ]);
              } catch (e) {
                throw new Error(e);
              }
            }
          } else {
            this.props.failLogin(res.message);
            if (res.code === "-1") {
              this.setState({
                failMessage: "LoginFailEmailCheck"
              });
            } else {
              this.setState({
                failMessage: "LoginFailPswErr"
              });
            }

            notification.open({
              message: this.props.intl.formatMessage(message.LoginFailMsg),
              description: this.props.intl.formatMessage(
                message[this.state.failMessage]
              ),
              icon: <Icon type="meh-o" style={{ color: "#A2D5F2" }} />,
              style: {
                color: "#ff7e67",
                bacground: "#fafafa"
              }
            });

            return false;
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
    } else {
      notification.open({
        message: this.props.intl.formatMessage(message.CheckMsgMsg),
        description: this.props.intl.formatMessage(message.CheckMsgDes),
        icon: <Icon type="meh-o" style={{ color: "#A2D5F2" }} />,
        style: {
          color: "#ff7e67",
          bacground: "#fafafa"
        }
      });
    }
  }

  async _signInByGithub(event) {
    event.preventDefault();

    let result = await loginByGithub();

    if (result.code === "1") {
      window.location.href = result.path;
    }
  }

  _handleAccount = e => {
    let value = e.target.value;
    this.setState({
      account: {
        ...validateAccount(e.target.value),
        value: value
      }
    });
  };

  _handlePassword = e => {
    let value = e.target.value;
    this.setState({
      password: {
        ...validatePassword(e.target.value),
        value: value
      }
    });
  };

  _handleKeyPress(event) {
    if (event.key === "Enter") {
      this._signIn();
    }
  }

  render() {
    let { user, fromPath, msgType } = this.props,
      { account, password } = this.state;

    if (msgType === "success" && user && fromPath.state) {
      return (
        <Redirect
          to={{
            pathname: fromPath.state.from.pathname
          }}
        />
      );
    }

    return (
      <section className="Login-Bg">
        <section className="All-Nav">
          <TopMenu />
        </section>
        <div className="container">
          <section className="login-cover">
            <Col
              className="login-container"
              md={{ span: 8, offset: 8 }}
              xs={20}
              sm={{ span: 6, offset: 6 }}
            >
              <QueueAnim className="login">
                <Row key="logina">
                  <Col md={{ span: 22, offset: 1 }}>
                    <h2>
                      <FormattedMessage id="Login" defaultMessage="Sign In" />
                    </h2>
                  </Col>
                </Row>
                <Row key="loginb">
                  <Col md={{ span: 22, offset: 1 }}>
                    <Form>
                      <FormItem
                        label={this.props.intl.formatMessage(message.Account)}
                        validateStatus={account.validateStatus}
                        help={account.errorMsg}
                      >
                        <Input
                          value={account.value}
                          onChange={this._handleAccount}
                        />
                      </FormItem>
                      <FormItem
                        label={this.props.intl.formatMessage(message.Password)}
                        validateStatus={password.validateStatus}
                        help={password.errorMsg}
                      >
                        <Input
                          value={password.value}
                          onChange={this._handlePassword}
                          onKeyPress={e => this._handleKeyPress(e)}
                          type="password"
                        />
                      </FormItem>
                      <Row>
                        <Col md={10} sm={10} xs={24}>
                          <FormItem>
                            <Button
                              className="submit-btn login-btn"
                              onClick={() => this._signIn()}
                            >
                              <FormattedMessage
                                id="Login"
                                defaultMessage="Sign In"
                              />
                            </Button>
                          </FormItem>
                        </Col>
                        <Col md={14} sm={14} xs={24}>
                          <p className="login-other">
                            <Link to="/forget_psw">
                              <FormattedMessage
                                id="ForgetPsw"
                                defaultMessage="Forget Password"
                              />
                            </Link>{" "}
                            or{" "}
                            <Link to="/regist">
                              <FormattedMessage
                                id="RegistNow"
                                defaultMessage="Regist Now"
                              />
                            </Link>
                          </p>
                        </Col>
                      </Row>
                    </Form>
                    <section className="login-thirdPart">
                      <Link
                        style={{
                          fontSize: "22px",
                          color: "rgba(0, 0, 0, .65)"
                        }}
                        onClick={this._signInByGithub}
                        to="/login/github"
                      >
                        <Icon type="github" />
                      </Link>
                    </section>
                  </Col>
                </Row>
              </QueueAnim>
            </Col>
          </section>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  intl: PropTypes.object.isRequired,
  user: PropTypes.object,
  msgType: PropTypes.string,
  fromPath: PropTypes.object,
  startLogin: PropTypes.func,
  successLogin: PropTypes.func,
  failLogin: PropTypes.func
};

const mapStateToProps = state => ({
  msgType: state.login.msgType,
  user: state.login.user,
  fromPath: state.routing.location
});

const mapDispatchToProps = dispatch => {
  return {
    startLogin: () => {
      dispatch(startLogin());
    },
    successLogin: (user, message) => {
      dispatch(finishLogin(user));
      dispatch(loginSuccess(message));
    },
    failLogin: message => {
      dispatch(failLogin(message));
      dispatch(loginFail(message));
    },
    initNotCheckedAndReportedComment: (notCheckedCount, reportedCount) => {
      dispatch(
        commentAction.commentNotCheckedAndReported(
          notCheckedCount,
          reportedCount
        )
      );
    },
    initNotCheckedMessage: count => {
      dispatch(messageAction.messageNotChecked(count));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(Login, { withRef: true })
  )
);
