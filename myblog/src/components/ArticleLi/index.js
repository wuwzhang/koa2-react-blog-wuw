import React from "react";
import { Link } from "react-router-dom";

import ArticleOptionNav from "../ArticleOptionNav/articleOptionNav.js";
import ArticleListOption from "../ArticleListOption/articleListOption.js";

import { Row, Col } from "antd";
import "./style.css";

const view = ({
  title,
  id,
  index,
  isPublic,
  isComment,
  commentCount,
  pv,
  update_time,
  create_time
}) => {
  update_time = update_time.slice(0, 10);
  create_time = create_time.slice(0, 10);

  return (
    <section className="ArticleLi">
      <Row>
        <li className="ArticleLi-li">
          <Link to={`/article_details/${id}`}>
            <Col md={12} sm={12} xs={20}>
              <section className="ArticleLi-firstRow">
                <span className="ArticleLi-Title">{title}</span>
                <span className="ArticleLi-UpdateTime">( {update_time} )</span>
              </section>
            </Col>
            <Col md={4} sm={4} xs={0}>
              <section className="ArticleLi-secondRow">
                <span className="ArticleLi-CreateTime">{create_time}</span>
                <span className="ArticleLi-pv">{pv}</span>
                <span className="ArticleLi-commentCount">{commentCount}</span>
              </section>
            </Col>
            <Col md={4} sm={4} xs={0}>
              <ArticleListOption
                id={id}
                index={index}
                color="#07689f"
                isComment={isComment}
                isPublic={isPublic}
              />
            </Col>
            <Col md={4} sm={4} xs={4}>
              <ArticleOptionNav
                id={id}
                index={index}
                myStyle={{ color: "#FF7E67" }}
              />
            </Col>
          </Link>
        </li>
      </Row>
    </section>
  );
};

export { view };
