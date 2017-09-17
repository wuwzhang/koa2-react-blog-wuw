import React, { Component } from 'react';
import { listPageArticle } from '../fetch';

// import { articleInit } from '../action';
// import { actions as articleEditActions } from '../../ArticleEdit/';

import { view as ArticleLi } from '../../../components/ArticleLi/';
import Pagination from '../../../components/Pagination/pagination';

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.handlePage = this.handlePage.bind(this);
    this.state = {
      currentPage: 1,
      articles: [],
      pageArticleCount: 1
    }
  }

  async componentDidMount() {
    // await this.props.initArticles(1, 10);
    let result = await listPageArticle(1, 10);

    if (result.code === '1') {
      this.setState({
        articles: result.articles,
        pageArticleCount: result.count
      })
    } else {
      console.log(result)
    }
  }

  async handlePage(curPage) {

    this.setState({
      currentPage: curPage
    })
    let result = await listPageArticle(curPage, 10);

    if (result.code === '1') {
      this.setState({
        articles: result.articles,
        pageArticleCount: result.count
      })
    } else {
      console.log(result)
    }
  }

  render() {
    const { currentPage, articles, pageArticleCount } = this.state
    // console.log(pageArticleCount);
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

export default ArticleList;
