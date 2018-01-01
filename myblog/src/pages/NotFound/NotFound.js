import React from "react";
import { Col, Icon } from "antd";
import { Link } from "react-router-dom";

import { FormattedMessage } from "react-intl";
import "./style.css";

const NotFound = () => {
  return (
    <div className="container message-sent-container">
      <section className="message-sent notFound">
        <p className="message-sent-icon">
          <nav className="message-sent-nav">
            <Link to="/">
              <FormattedMessage id="Home" defaultMessage="Home" />
            </Link>
            <Link to="/about">
              <FormattedMessage id="About" defaultMessage="About Me" />
            </Link>
          </nav>
          <Icon type="notification" />
        </p>

        <Col span={16} offset={8}>
          <p className="notFound-title">
            <p>
              <span className="color-red" style={{ fontSize: "120px" }}>
                404
              </span>，
            </p>
            <p className="notFound-title-des">
              <FormattedMessage id="NotFound" defaultMessage="Not Found" />
            </p>
          </p>
        </Col>
      </section>
    </div>
  );
};

export default NotFound;
