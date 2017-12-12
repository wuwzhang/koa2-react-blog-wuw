import React, { Component } from "react";
import "./style.css";

import { Row, Col } from "antd";

class CommentPagination extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  getRange() {
    return this.props.range || this.props.pages || 5;
  }

  getPages(totalPages, currentPage, range) {
    let pages = [],
      left,
      right;

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    left = currentPage - Math.floor(range / 2) + 1;
    if (left < 1) {
      left = 1;
    }
    right = left + range - 2;
    if (right >= totalPages) {
      right = totalPages;
      left = right - range + 2;
      if (left < 1) {
        left = 1;
      }
    } else {
      right -= left > 1 ? 1 : 0;
    }

    if (left > 1) {
      pages.push(1);
    }
    if (left > 2) {
      pages.push("<..");
    }
    for (let i = left; i < right + 1; i++) {
      pages.push(i);
    }
    if (right < totalPages - 1) {
      pages.push("..>");
    }
    if (right < totalPages) {
      pages.push(totalPages);
    }

    return pages;
  }

  handleChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    let { commentsCount = 1, currentPage = 1, totalPages = 1 } = this.props,
      range = this.getRange(),
      pages = this.getPages(totalPages, currentPage, range),
      items = [];

    items.push(
      <li
        key="previous"
        className={currentPage <= 1 ? "disabled" : ""}
        onClick={
          currentPage <= 1 ? null : () => this.handleChange(currentPage - 1)
        }
      >
        <span>&lt;</span>
      </li>
    );
    pages.forEach(value => {
      if (value === "<.." || value === "..>") {
        items.push(
          <li key={value}>
            <span>...</span>
          </li>
        );
      } else {
        items.push(
          <li
            key={value}
            className={value === currentPage ? "active" : ""}
            onClick={
              value === currentPage ? null : () => this.handleChange(value)
            }
          >
            <span>{value}</span>
          </li>
        );
      }
    });
    items.push(
      <li
        key="next"
        className={currentPage >= totalPages ? "disabled" : ""}
        onClick={
          currentPage >= totalPages
            ? null
            : () => this.handleChange(currentPage + 1)
        }
      >
        <span>&gt;</span>
      </li>
    );

    return (
      <Row>
        <section className="commentPagination">
          <Col md={12} sm={4}>
            <div className="countPage">
              Total <span>{commentsCount}</span> pages
            </div>
          </Col>
          <Col md={12} sm={20}>
            <ul className="commentPagination-list">{items}</ul>
          </Col>
        </section>
      </Row>
    );
  }
}

export default CommentPagination;
