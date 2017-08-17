import React from 'react';

import { Link } from 'react-router-dom';

import {
  Row,
  Col
} from 'react-bootstrap';
import './style.css';

const view = ({title, id, update_time, create_time}) => {
  update_time = update_time.slice(0, 10);
  create_time = create_time.slice(0, 10);
  return (
    <Row>
      <li>
        <Link to={`/article_details/${id}`}>
          <Col md={8}>{title}</Col>
          <Col md={2}>{update_time}</Col>
          <Col md={2}>{create_time}</Col>
        </Link>
      </li>
    </Row>
  );
}

export { view };
