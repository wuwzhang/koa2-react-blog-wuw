import React from 'react';
import { Link} from 'react-router-dom';

import { view as Contact } from '../Contact/'

import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Popover } from 'antd';
import { FormattedMessage } from 'react-intl';

import carImg from '../../media/foot.png';
import wechat from '../../media/wechat.jpg';

import './style.css';

export const Footer = () => {
  return (
    <section className="footer">
      <Grid>
        <Row>
          <Col md={6} ms={6} xs={12}>
            <Row>
              <Col md={12} sm={12} xs={12}>
                <h4>
                  <FormattedMessage
                    id='About'
                    defaultMessage='About'
                  />
                </h4>
              </Col>
              <Col md={6} smHidden xsHidden>
                <img src={carImg} alt="footer image" height='130px' />
              </Col>
              <Col md={6} sm={12} xs={12}>
                <ul className='information'>
                  <li>
                    <p><FontAwesome name='map-marker' style={{color: '#FF7E67'}}/>
                      <span>
                        <FormattedMessage
                          id='Location'
                          defaultMessage='Ningbo China'
                        />
                      </span>
                    </p>
                  </li>
                  <li>
                    <p><FontAwesome name='envelope' /><span>wuwZhang@gmail.com</span></p>
                  </li>
                  <li>
                    <p><FontAwesome name='phone' /><span>86-574-17855833952</span></p>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row>
              <section className="links">
                <Col md={12} smHidden xsHidden>
                  <h4>
                    <FormattedMessage
                      id='Links'
                      defaultMessage='Links'
                    />
                  </h4>
                </Col>
                <Col md={4} smHidden xsHidden>
                  <ul>
                    <li><a href="https://ant.design/index-cn">Ant Design</a></li>
                    <li><a href="https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md">create-react-app</a></li>
                    <li><a href="https://motion.ant.design/">Motion Design</a></li>
                    <li><a href="https://react-bootstrap.github.io/components.html">React-Bootstrap</a></li>
                  </ul>
                </Col>
                <Col md={4} smHidden xsHidden>
                  <ul>
                    <li><a href="http://fontawesome.io/icons/">fontawesome</a></li>
                    <li><a href="http://photopin.com/">photopin</a></li>
                    <li><a href="http://www.17sucai.com/">17素材</a></li>
                    <li><a href="http://huaban.com/">花瓣素材</a></li>
                  </ul>
                </Col>
                <Col md={4} smHidden xsHidden>
                  <ul>
                    <li><a href="https://reactjs.org/">React</a></li>
                    <li><a href="http://redux.js.org/">Redux</a></li>
                    <li><a href="http://www.ruanyifeng.com/blog/">阮一峰blog</a></li>
                    <li><a href="http://www.w3cplus.com/">w3cplus</a></li>
                  </ul>
                </Col>
              </section>
            </Row>
            <Row>
              <Col md={6} sm={12} xs={12}>
                <ul className='Footer-fontLink'>
                  <li><a href='https://github.com/wuwzhang'><FontAwesome name='github' /></a></li>
                  <li><span><Popover content={content} title={null} trigger="hover"><FontAwesome name='wechat' /></Popover></span></li>
                  <li><a href=''><FontAwesome name='google-plus' /></a></li>
                </ul>
              </Col>
              <Col md={6} sm={12} xs={12}>
                <ul className='foot-base-nav'>
                  <li>
                    <Link to='/Keep_On_File'>
                      <span>
                        <FormattedMessage
                          id="Article"
                          defaultMessage="Article"
                        />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to='/about'>
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
          <Col md={6} sm={6} xs={12}>
            <Col sm={10} smOffset={2} md={10} mdOffset={2} xs={12} style={{paddingLeft: '0px'}}>
              <h3>
                <FormattedMessage
                  id='Contact'
                  defaultMessage='Contact Me'
                />
              </h3>
            </Col>
            <Contact />
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} xs={12}><p className='power'>© 2017 wuw All rights reserved.</p></Col>
        </Row>
      </Grid>
    </section>
  );
}

const content = (
  <div>
    <img src={wechat} alt="" height='150'/>
  </div>
);

export default Footer;