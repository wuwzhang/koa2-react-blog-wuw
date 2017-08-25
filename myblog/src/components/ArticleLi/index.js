import React from 'react';
import { Link } from 'react-router-dom';

import ArticleOptionNav from '../ArticleOptionNav/articleOptionNav.js';

import {
  Row,
  Col
} from 'react-bootstrap';
import './style.css';

const view = ({title, id, key, update_time, create_time}) => {
  update_time = update_time.slice(0, 10);
  create_time = create_time.slice(0, 10);
  return (
    <Row>
      <li>
        <Link to={`/article_details/${id}`}>
          <Col md={8} xs={10}>{title}</Col>
          <Col md={1} xsHidden>{update_time}</Col>
          <Col md={1} xsHidden>{create_time}</Col>
          <Col md={2} xs={2}>
            <ArticleOptionNav
              id={ id }
            />
          </Col>
        </Link>
      </li>
    </Row>
  );
}

export { view };
