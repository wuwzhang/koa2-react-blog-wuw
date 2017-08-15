import React from 'react';

import { Link } from 'react-router-dom';

import {
  Row,
  Col
} from 'react-bootstrap';
import './style.css';

const view = ({title, update_time, create_time}) => {
  update_time = update_time.slice(0, 10);
  create_time = create_time.slice(0, 10);
  return (
    <Row>
      <li>
        <Link to='/home'>
          <Col md={6}>{title}</Col>
          <Col md={3}>{update_time}</Col>
          <Col md={3}>{create_time}</Col>
        </Link>
      </li>
    </Row>
  );
}

export { view };
