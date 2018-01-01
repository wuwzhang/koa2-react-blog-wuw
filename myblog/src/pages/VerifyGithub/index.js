import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import { verifyGithub } from "./fetch.js";
import { actions as loginAction } from "../Login";

import { Col, Icon, Spin } from "antd";
import { FormattedMessage } from "react-intl";
import "./style.css";

class VerifyGithub extends Component {
  constructor(props) {
    super(props);

    let fromPath = sessionStorage.getItem("fromPath");

    this.state = {
      fromPath: fromPath,
      isRedirect: false,
      loginState: 0,
      loading: true
    };
  }

  async componentDidMount() {
    let { location } = this.props;

    if (location && location.pathname === "/github/oauth/callback") {
      let url = location.pathname + location.search,
        result = await verifyGithub(url);
      console.log(result.user);

      if (result.code === "1") {
        this.props.successLogin(result.user);

        if (result.token) {
          window.localStorage.setItem("token", result.token);
        }

        this.setState({
          isRedirect: true,
          loading: false
        });
      } else {
        this.setState({
          loginState: 1,
          loading: false
        });
      }
    }
  }

  render() {
    let { isRedirect, fromPath, loginState } = this.state;

    if (isRedirect) {
      return (
        <Redirect
          to={{
            pathname: fromPath
          }}
        />
      );
    }

    if (loginState === 1) {
      return (
        <div className="message-sent-full">
          <div className="container message-sent-container">
            <section className="message-sent verifyGithub">
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
              <p className="message-sent-title">
                他大概是<span className="color-red">病了</span>，试试联系<span className="color-red">
                  注册
                </span>君
              </p>
            </section>
          </div>
        </div>
      );
    }

    return (
      <div className="message-sent-full">
        <div className="container message-sent-container">
          <Spin spinning={this.state.loading} size="large">
            <section className="message-sent verifyGithub">
              <Col span={16} offset={8}>
                <p className="verifyGithub-title">
                  <p>
                    浏览器君在<span className="color-red">发呆</span>，
                  </p>
                  <p>
                    等等我去<span className="color-red">叫醒</span>他~~~
                  </p>
                </p>
              </Col>
            </section>
          </Spin>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.routing.location
});

const mapDispatchToProps = dispatch => {
  return {
    successLogin: (user, message) => {
      dispatch(loginAction.finishLogin(user));
      dispatch(loginAction.loginSuccess(message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyGithub);
