import React from 'react';
import './style.css';

import { view as Contact } from '../Contact/'

import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import './style.css';

export const Footer = () => {
  return (
    <section className="footer">
      <Grid>
        <Row>
          <Col md={6} ms={6} xs={12}>
            <Col md={12} sm={12} xs={12}></Col>
            <Col md={12} sm={12} xs={12}>
              <ul className='Footer-fontLink'>
                <li><a href=''><FontAwesome name='github' /></a></li>
                <li><a href=''><FontAwesome name='wechat' /></a></li>
                <li><a href=''><FontAwesome name='google-plus' /></a></li>
              </ul>
            </Col>
          </Col>
          <Col md={6} ms={6} xs={12}>
            <Contact />
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} xs={12}><p>© 2017 wuw All rights reserved.</p></Col>
        </Row>
      </Grid>
    </section>
  );
}

export default Footer;
