import React from 'react';
import './style.css';

import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';

export const Footer = () => {
  return (
    <section className="footer">
      <Grid>
        <Row>
          <Col md={6} ms={6} xs={12}>
          </Col>
          <Col md={6} ms={6} xs={12}>

          </Col>
        </Row>
      </Grid>
    </section>
  );
}

export default Footer;
