import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { view as TopMenu } from "../../../components/TopMenu/";

import { fetchs as RegistFetchs } from "../../Register/";
import { forgetPsw } from "../fetch";

import { injectIntl, FormattedMessage } from "react-intl";

import { notification, Icon, Input, Form, Button, Col, Row } from "antd";
import QueueAnim from "rc-queue-anim";

import "./style.css";
import message from "../../../locale/message";
import utils from "../../../utils/utils";

const FormItem = Form.Item;

async function validateRegistAccount(value) {
  if (value.length < 6) {
    return {
      validateStatus: "warning",
      errorMsg: "邮箱长度不小于6"
    };
  } else if (!utils._isEmail(value)) {
    return {
      validateStatus: "warning",
      errorMsg: "邮箱格式不正确"
    };
  } else {
    let result = await RegistFetchs.checkAccount(value);

    // console.log("state", result.code);

    if (result.code === "-1") {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    } else {
      return {
        validateStatus: "warning",
        errorMsg: "用户不存在"
      };
    }
  }
}

class ForgetPsw extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      account: { value: "" }
    };
  }

  _handleAccount = async e => {
    let value = e.target.value;
    // console.log(await validateRegistAccount(value));
    this.setState({
      account: {
        ...(await validateRegistAccount(value)),
        value: value
      }
    });
  };

  async _handleForget(e) {
    e.preventDefault();

    let { account } = this.state;

    if (account.validateStatus === "success") {
      let result = await forgetPsw(account.value);

      if (result.code === "1") {
        console.log("forgetPsw", result);
        const btn = (
          <Button
            className="submit-btn"
            onClick={() => this._checkEmail(account.value)}
          >
            Check
          </Button>
        );
        notification.open({
          message: this.props.intl.formatMessage(message.RegistEmailCheckMsg),
          description: this.props.intl.formatMessage(
            message.RegistEmailCheckDes
          ),
          btn,
          duration: null,
          icon: <Icon type="smile-o" style={{ color: "#ff7e67" }} />,
          style: {
            color: "#A2D5F2",
            bacground: "#fafafa"
          }
        });
      } else {
      }
    } else {
      notification.open({
        message: this.props.intl.formatMessage(message.UserNotFound),
        description: this.props.intl.formatMessage(message.RegistEmailCheckDes),
        duration: null,
        icon: <Icon type="meh-o" style={{ color: "#A2D5F2" }} />,
        style: {
          color: "#ff7e67",
          bacground: "#fafafa"
        }
      });
    }
  }

  _handleKeyPress(event) {
    if (event.key === "Enter") {
      this._handleForget();
    }
  }

  _checkEmail(account) {
    utils._checkEmail(account);
  }

  render() {
    let { account } = this.state;
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
                <Row key="forgetPswa">
                  <Col md={{ span: 22, offset: 1 }}>
                    <h2>
                      <FormattedMessage
                        id="ForgetPsw"
                        defaultMessage="Forget Password"
                      />
                    </h2>
                  </Col>
                </Row>
                <Row key="forgetPswb">
                  <Col md={{ span: 22, offset: 1 }}>
                    <Form>
                      <Row>
                        <Col md={{ span: 24 }}>
                          <FormItem
                            label={this.props.intl.formatMessage(
                              message.Account
                            )}
                            hasFeedback
                            validateStatus={account.validateStatus}
                            help={account.errorMsg}
                          >
                            <Input
                              autoFocus
                              value={account.value}
                              onChange={this._handleAccount}
                              onKeyPress={e => this._handleKeyPress(e)}
                            />
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={10} sm={10} xs={24}>
                          <FormItem>
                            <Button
                              className="submit-btn login-btn"
                              onClick={e => this._handleForget(e)}
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

ForgetPsw.propTypes = {
  intl: PropTypes.object.isRequired
};

export default connect()(injectIntl(ForgetPsw, { withRef: true }));
