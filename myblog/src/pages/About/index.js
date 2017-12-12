import React from "react";
import { view as TopMenu } from "../../components/TopMenu/";
import Footer from "../../components/Footer/index.js";

import { Row, Col } from "antd";
import pieChart from "../../media/about-2.png";
import QueueAnim from "rc-queue-anim";
import "./style.css";

const About = () => (
  <section className="About">
    <section className="All-Nav">
      <TopMenu />
    </section>
    <div className="container">
      <section className="about-container">
        <QueueAnim type={["right", "left"]}>
          <section key="0" className="about-me">
            <Row>
              <QueueAnim type={["top", "bottom"]}>
                <Col key="a" md={8} sm={8} xs={12} />
                <Col key="b" md={14} sm={{ span: 14, offset: 2 }} xs={12}>
                  <section className="about-me-container">
                    <h3>About Me</h3>
                    <h4>
                      I'm a Front End Developer, and I want to be a Full Stack
                      Developer.
                    </h4>
                    <p>
                      I enjoy turning complex problems into simple, beautiful
                      and intuitive interface Web Developer. When I'm not
                      coding, you'll find me to read a book or watch a movie.
                    </p>
                  </section>
                </Col>
              </QueueAnim>
            </Row>
          </section>
          <section key="1" className="skill">
            <Row>
              <QueueAnim delay={200} type={["bottom", "top"]}>
                <Col key="a" md={{ span: 6, offset: 2 }} sm={8} xs={24}>
                  <h4>Back End</h4>
                  <p>Koa</p>
                  <p>Django/Python</p>
                </Col>
                <Col key="b" md={8} sm={8} xs={0}>
                  <img src={pieChart} width="100%" alt="pie chart" />
                </Col>
                <Col key="c" md={{ span: 6, offset: 2 }} sm={8} xs={24}>
                  <h4>Front End</h4>
                  <p>HTML/HTML5</p>
                  <p>CSS/SASS</p>
                  <p>JavaScript/ES6</p>
                  <p>React</p>
                  <p>Redux</p>
                  <p>webpack</p>
                </Col>
              </QueueAnim>
            </Row>
          </section>
          <section key="2" className="random-facts">
            <QueueAnim delay={200} type={["left", "right"]}>
              <Col md={8} sm={8} xs={12}>
                <section key="a" className="random-facts-container">
                  <h3>Tools</h3>
                  <p>I like use Sublime</p>
                  <p>I can use Git</p>
                  <p>I like blue switch</p>
                  <p>I like use kindle to read books</p>
                  <p>I use a Mac</p>
                </section>
              </Col>
              <Col md={8} sm={8} xs={12}>
                <section key="b" className="random-facts-container">
                  <h3>Random facts</h3>
                  <p>I want to be a Full Stack Developer</p>
                  <p>I love One Piece</p>
                  <p>I want to stay at home every</p>
                  <p>I like autumn</p>
                  <p>I love novel</p>
                  <p>I love laugthing</p>
                </section>
              </Col>
            </QueueAnim>
          </section>
        </QueueAnim>
      </section>
    </div>
    <Footer />
  </section>
);

export default About;
