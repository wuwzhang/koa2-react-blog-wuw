import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { view as TopMenu } from "../../../components/TopMenu/";

import { register, checkAccount } from "../fetch";
import {
  startRegist,
  registSuccess,
  registFaile,
  finishRegist,
  faileRegist
} from "../action";

import QueueAnim from "rc-queue-anim";

import {
  notification,
  Avatar,
  Icon,
  Input,
  Col,
  Row,
  Form,
  Radio,
  Button
} from "antd";

import message from "../../../locale/message";
import "./style.css";

import avatar1 from "../../../media/1.jpg";
import avatar2 from "../../../media/2.jpg";
import avatar3 from "../../../media/3.jpg";
import avatar4 from "../../../media/4.jpg";
import avatar5 from "../../../media/5.jpg";
// import avatar6 from '../../../media/6.jpg';

import { injectIntl, FormattedMessage } from "react-intl";

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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

function validateUserName(value) {
  if (value.length < 3) {
    return {
      validateStatus: "warning",
      errorMsg: "用户名长度不得小于3"
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

function _isEmail(str) {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(str);
}

async function validateRegistAccount(value) {
  if (value.length < 6) {
    return {
      validateStatus: "warning",
      errorMsg: "邮箱长度不小于6"
    };
  } else if (!_isEmail(value)) {
    return {
      validateStatus: "warning",
      errorMsg: "邮箱格式不正确"
    };
  } else {
    let result = await checkAccount(value);

    // console.log("state", result.code);

    if (result.code === "1") {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    } else {
      return {
        validateStatus: "warning",
        errorMsg: "用户已存在"
      };
    }
  }
}

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: { value: "" },
      userName: { value: "" },
      password: { value: "" },
      confirmPwd: { value: "" },
      avatar: { value: "1" }
    };
  }

  _checkEmail(email) {
    // console.log('checkEmail', email)
    function _getEmailAddr(suffixe) {
      if (suffixe === "163.com") {
        return "mail.163.com";
      } else if (suffixe === "vip.163.com") {
        return "vip.163.com";
      } else if (suffixe === "126.com") {
        return "mail.126.com";
      } else if (
        suffixe === "qq.com" ||
        suffixe === "vip.qq.com" ||
        suffixe === "foxmail.com"
      ) {
        return "mail.qq.com";
      } else if (suffixe === "gmail.com") {
        return "mail.google.com";
      } else if (suffixe === "sohu.com") {
        return "mail.sohu.com";
      } else if (suffixe === "tom.com") {
        return "mail.tom.com";
      } else if (suffixe === "vip.sina.com") {
        return "vip.sina.com";
      } else if (suffixe === "sina.com.cn" || suffixe === "sina.com") {
        return "mail.sina.com.cn";
      } else if (suffixe === "tom.com") {
        return "mail.tom.com";
      } else if (suffixe === "yahoo.com.cn" || suffixe === "yahoo.cn") {
        return "mail.cn.yahoo.com";
      } else if (suffixe === "tom.com") {
        return "mail.tom.com";
      } else if (suffixe === "yeah.net") {
        return "www.yeah.net";
      } else if (suffixe === "21cn.com") {
        return "mail.21cn.com";
      } else if (suffixe === "hotmail.com") {
        return "www.hotmail.com";
      } else if (suffixe === "sogou.com") {
        return "mail.sogou.com";
      } else if (suffixe === "188.com") {
        return "www.188.com";
      } else if (suffixe === "139.com") {
        return "mail.10086.cn";
      } else if (suffixe === "189.cn") {
        return "webmail15.189.cn/webmail";
      } else if (suffixe === "wo.com.cn") {
        return "mail.wo.com.cn/smsmail";
      } else if (suffixe === "139.com") {
        return "mail.10086.cn";
      } else {
        return "";
      }
    }

    if (email) {
      let suffixe = email.split("@")[1],
        addr = _getEmailAddr(suffixe);

      window.location.href = "https://" + (addr ? addr : "www.baidu.com");
    }
  }

  async _regist() {
    let { account, userName, password, confirmPwd, avatar } = this.state;
    if (
      account.validateStatus === "success" &&
      userName.validateStatus === "success" &&
      password.validateStatus === "success" &&
      confirmPwd.validateStatus === "success"
    ) {
      let result = await register({
        account: account.value,
        username: userName.value,
        password: password.value,
        avatarValue: avatar.value
      });

      if (result.code === "1") {
        this.props.registSuccess();

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
          icon: <Icon type="meh-o" style={{ color: "#A2D5F2" }} />,
          style: {
            color: "#ff7e67",
            bacground: "#fafafa"
          }
        });
      } else {
        this.props.registFaile(result.message);
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
  _handleUserName = e => {
    let value = e.target.value;

    this.setState({
      userName: {
        ...validateUserName(e.target.value),
        value: value
      }
    });
  };
  _handleAccount = async e => {
    let value = e.target.value;
    // console.log(await validateRegistAccount(value));
    this.setState({
      account: {
        ...(await validateRegistAccount(value)),
        value: value
      }
    });

    // if (this.state.account.validateStatus === "validating") {
    //   let result = await checkAccount(value);
    //
    //   if (result.code === "1") {
    //     this.setState({
    //       account: {
    //         validateStatus: "success",
    //         value: value
    //       }
    //     });
    //   } else {
    //     this.setState({
    //       account: {
    //         validateStatus: "error",
    //         errorMsg: "用户已存在",
    //         value: value
    //       }
    //     });
    //   }
    // }
  };
  _handleAvatar = e => {
    this.setState({
      avatar: {
        value: e.target.value
      }
    });
  };

  _handleKeyPress(event) {
    if (event.key === "Enter") {
      this._regist();
    }
  }

  render() {
    let { account, userName, password, confirmPwd, avatar } = this.state;

    return (
      <section className="Regist-Bg">
        <section className="All-Nav">
          <TopMenu />
        </section>
        <div className="container">
          <section>
            <Col
              className="register-container"
              md={{ span: 8, offset: 8 }}
              xs={20}
              sm={{ span: 8, offset: 8 }}
            >
              <QueueAnim className="demo-content">
                <Row key="registera">
                  <Col md={{ span: 22, offset: 1 }}>
                    <h2>
                      <FormattedMessage id="Regist" defaultMessage="Sign Up" />
                    </h2>
                  </Col>
                </Row>
                <Row key="registerb">
                  <Col md={{ span: 22, offset: 1 }}>
                    <Form>
                      <FormItem
                        label={this.props.intl.formatMessage(message.Account)}
                        validateStatus={account.validateStatus}
                        hasFeedback
                        help={account.errorMsg}
                      >
                        <Input
                          autoFocus
                          value={account.value}
                          onChange={this._handleAccount}
                        />
                      </FormItem>
                      <FormItem
                        label={this.props.intl.formatMessage(message.Username)}
                        validateStatus={userName.validateStatus}
                        hasFeedback
                        help={userName.errorMsg}
                      >
                        <Input
                          value={userName.value}
                          onChange={this._handleUserName}
                        />
                      </FormItem>
                      <FormItem
                        label={this.props.intl.formatMessage(message.Password)}
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
                      <FormItem>
                        <RadioGroup
                          defaultValue={avatar.value}
                          onChange={this._handleAvatar}
                        >
                          <RadioButton value="1" className="register-radio">
                            <Avatar src={avatar1} />
                          </RadioButton>
                          <RadioButton value="2" className="register-radio">
                            <Avatar src={avatar2} />
                          </RadioButton>
                          <RadioButton value="3" className="register-radio">
                            <Avatar src={avatar3} />
                          </RadioButton>
                          <RadioButton value="4" className="register-radio">
                            <Avatar src={avatar4} />
                          </RadioButton>
                          <RadioButton value="5" className="register-radio">
                            <Avatar src={avatar5} />
                          </RadioButton>
                          <RadioButton value="6" className="register-radio">
                            <Avatar src={avatar5} />
                          </RadioButton>
                        </RadioGroup>
                      </FormItem>
                      <FormItem>
                        <Button
                          className="submit-btn login-btn"
                          onClick={() => this._regist()}
                        >
                          <FormattedMessage
                            id="Regist"
                            defaultMessage="Sign Up"
                          />
                        </Button>
                      </FormItem>
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

Register.propTypes = {
  regist: PropTypes.func
};

const mapStateToProps = state => state.register;

const mapDispatchToProps = dispatch => {
  return {
    regist: async () => {
      dispatch(startRegist());
    },
    registSuccess: () => {
      dispatch(finishRegist());
      dispatch(registSuccess());
    },
    registFaile: message => {
      dispatch(faileRegist(message));
      dispatch(registFaile(message));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(Register, { withRef: true })
  )
);
