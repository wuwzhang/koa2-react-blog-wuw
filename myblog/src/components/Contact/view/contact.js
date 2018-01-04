import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { postContact } from "../fetch.js";
import { addMessage } from "../action.js";

import { Form, notification, Icon, Col, Button, Input } from "antd";

import message from "../../../locale/message";
import { injectIntl, FormattedMessage } from "react-intl";

import "./style.css";

const FormItem = Form.Item;

function validateAccount(value) {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  if (value.length > 6 && reg.test(value)) {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  } else {
    return {
      validateStatus: "error",
      errorMsg: "邮箱格式不正确"
    };
  }
}

function validateContent(value) {
  if (value.length === 0) {
    return {
      validateStatus: "error",
      errorMsg: "消息不为空"
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  }
}

class Contact extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      account: {
        value: ""
      },
      content: {
        value: ""
      }
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.account !== nextState.account ||
      this.state.content !== nextState.content
    );
  }

  _handleAccount = e => {
    let value = e.target.value;
    this.setState({
      account: {
        ...validateAccount(value),
        value: value
      }
    });
  };

  _handleContent = e => {
    let value = e.target.value;

    this.setState({
      content: {
        ...validateContent(value),
        value: value
      }
    });
  };

  async _contact() {
    let { account, content } = this.state;

    if (
      account.validateStatus === "success" &&
      content.validateStatus === "success"
    ) {
      let result = await postContact(account.value, content.value);

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
    } else {
      notification.open({
        message: this.props.intl.formatMessage(message.CheckMsgMsg),
        description: this.props.intl.formatMessage(message.CheckMsgDes),
        icon: <Icon type="meh-o" style={{ color: "#ff7e67" }} />,
        style: {
          color: "#A2D5F2",
          bacground: "#fafafa"
        }
      });
    }
  }

  render() {
    let { account, content } = this.state;
    return (
      <section className="Contact">
        <Col sm={{ span: 20, offset: 2 }} md={{ span: 20, offset: 2 }} xs={24}>
          <Form>
            <FormItem
              label={this.props.intl.formatMessage(message.Account)}
              validateStatus={account.validateStatus}
              help={account.errorMsg}
            >
              <Input value={account.value} onChange={this._handleAccount} />
            </FormItem>

            <FormItem
              label={this.props.intl.formatMessage(message.Content)}
              validateStatus={content.validateStatus}
              help={content.errorMsg}
            >
              <Input
                type="textarea"
                style={{ height: 150 }}
                value={content.value}
                onChange={this._handleContent}
              />
            </FormItem>

            <FormItem>
              <Button
                className="submit-btn Contact-btn"
                onClick={() => this._contact()}
              >
                <FormattedMessage id="Submit" defaultMessage="Submit" />
              </Button>
            </FormItem>
          </Form>
        </Col>
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
