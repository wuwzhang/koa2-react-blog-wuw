import React from 'react';
import { Link } from 'react-router-dom';

import ArticleOptionNav from '../ArticleOptionNav/articleOptionNav.js';
import ArticleListOption from '../ArticleListOption/articleListOption.js';

import {
  Row,
  Col
} from 'react-bootstrap';
import './style.css';

const view = ({title, id, index, isPublic, isComment, commentCount, pv, update_time, create_time}) => {
  update_time = update_time.slice(0, 10);
  create_time = create_time.slice(0, 10);

  return (
    <section className="ArticleLi">
      <Row>
        <li className='ArticleLi-li'>
          <Link to={`/article_details/${id}`}>
            <Col md={6} sm={6} xs={10}>
              <section className="ArticleLi-firstRow">
                <span className="ArticleLi-Title">{title}</span>
                <span className="ArticleLi-UpdateTime">( {update_time} )</span>
              </section>
            </Col>
            <Col md={2} sm={2} xsHidden>
              <section className="ArticleLi-secondRow">
                <span className="ArticleLi-CreateTime">{create_time}</span>
                <span className="ArticleLi-pv">{pv}</span>
                <span className="ArticleLi-commentCount">{commentCount}</span>
              </section>
            </Col>
            <Col md={2} sm={2} xsHidden>
              <ArticleListOption
                id={id}
                index={index}
                color='#07689f'
                isComment = { isComment }
                isPublic = { isPublic }
              />
            </Col>
            <Col md={2} sm={2} xs={2}>
              <ArticleOptionNav
                id={id}
                index={index}
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
