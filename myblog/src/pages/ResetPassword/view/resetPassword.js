import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { view as TopMenu } from "../../../components/TopMenu/";

import { resetPsw } from "../fetch";

import { injectIntl, FormattedMessage } from "react-intl";

import { notification, Icon, Input, Form, Button, Col, Row } from "antd";
import QueueAnim from "rc-queue-anim";

import "./style.css";
import message from "../../../locale/message";

const FormItem = Form.Item;

function validatePassword(value) {
  if (value.length < 6) {
    return {
      validateStatus: "warning",
      errorMsg: "密码长度不小于6"
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  }
}

function validateConfirmPwd(value, pwd) {
  if (value !== pwd) {
    return {
      validateStatus: "warning",
      errorMsg: "密码不相等"
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  }
}

class ResetPassword extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      password: { value: "" },
      confirmPwd: { value: "" }
    };
  }

  _handlePassword = e => {
    let value = e.target.value;
    // console.log(validatePassword(e.target.value));
    this.setState({
      password: {
        ...validatePassword(e.target.value),
        value: value
      }
    });
  };
  _handleConfirmPwd = e => {
    let value = e.target.value,
      pwd = this.state.password.value;

    this.setState({
      confirmPwd: {
        ...validateConfirmPwd(e.target.value, pwd),
        value: value
      }
    });
  };

  async _resetPsw() {
    let { password, confirmPwd } = this.state;
    if (
      password.validateStatus === "success" &&
      confirmPwd.validateStatus === "success"
    ) {
      let pathname = this.props.pathname,
        activeKey = pathname.split("/")[2];

      let result = await resetPsw(activeKey, password.value);

      if (result.code === "1") {
        notification.open({
          message: this.props.intl.formatMessage(message.ResetPswSuccessMsg),
          description: this.props.intl.formatMessage(
            message.ResetPswSuccessDes
          ),
          icon: <Icon type="smile-o" style={{ color: "#ff7e67" }} />,
          style: {
            color: "#A2D5F2",
            bacground: "#fafafa"
          }
        });
      } else if (result.code === "-1") {
        notification.open({
          message: this.props.intl.formatMessage(message.ResetPswFailMsg),
          description: this.props.intl.formatMessage(message.ResetPswOverTime),
          icon: <Icon type="meh-o" style={{ color: "#A2D5F2" }} />,
          style: {
            color: "#ff7e67",
            bacground: "#fafafa"
          }
        });
      } else {
        notification.open({
          message: this.props.intl.formatMessage(message.ResetPswFailMsg),
          description: this.props.intl.formatMessage(message.ResetPswFailDes),
          icon: <Icon type="meh-o" style={{ color: "#A2D5F2" }} />,
          style: {
            color: "#ff7e67",
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
          color: "#ff7e67",
          bacground: "#fafafa"
        }
      });
    }
  }

  _handleKeyPress(e) {
    if (e.key === "Enter") {
      this._resetPsw();
    }
  }

  render() {
    let { password, confirmPwd } = this.state;
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
                <Row key="resetPswa">
                  <Col md={{ span: 22, offset: 1 }}>
                    <h2>
                      <FormattedMessage
                        id="ResetPsw"
                        defaultMessage="Reset Password"
                      />
                    </h2>
                  </Col>
                </Row>
                <Row key="resetPswb">
                  <Col md={{ span: 22, offset: 1 }}>
                    <Form>
                      <Row>
                        <Col md={{ span: 24 }}>
                          <FormItem
                            label={this.props.intl.formatMessage(
                              message.Password
                            )}
                            validateStatus={password.validateStatus}
                            hasFeedback
                            help={password.errorMsg}
                          >
                            <Input
                              value={password.value}
                              onChange={this._handlePassword}
                              type="password"
                            />
                          </FormItem>
                          <FormItem
                            label={this.props.intl.formatMessage(
                              message.ConfirmPwd
                            )}
                            validateStatus={confirmPwd.validateStatus}
                            hasFeedback
                            help={confirmPwd.errorMsg}
                          >
                            <Input
                              value={confirmPwd.value}
                              onChange={this._handleConfirmPwd}
                              type="password"
                              onKeyPress={e => this._handleKeyPress(e)}
                              onPaste={e => {
                                e.preventDefault();
                                return false;
                              }}
                            />
                          </FormItem>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={10} sm={10} xs={24}>
                          <FormItem>
                            <Button
                              className="submit-btn login-btn"
                              onClick={e => this._resetPsw(e)}
                              onKeyPress={e => this._handleKeyPress(e)}
                            >
                              <FormattedMessage
                                id="Submit"
                                defaultMessage="Submit"
                              />
                            </Button>
                          </FormItem>
                        </Col>
                      </Row>
                    </Form>
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

ResetPassword.propTypes = {
  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  pathname: state.routing.location.pathname
});

export default connect(mapStateToProps)(
  injectIntl(ResetPassword, { withRef: true })
);
