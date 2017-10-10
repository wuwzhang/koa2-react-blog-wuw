import React from 'react';
import { view as TopMenu } from '../../components/TopMenu/';
import Footer from '../../components/Footer/index.js';

import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';

import pieChart from '../../media/about-2.png';

import './style.css';

const About = () => (
  <section className='About'>
    <section className='All-Nav'>
      <TopMenu />
    </section>
    <Grid>
      <section className="about-container">
        <section className='about-me'>
          <Row>
            <Col md={4} sm={4} xs={6}>

            </Col>
            <Col md={7} smOffset={1} sm={7} xs={6}>
              <section className="about-me-container">
                <h3>About Me</h3>
                <h4>I'm a Front End Developer, and I want to be a Full Stack Developer.</h4>
                <p>I enjoy turning complex problems into simple, beautiful and intuitive interface Web Developer.
                When I'm not coding, you'll find me to read a book or watch a movie.</p>
              </section>
            </Col>
          </Row>
        </section>
        <section className='skill'>
          <Row>
            <Col md={3} mdOffset={1} sm={4} xs={12}>
              <h4>Back End</h4>
              <p>Koa</p>
              <p>Django/Python</p>
            </Col>
            <Col md={4} sm={4} xsHidden>
              <img src={pieChart} width='100%' alt='pie chart' />
            </Col>
            <Col md={3} mdOffset={1} sm={4} xs={12}>
              <h4>Front End</h4>
              <p>HTML/HTML5</p>
              <p>CSS/SASS</p>
              <p>JavaScript/ES6</p>
              <p>React</p>
              <p>Redux</p>
              <p>webpack</p>
            </Col>
          </Row>
        </section>
        <section className='random-facts'>
          <Col md={4} sm={4} xs={6}>
            <section className="random-facts-container">
              <h3>Tools</h3>
              <p>I like use Sublime</p>
              <p>I can use Git</p>
              <p>I like blue switch</p>
              <p>I like use kindle to read books</p>
              <p>I use a Mac</p>
            </section>
          </Col>
          <Col md={4} sm={4} xs={6}>
            <section className="random-facts-container">
              <h3>Random facts</h3>
              <p>I want to be a Full Stack Developer</p>
              <p>I love One Piece</p>
              <p>I want to stay at home every</p>
              <p>I like autumn</p>
              <p>I love novel</p>
              <p>I love laugthing</p>
            </section>
          </Col>
        </section>
      </section>
    </Grid>
    <Footer />
  </section>
);

export default About;
