import React from 'react';
import { Link } from 'react-router-dom';

import CommentOptionNav from '../CommentOptionNav/commentOptionNav.js';

import {
  Row,
  Col
} from 'react-bootstrap';

const view = ({articleId, user, articleTitle, isChecked, content, id, create_time, index}) => {
  create_time = create_time.slice(0, 10);
  content = content.length > 15 ? content.slice(0, 15) + '...'
                                : content

  return (
    <section className="ArticleLi">
      <Row>
        <li className="ArticleLi-li">
          <Link to={`/article_details/${articleId}`}>
            <Col md={3}>
              <span>{ articleTitle }</span>
            </Col>
            <Col md={5}>
              <span>{ content }</span>
              <span style={{color: '#999'}} className="ArticleLi-UpdateTime">( { user }) </span>
            </Col>
            <Col md={2}>
              <span>{ create_time }</span>
            </Col>
            <Col md={2}>
              <CommentOptionNav
                id = { id }
                isChecked = { isChecked }
                index = { index }
                articleId = { articleId }
                myStyle = { { color: '#FF7E67' } }
              />
            </Col>
          </Link>
        </li>
      </Row>
    </section>
  );
}

export { view };
