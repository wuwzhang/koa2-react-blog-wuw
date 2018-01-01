import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchs as registFetch } from "../Register/";
import { Link } from "react-router-dom";

import { Icon, Col } from "antd";
import { FormattedMessage } from "react-intl";

import "./style.css";

class VerifyMail extends Component {
  async _checkRegistActive(e) {
    e.preventDefault();
    var result = await registFetch.registActive(this.props.pathname);

    if (result) {
      setTimeout(
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000)
      );
    } else {
    }
  }

  render() {
    return (
      <div className="message-sent-full">
        <div className="container message-sent-container">
          <section className="message-sent verifyemail">
            <p className="message-sent-icon">
              <nav className="message-sent-nav">
                <Link to="/">
                  <FormattedMessage id="Home" defaultMessage="Home" />
                </Link>
                <Link to="/register">
                  <FormattedMessage id="Regist" defaultMessage="Sign Up" />
                </Link>
              </nav>
              <Icon type="notification" />
            </p>
            <Col span={16} offset={8}>
              <p className="verifyemail-title">
                <a
                  onClick={e => this._checkRegistActive(e)}
                  className="verifyemail-title-link"
                >
                  <FormattedMessage
                    id="ClickToRegister"
                    defaultMessage="Click To Complete Register"
                  />
                </a>
                <p className="verifyemail-Msg">
                  <FormattedMessage
                    id="verifyemailMsg"
                    defaultMessage="HAO KONG KUANG A, GUAN JUE YAO XIE DIAN DONG XI CAI XING"
                  />
                </p>
              </p>
            </Col>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.routing.location.pathname
});

export default connect(mapStateToProps, null)(VerifyMail);
