import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listArticle } from '../fetch';

import { articleInit } from '../action';

import { view as ArticleLi } from '../../../components/ArticleLi/';

class ArticleList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    (async function() {
      await this.props.initArticles();
    }.bind(this))();
  }

  render() {
    let { articles } = this.props;

    return(
      <section>
        <h2>Article List</h2>
        <section>
          <ul>
          {
            articles.map((article, index) => (
              <ArticleLi
                key = { article._id }
                index = { index }
                title = { article.title }
                update_time = { article.updated_at }
                create_time = { article.created_at }
              />
            ))
          }
          </ul>
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articleList.articles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initArticles: async () => {
      let result = await listArticle();
      if (result.code === '1') {
        dispatch(articleInit({
          articles: result.articles
        }))
      } else {
        console.log(result);
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
