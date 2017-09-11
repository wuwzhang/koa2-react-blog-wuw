import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listPageArticle } from '../fetch';

import { articleInit } from '../action';
import { actions as articleEditActions } from '../../ArticlePostOrEdit/';

import { view as ArticleLi } from '../../../components/ArticleLi/';
import Pagination from '../../../components/Pagination/pagination';

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.handlePage = this.handlePage.bind(this);
    this.state = {
      currentPage: 1
    }
  }

  componentDidMount() {
    (async function() {
      await this.props.initArticles(1, 10);
    }.bind(this))();
  }

  handlePage(curPage) {

    this.setState({
      currentPage: curPage
    })
    this.props.initArticles(curPage, 10);
  }

  render() {
    let { articles, pageArticleCount } = this.props;
    const { currentPage } = this.state
    // console.log(this.props);
    // console.log(articles)
    let totalPages = Math.ceil(pageArticleCount / 10);

    return(
      <section>
        <h2>Article List</h2>
        <section>
          <ul>
          {
            articles.map((article, index) => {
              return (
                article ? <ArticleLi
                            id = { article._id }
                            key = { index }
                            index = { index }
                            title = { article.title }
                            update_time = { article.updated_at }
                            create_time = { article.created_at }
                          />
                        : null
              );
            })
          }
          </ul>
        </section>
        <Pagination
          totalPages={ totalPages }
          currentPage={ currentPage }
          range={ 5 }
          onChange={ this.handlePage }
        />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state.articleList)
  return {
    articles: state.articleList.articles,
    pageArticleCount: state.articleList.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initArticles: async (page, eachPageArticles) => {
      // console.log(articleEditActions);
      dispatch(articleEditActions.initStartEditArticle());
      let result = await listPageArticle(page, eachPageArticles);
      // console.log('-----article list-----')
      // console.log(result);
      if (result.code === '1') {
        dispatch(articleInit({
          count: result.count,
          articles: result.articles
        }))
      } else {
        console.log(result);
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
