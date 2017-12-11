import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { postContact } from "../fetch.js";
import { addMessage } from "../action.js";

import {
  FormGroup,
  Button,
  ControlLabel,
  FormControl,
  HelpBlock,
  Form,
  Col
} from "react-bootstrap";
import { notification, Icon } from "antd";

import message from "../../../locale/message";
import { injectIntl, FormattedMessage } from "react-intl";

import "./style.css";

class Contact extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      account: "",
      content: "",
      accountValid: "success",
      contentValid: "success"
    };
  }

  async _checkAccount(value) {
    this.setState({
      accountValid: null,
      accountHelp: ""
    });

    function _isEmail(str) {
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      return reg.test(str);
    }

    if (value.length < 6) {
      this.setState({
        accountValid: "error",
        accountHelp: "账号长度至少大于6"
      });
    } else if (!_isEmail(value)) {
      this.setState({
        accountValid: "error",
        accountHelp: "不是合法的邮箱地址"
      });
    } else {
      this.setState({
        accountValid: "success",
        accountHelp: "账号可用"
      });
    }
  }

  _checkContent(value) {
    this.setState({
      contentValid: null,
      contentHelp: ""
    });

    if (value.length === 0) {
      this.setState({
        contentValid: "error",
        contentHelp: "内容不为空"
      });
    } else {
      this.setState({
        contentValid: "success"
      });
    }
  }

  async _contact() {
    const { account, content, accountValid, contentValid } = this.state;

    function _checkComplete() {
      return accountValid === "success" && contentValid === "success";
    }

    if (_checkComplete()) {
      let result = await postContact(account, content);

      if (result.code === "1") {
        this.props.postContactMessage(result.result);
        notification.open({
          message: this.props.intl.formatMessage(message.MessageSuccessMsg),
          description: this.props.intl.formatMessage(message.MessageSuccessDes),
          icon: <Icon type="smile-o" style={{ color: "#ff7e67" }} />,
          style: {
            color: "#A2D5F2",
            bacground: "#fafafa"
          }
        });
      } else {
        notification.open({
          message: this.props.intl.formatMessage(message.MessageFailMsg),
          description: this.props.intl.formatMessage(message.MessageFailDes),
          icon: <Icon type="meh-o" style={{ color: "#ff7e67" }} />,
          style: {
            color: "#A2D5F2",
            bacground: "#fafafa"
          }
        });
      }
    }
  }

  render() {
    return (
      <section className="Contact">
        <Form horizontal>
          <Col sm={10} smOffset={2} md={10} mdOffset={2} xs={12}>
            <FormGroup validationState={this.state.accountValid}>
              <ControlLabel style={{ color: "#FAFAFA" }}>
                <FormattedMessage id="labelEmail" defaultMessage="Email" />
              </ControlLabel>
              <FormControl
                type="email"
                onChange={event =>
                  this.setState({ account: event.target.value })
                }
                onBlur={event => this._checkAccount(event.target.value)}
              />
              {this.state.accountHelp && (
                <HelpBlock>{this.state.accountHelp}</HelpBlock>
              )}
            </FormGroup>
          </Col>
          <Col sm={10} smOffset={2} md={10} mdOffset={2} xs={12}>
            <FormGroup validationState={this.state.contentValid}>
              <ControlLabel style={{ color: "#FAFAFA" }}>
                <FormattedMessage id="labelContent" defaultMessage="Conent" />
              </ControlLabel>
              <FormControl
                componentClass="textarea"
                onChange={event =>
                  this.setState({ content: event.target.value })
                }
                onBlur={event => this._checkContent(event.target.value)}
                style={{ height: 150 }}
              />
              {this.state.contentHelp && (
                <HelpBlock>{this.state.contentHelp}</HelpBlock>
              )}
            </FormGroup>
          </Col>
          <FormGroup>
            <Col sm={4} smOffset={2} mdOffset={2} md={5} xs={12}>
              <Button
                className="submit-btn"
                block
                onClick={() => this._contact()}
              >
                <FormattedMessage id="Submit" defaultMessage="Submit" />
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </section>
    );
  }
}

Contact.PropTypes = {
  intl: PropTypes.object.isRequired,
  postContactMessage: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    postContactMessage: message => {
      dispatch(addMessage(message));
    }
  };
};

export default connect(null, mapDispatchToProps)(
  injectIntl(Contact, {
    withRef: true
  })
);
