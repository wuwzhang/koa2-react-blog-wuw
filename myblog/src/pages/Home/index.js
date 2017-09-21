import React from 'react';
import QueueAnim from 'rc-queue-anim';
import avatar from './avatar.jpg';

import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import './style.css'

const Home = () => (
  <section id="Home">

    <section className='Home-header'>
      <Grid>
        <QueueAnim
          delay={300}
          type={['top', 'bottom']}
        >
          <div key="0" className='Home-avatar'>
            <img src={avatar} alt=""/>
          </div>
          <div key="1" className='Home-title'>
            <h1><span>wuw's</span><span>blog</span></h1>
          </div>
        </QueueAnim>
      </Grid>

    </section>
    <section className='Home-container'>
      <Grid>
        <QueueAnim
          delay={300}
          type={['bottom','top']}
        >
          <section key="0" className="Home-signtuare">
            <p className="Home-signtuare-small"><span>哈哈哈哈哈哈哈哈哈哈哈！</span>怕不是个神经病吧</p>
            <p className="Home-signtuare-large">实话告诉你，他就是个神经病！哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
          </section>
          <section key="1" className="Home-search">
            <from>
              <input type="text"/>
              <span><FontAwesome name='search'/></span>
            </from>
          </section>
          <section key="2" className="Home-foot">
            <Row>
              <Col md={4} sm={12} xs={12}><p>© 2017 wuw All rights reserved.</p></Col>
              <Col md={4} sm={12} xs={12}>
                <ul className='Home-fontLink'>
                  <li><a href=''><FontAwesome name='github' /></a></li>
                  <li><a href=''><FontAwesome name='wechat' /></a></li>
                  <li><a href=''><FontAwesome name='google-plus' /></a></li>
                </ul>
              </Col>
              <Col md={4} sm={12} xs={12}>
                <ul className='Home-nav'>
                  <li><Link to='/Keep_On_File'><span>Article</span></Link></li>
                  <li><Link to='/about'><span>About Me</span></Link></li>
                </ul>
              </Col>
            </Row>
          </section>
        </QueueAnim>
      </Grid>
    </section>
  </section>
);

export default Home;
