import React from 'react';
import { Link } from 'react-router-dom';

import { Tag } from 'antd';

const TagItem = ({ content, color = 'blue' }) => {

  return (
    <Link to={ `/article_by_tag/${content}` }>
      <Tag style={{ marginBottom: 3 }} color={ color }> { content } </Tag>
    </Link>
  );
}

export default TagItem;
