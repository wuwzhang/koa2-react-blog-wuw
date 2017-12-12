import React, { Component } from "react";

import { view as TopMenu } from "../../../components/TopMenu/";
import { Row, Col } from "antd";

class SettingAdmin extends Component {
  render() {
    return (
      <section>
        <section className="All-Nav">
          <TopMenu />
        </section>
        <div className="container">
          <Row>
            <Col span={12} />
            <Col span={12} />
          </Row>
          <Row>
            <Col span={12} />
            <Col span={12} />
          </Row>
          <Row>
            <Col span={12} />
            <Col span={12} />
          </Row>
        </div>
      </section>
    );
  }
}

export default SettingAdmin;
