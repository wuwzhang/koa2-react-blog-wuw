import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { view as ArticlSearchItem } from '../../../components/ArticleItem/';
import { view as CatalogAside } from '../../../components/CatalogAside/';
import { view as TagsCloud } from '../../../components/TagsCloud/';
import { view as TopMenu } from '../../../components/TopMenu/';
import { view as Rank } from '../../../components/Rank/';
import Footer from '../../../components/Footer/index.js';
import { fetchs as searchFetch, actions as searchAction } from '../../../components/ArticleSearch/';
import Pagination from '../../../components/Pagination/pagination';

import { FormattedMessage } from 'react-intl';

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Button, Spin } from 'antd';
import QueueAnim from 'rc-queue-anim';
import './style.css';

class ArticleBySearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1
    }

    this.handlePage = this.handlePage.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  async componentDidMount() {
    let { articles, searchContent } = this.props;

    if (!articles || articles.length === 0) {
      let result = await searchFetch.getArticleBySearch(searchContent, 1, 4);

      if (result.code === '1') {
        this.setState({
          redirectToReferrer: true
        })
        this.props.successSearch(result.articles, result.count);

      } else {
        this.props.failSearch(result.message);
      }
    }

  }

  async handlePage(curPage) {
    this.setState({
      currentPage: curPage,
      redirectToReferrer: false
    })
    let result = await searchFetch.getArticleBySearch(this.props.searchContent, curPage, 4);

    if (result.code === '1') {
      this.setState({
        articles: result.articles,
        pageArticleCount: result.count,
        redirectToReferrer: false
      })
      this.props.successSearch(result.articles, result.count);
    } else {
      console.log(result)
      this.props.failSearch(result.message);
    }
  }

  async _clickToSearchArtciles() {

    this.props.startSearch();

    let { value } = this.state;

    // let result = await searchFetch.getArticleBySearch(value, 1, 4);

    // if (result.code === '1') {
    //   this.setState({
    //     redirectToReferrer: true
    //   })
    //   this.props.successSearch(result.articles, result.count);

    // } else {

    //   this.props.failSearch(result.message);
    //   console.log(result);
    // }
    //
    window.location.href = '/article_by_search/' + value;
  }

  _handleKeyPress(event) {
    if(event.key === 'Enter'){
      this._clickToSearchArtciles();
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
                  <section className='ArticleSearch'>
                    <h6 className="ArticleSearch-SearchTitle" style={{color: '#07689f'}}>
                      <FontAwesome className="ArticleSearch-SearchTitle-icon" name='search' />
                      <span>
                        <FormattedMessage
                          id="Search"
                          defaultMessage="Search"
                        />
                      </span>
                    </h6>
                    <from>
                      <input
                        type="text"
                        value={ this.state.value }
                        onChange={ (event) => this.setState({ value: event.target.value }) }
                        onKeyPress={this._handleKeyPress}
                      />
                      <Button
                        shape="circle"
                        icon="search"
                        onClick = { () => this._clickToSearchArtciles() }
                        htmlType="submit"
                      />
                    </from>
                    {
                      this.props.searching ? <Spin spinning={this.state.loading} delay={500} size = 'large' />
                                           : null
                    }
                  </section>
                  <TagsCloud
                    color = '#07689f'
                  />
                  <CatalogAside
                    color= '#07689f'
                  />
                </section>
                <Rank showCharNum={8} style={{width: '100%', padding:'10px', border: '0'}}/>
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
        <Footer />
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
