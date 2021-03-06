import React from "react";
import {
  connect
} from "react-redux";
import {
  Link
} from "react-router-dom";

import {
  view as Contact
} from "../Contact/";

import FontAwesome from "react-fontawesome";
import {
  Popover,
  Col,
  Row
} from "antd";
import {
  FormattedMessage
} from "react-intl";

import carImg from "../../media/foot.png";
import wechat from "../../media/wechat.jpg";

import "./style.css";

const Footer = () => {
  return (
    <section className="footer">
      <div className="container">
        <Row gutter={48} key="footera">
          <Col md={12} sm={12} xs={24} key="footera1">
            <Row key="footera1a">
              <Col md={24} sm={24} xs={24} key="footera1a1">
                <h4>
                  <FormattedMessage id="About" defaultMessage="About" />
                </h4>
              </Col>
              <Col md={12} sm={0} xs={0} key="footera1a2">
                <img src={carImg} alt="footer" height="130px" />
              </Col>
              <Col md={12} sm={24} xs={24} key="footera1a3">
                <ul className="information">
                  <li>
                    <p>
                      <FontAwesome
                        name="map-marker"
                        style={{ color: "#FF7E67" }}
                      />
                      <span>
                        <FormattedMessage
                          id="Location"
                          defaultMessage="Ningbo China"
                        />
                      </span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <FontAwesome name="envelope" />
                      <span>wuwZhang@gmail.com</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <FontAwesome name="phone" />
                      <span>86-574-17855833952</span>
                    </p>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row key="footera1b">
              <section className="links" key="footera1b1">
                <Col md={24} sm={0} xs={0}>
                  <h4>
                    <FormattedMessage id="Links" defaultMessage="Links" />
                  </h4>
                </Col>
                <Col md={8} sm={0} xs={0} key="footera1b2">
                  <ul>
                    <li>
                      <a href="https://ant.design/index-cn">Ant Design</a>
                    </li>
                    <li>
                      <a href="https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md">
                        create-react-app
                      </a>
                    </li>
                    <li>
                      <a href="https://motion.ant.design/">Motion Design</a>
                    </li>
                    <li>
                      <a href="https://react-bootstrap.github.io/components.html">
                        React-Bootstrap
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col md={8} sm={0} xs={0} key="footera1b3">
                  <ul>
                    <li>
                      <a href="http://fontawesome.io/icons/">fontawesome</a>
                    </li>
                    <li>
                      <a href="http://photopin.com/">photopin</a>
                    </li>
                    <li>
                      <a href="http://www.17sucai.com/">17素材</a>
                    </li>
                    <li>
                      <a href="http://huaban.com/">花瓣素材</a>
                    </li>
                  </ul>
                </Col>
                <Col md={8} sm={0} xs={0} key="footera1b4">
                  <ul>
                    <li>
                      <a href="https://reactjs.org/">React</a>
                    </li>
                    <li>
                      <a href="http://redux.js.org/">Redux</a>
                    </li>
                    <li>
                      <a href="http://www.ruanyifeng.com/blog/">阮一峰blog</a>
                    </li>
                    <li>
                      <a href="http://www.w3cplus.com/">w3cplus</a>
                    </li>
                  </ul>
                </Col>
              </section>
            </Row>
            <Row key="footera1c">
              <Col md={12} sm={24} xs={24} key="footera1c1">
                <ul className="Footer-fontLink">
                  <li>
                    <a href="https://github.com/wuwzhang">
                      <FontAwesome name="github" />
                    </a>
                  </li>
                  <li>
                    <span>
                      <Popover content={content} title={null} trigger="hover">
                        <FontAwesome name="wechat" />
                      </Popover>
                    </span>
                  </li>
                  <li>
                    <a href="">
                      <FontAwesome name="google-plus" />
                    </a>
                  </li>
                </ul>
              </Col>
              <Col md={12} sm={24} xs={24} key="footera1c2">
                <ul className="foot-base-nav">
                  <li>
                    <Link to="/Keep_On_File">
                      <span>
                        <FormattedMessage
                          id="Article"
                          defaultMessage="Article"
                        />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      <span>
                        <FormattedMessage
                          id="About"
                          defaultMessage="About Me"
                        />
                      </span>
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col md={12} sm={12} xs={24} key="footera2">
            <Col
              sm={{ span: 20, offset: 2 }}
              md={{ span: 20, offset: 2 }}
              xs={24}
              style={{ paddingLeft: "0px" }}
              key="footera21"
            >
              <h3>
                <FormattedMessage id="Contact" defaultMessage="Contact Me" />
              </h3>
            </Col>
            <Contact />
          </Col>
        </Row>
        <Row key="footerb">
          <Col md={24} sm={24} xs={24} key="footerb1">
            <p className="power">© 2018 wuw 版权所有 | 浙ICP备18007945</p>
          </Col>
        </Row>
      </div>
    </section>
  );
};

const content = (
  <div>
    <img src={wechat} alt="" height="150" />
  </div>
);

export default connect()(Footer);
