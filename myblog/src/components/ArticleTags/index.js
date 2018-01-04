import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import FontAwesome from "react-fontawesome";

import "./style.css";

import { FormattedMessage } from "react-intl";

class ArticleTags extends Component {
  constructor(props) {
    super(props);

    this.getRandColor = this.getRandColor.bind(this);
  }
  getRandColor() {
    let arr = ["pink", "red", "orange", "green", "cyan", "blue", "purple"];
    return arr[Math.floor(Math.random() * 7)];
  }
  render() {
    let { tags, color = "#369" } = this.props;

    if (!tags) {
      tags = [];
    }
    return (
      <section className="ArticleTags">
        <h6
          className="ArticleTags-tagTitle aside-title"
          style={{ color: color }}
        >
          <FontAwesome className="ArticleTags-tagTitle-icon" name="tag" />
          <span style={{ color: color }}>
            <FormattedMessage id="Tags" defaultMessage="Tags" />
          </span>
        </h6>
        <ul>
          {tags.map(tag => {
            return (
              <Link to={`/article_by_tag/${tag}`}>
                <Tag
                  className="ArticleTags-tagItem"
                  color={this.getRandColor()}
                >
                  {" "}
                  {tag}{" "}
                </Tag>{" "}
              </Link>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default ArticleTags;
