import React, { Component } from 'react';
import { connect } from 'react-redux';
import { detailArticle } from '../fetch';
import { withRouter, Redirect } from 'react-router-dom';

import { articleInitDetails } from '../action.js';
import ArticleOptionNav from '../../../components/ArticleOptionNav/articleOptionNav.js';
import { Comment } from '../../../components/Comment/'
import { Aside } from '../../../components/Aside/index.js';
import { actions as deleteActions } from '../../ArticleList/';
import {
  Col,
  Row
} from 'react-bootstrap';

import './style.css';

const marked = require('marked');

class ArticleDetails extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    (async function () {
      let articleId = this.props.match.params.articleId;
      await this.props.getDetails(articleId);
    }.bind(this))()
  }

  render() {
    if (this.props.deleted) {
      this.props.endDelete();
      return (
        <Redirect
          to = {{
            pathname: '/article_list'
          }}
        />
      );
    }
    let { article } = this.props;
    // console.log(article);
    if (article) {
      return(
        <section>
          <Row>
            <Col md={6} sm={6} xs={6}>
              <h3>{ article.title }</h3>
            </Col>
            <Col md={6} sm={6}  xs={6}>
              <ArticleOptionNav />
            </Col>
          </Row>


          <Row>
            <Col md={10} sm={10} xs={12}>
              {
                article.content ? <div
                                    className="article-content marked-preview"
                                    dangerouslySetInnerHTML={{
                                      __html: marked(article.content, {sanitize: true})
                                    }}
                                  />
                                : null
              }
            </Col>
            <Col md={2} sm={2} xsHidden>
              <Aside
                tags = {article.tags}
                catalog = { article.catalog }
                create_time = { article.created_at ? article.created_at.slice(0, 10) : '' }
                update_time = { article.updated_at ? article.updated_at.slice(0, 10) : '' }
              />
            </Col>
          </Row>
          <Comment />
        </section>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  // console.log('state');
  // console.log(state.articleDetails.article)
  return {
    article: state.articleDetails.article,
    deleted: state.articleList.deleted
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetails: async (articleId) => {
      let result = await detailArticle(articleId)

      if (result.code === '1') {
        // console.log('-----article details-----')
        // console.log(result.article);

        dispatch(articleInitDetails({
          article: result.article
        }))
      } else {
        console.log(result);
      }
    },
    endDelete: () => {
      dispatch(deleteActions.successDelete())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleDetails));
