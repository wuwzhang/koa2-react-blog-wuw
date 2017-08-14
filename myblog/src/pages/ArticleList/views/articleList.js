import React, { Component } from 'react';
import { connect } from 'react-redux';

class ArticleList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return(
     <div></div>
    )
  }
}

export default connect()(ArticleList);
