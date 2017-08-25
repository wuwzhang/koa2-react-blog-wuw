import React from 'react';
import {
  Col,
  Row
} from 'react-bootstrap';

const About = () => (
  <section>
    <Row>
      <Col sm={6} md={6}>
        <div>2017-8-20</div>
      </Col>
      <Col sm={6} md={6}>
        <nav>
          <ul>
            <li>编辑</li>
            <li>浏览数<span>10</span></li>
          </ul>
        </nav>
      </Col>
    </Row>
  </section>
);

export default About;
