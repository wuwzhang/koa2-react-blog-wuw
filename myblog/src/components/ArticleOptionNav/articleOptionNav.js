import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchs as editFetchs, actions as editActions } from '../../pages/ArticlePostOrEdit';

import {
  Redirect
} from 'react-router'

import './style.css';

class ArticleOptionNav extends Component {

  constructor(props) {
    super(props);

    this.editArticle = this.editArticle.bind(this);
  }

  // shouldComponentUpdate(next, nextState) {

  // }

  editArticle(event) {
    event.preventDefault();
    this.props.editPost(this.props.articleId);
  }

  render() {
    console.log(this.props);

    if (this.props.startEditing === true) {
      const articleId = this.props.id || this.props.articleId;
      console.log(articleId);
      return (
        <Redirect to={{
          pathname: `/article_edit/${articleId}`
        }}/>
      );
    }
    return (
      <nav>
        <ul>
          <li><button
                onClick = { this.editArticle }
              >Edit</button>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {

  let pathname = state.routing.location.pathname,
      articleId = pathname.split('/')[2];

  let startEditing = state.articleEdit.startEditing;

  return {
    articleId: articleId,
    startEditing: startEditing
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    editPost: async (articleId) => {

      dispatch(editActions.startEditArticle());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleOptionNav);
