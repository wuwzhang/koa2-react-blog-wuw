import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TagItem extends Component {

  render() {

    const { content }  = this.props;

    return (
      <Link to={ `/article_by_tag/${content}` }><li> { content } </li> </Link>
    );
  }
}

export default TagItem;
