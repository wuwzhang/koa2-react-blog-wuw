import React from 'react';

import { Link } from 'react-router-dom';

import './style.css';
import {
  Row,
  Col
} from 'react-bootstrap';

const view = () => {
  return (
    <Row>
      <nav className="top-menu">
        <Col md={10} xs={8}>
          <ul className="base-option">
            <li className="base-item"><Link to='/home'>Home</Link></li>
            <li className="base-item"><Link to='/article_list'>Article</Link></li>
            <li className="base-item"><Link to='/about'>About</Link></li>
          </ul>
        </Col>
        <Col md={2} xs={4}>
          <ul className="base-option">
            <li className="base-item"><Link to='/login'>Login</Link></li>
            <li className="base-item"><Link to='/logout'>Logout</Link></li>
            <li className="base-item"><Link to='/regist'>Regist</Link></li>
          </ul>
        </Col>
      </nav>
    </Row>
  );
};

export { view };
