import React, { Component } from 'react';

class TagItem extends Component {

  render() {

    const { content }  = this.props;

    return (
      <li> { content } </li>
    );
  }
}

export default TagItem;
