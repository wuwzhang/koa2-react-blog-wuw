import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { view as ArticlSearchItem } from '../../../components/ArticleItem/';
import { view as CatalogAside } from '../../../components/CatalogAside/';
import { view as TagsCloud } from '../../../components/TagsCloud/';
import { view as TopMenu } from '../../../components/TopMenu/';
import { view as SearchBox, fetchs as searchFetch, actions as searchAction } from '../../../components/ArticleSearch/';
import Pagination from '../../../components/Pagination/pagination';

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import QueueAnim from 'rc-queue-anim';
import './style.css';

class ArticleBySearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1
    }

    this.handlePage = this.handlePage.bind(this);
  }

  async handlePage(curPage) {
    this.setState({
      currentPage: curPage
    })
    let result = await searchFetch.getArticleBySearch(this.props.searchContent, curPage, 4);

    if (result.code === '1') {
      this.setState({
        articles: result.articles,
        pageArticleCount: result.count
      })
      this.props.successSearch(result.articles, result.count);
    } else {
      console.log(result)
      this.props.failSearch(result.message);
    }
  }

  render() {

    let { articles } = this.props;
    let { currentPage } = this.state;

    let totalPages = Math.ceil(this.props.count / 4);

    return (
      <section>
        <section className='All-Nav'>
          <TopMenu />
        </section>
        <Grid>
          <section className="articleByxx-container articleSearch-bg">

            <Row>
              <Col md={2} sm={2} xs={12}>
                <section className="articleByxx-Aside">
                  <SearchBox />
                  <TagsCloud
                    color = '#07689f'
                  />
                  <CatalogAside
                    color= '#07689f'
                  />
                </section>
              </Col>
              <Col md={10} sm={10} xs={12}>
                <ul className="ArticleBySearch-article">
                  <QueueAnim className="demo-content">
                  {
                    articles ? articles.map((article, index) => {
                                return article? <ArticlSearchItem
                                                  ind = { index}
                                                  key = { index }
                                                  article = { article }
                                                />
                                              : null
                              })
                             :null
                  }
                  </QueueAnim>
                </ul>
                <Pagination
                  totalPages={ totalPages }
                  currentPage={ currentPage }
                  range={ 5 }
                  onChange={ this.handlePage }
                />
              </Col>
            </Row>
          </section>
        </Grid>
      </section>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    articles: state.articleSearch.articles,
    count: state.articleSearch.count,
    searchContent: state.routing.location.pathname.split('/')[2]
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    startSearch: () => {
      dispatch(searchAction.searchStart());
    },
    successSearch: (articles, count) => {
      dispatch(searchAction.searchSuccess());
      dispatch(searchAction.successSearch(articles, count));
    },
    failSearch: (error) => {
      dispatch(searchAction.searchFail());
      dispatch(searchAction.failSearch(error));
    }
  }
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleBySearch));
