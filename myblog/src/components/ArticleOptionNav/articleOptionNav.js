import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as editActions } from '../../pages/ArticlePostOrEdit';
import { fetchs as deleteFetchs, actions as deleteActions } from '../../pages/ArticleList/';

import {
  Redirect
} from 'react-router'

import {
  Alert,
  Button
} from 'react-bootstrap';
import './style.css';

class ArticleOptionNav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      alertVisble: false
    }

    this._editArticle = this._editArticle.bind(this);
    this._deleteArticle = this._deleteArticle.bind(this);

    this._handleDeleteAlertShow = this._handleDeleteAlertShow.bind(this);
    this._handleDeleteAlertDismiss = this._handleDeleteAlertDismiss.bind(this);

  }

  // shouldComponentUpdate(next, nextState) {

  // }

  _editArticle(event) {
    event.preventDefault();
    this.props.editPost(this.props.articleId);
  }

  _deleteArticle(event) {
    event.preventDefault();
    const articleId = this.props.id || this.props.articleId;
    // console.log(this.props.index);
    this.props.deletePost(articleId, this.props.index);
    this.setState({
      alertVisble: false
    })
  }

  _handleDeleteAlertShow(event) {
    event.preventDefault();
    this.setState({
      alertVisble: true
    })

  }

  _handleDeleteAlertDismiss(event) {
    event.preventDefault();
    this.setState({
      alertVisble: false
    })
  }

  render() {

    if (this.state.alertVisble) {
      return (
        <Alert bsStyle="danger" onDismiss={this._handleDeleteAlertDismiss}>
          <p>Confirm delete this items?</p>
          <p>
            <Button
              bsStyle="danger"
              onClick={this._deleteArticle}
            >OK</Button>
            <Button onClick={this._handleDeleteAlertDismiss}>Cancel</Button>
          </p>
        </Alert>
      );
    }
    if (this.props.startEditing === true) {
      const articleId = this.props.id || this.props.articleId;

      return (
        <Redirect to={{
          pathname: `/article_edit/${articleId}`
        }}/>
      );
    }
    return (
      <nav className="article-option-nav">
        <ul>
          <li>
            <span
              onClick = { this._editArticle }
            >Edit</span>
          </li>
          <li>
            <span
              onClick = { this._handleDeleteAlertShow }
            >Delete</span>
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
    },
    deletePost: async (articleId, index) => {
      let result = await deleteFetchs.deleteArticle(articleId);

      if (result.code === '1') {
        dispatch(deleteActions.artcileDelete(index));
      } else {
        console.log(result)
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleOptionNav);
