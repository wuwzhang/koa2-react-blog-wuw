import React, { Component } from 'react';
import './style.css';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  getRange() {  // 显示的页码按钮数量， 默认为 10
    return this.props.range || this.props.pages || 5;
  }

  getCurrentPage() { // 获取当前页面，默认 1
    return this.props.currentPage || this.props.index || 1;
  }

  getPages() {
    const { totalPages } = this.props; // 总页数
    let left,
        right;
    const range = this.getRange(); // 显示的页码按钮数量
    const pages = [];
    let currentPage = this.getCurrentPage(); // 当前页码

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
      pages.push('<..');
    }
    for (let i = left; i < right + 1; i++) {
      pages.push(i);
    }
    if (right < totalPages - 1) {
      pages.push('..>');
    }
    if (right < totalPages) {
      pages.push(totalPages);
    }
    return { pages, totalPages };
  }

  handleChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    const currentPage = this.getCurrentPage();
    const items = [];
    const { pages, totalPages } = this.getPages();

    items.push(
      <li
        key="previous"
        className={ currentPage <= 1 ? 'disabled' : '' }
        onClick={ currentPage <= 1 ? null : () => this.handleChange(currentPage - 1) }
      >
        <span>&lt;</span>
      </li>
    );
    pages.forEach((value) => {
      if (value === '<..' || value === '..>') {
        items.push(<li key={ value }><span>...</span></li>);
      } else {
        items.push(
          <li
            key={ value }
            className={ value === currentPage ? 'active' : '' }
            onClick={ value === currentPage ? null : () => this.handleChange(value) }
          >
            <span>{ value }</span>
          </li>
        );
      }
    });
    items.push(
      <li
        key="next"
        className={ currentPage >= totalPages ? 'disabled' : '' }
        onClick={ currentPage >= totalPages ? null : () => this.handleChange(currentPage + 1) }
      >
        <span>&gt;</span>
      </li>
    );
    return (
      <ul className="pagination">
        { items }
      </ul>
    );
  }
}
export default Pagination;
