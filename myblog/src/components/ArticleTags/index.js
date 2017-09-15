import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import FontAwesome from 'react-fontawesome';

import './style.css';

class ArticleTags extends Component {
  // console.log(tags);
  constructor(props) {
    super(props);

    this.getRandColor = this.getRandColor.bind(this);
  }
  getRandColor() {
    let arr = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'];
    return arr[Math.floor(Math.random() * 7)];
  }
  render() {
    let { tags } = this.props;

    if (!tags) {
      tags = [];
    }
    return (
      <section className="ArticleTags">
        <h6 className="ArticleTags-tagTitle"><FontAwesome className="ArticleTags-tagTitle-icon" name='tag' /><span>tags</span></h6>
        <ul>
          {
            tags.map((tag) => {
              return <Link to={ `/article_by_tag/${tag}` }><Tag className="ArticleTags-tagItem" color={this.getRandColor()}> { tag } </Tag> </Link>
            })
          }
        </ul>
      </section>
    );
  }
}

export default ArticleTags;
