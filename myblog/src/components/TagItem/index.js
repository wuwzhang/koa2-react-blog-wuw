import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Tag } from 'antd';

class TagItem extends Component {

  render() {

    const { content }  = this.props;

    return (
      <Link to={ `/article_by_tag/${content}` }><Tag style={{ marginBottom: 3 }} color="blue"> { content } </Tag> </Link>
    );
  }
}

export default TagItem;
