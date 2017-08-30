import React from 'react';
import {
  Row,
  Col
} from 'react-bootstrap'

const marked = require('marked');

const CommentItem = ({user, content, create_at}) => {
  create_at = create_at.slice(0, 10);
  return (
    <Row>
      <li>
        <Col md={2}><span>{ user.username }: </span></Col>
        <Col md={8}>
          {
           content ? <span
                      dangerouslySetInnerHTML={{
                        __html: marked(content, {sanitize: true})
                      }}
                     ></span>
                   : null
          }
        </Col>
        <Col md={2}><span>{ create_at }</span></Col>
      </li>
    </Row>

  )
}

export default CommentItem;

