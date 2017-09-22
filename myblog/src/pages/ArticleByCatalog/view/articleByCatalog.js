import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { view as ArticlCatalogItem } from '../../../components/ArticleItem/';
import { view as CatalogAside } from '../../../components/CatalogAside/';
import { view as TagsCloud } from '../../../components/TagsCloud/';
import { view as TopMenu } from '../../../components/TopMenu/';
import { view as SearchBox } from '../../../components/ArticleSearch/';
import Pagination from '../../../components/Pagination/pagination';

import { getArticlesByCatalog } from '../fetch.js'

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import './style.css';

class ArticleByCatalog extends Component {

  constructor(props) {
    super(props);

    this.handlePage = this.handlePage.bind(this);

    this.state = {
      articles: [],
      catalogCotent: this.props.catalogCotent,
      currentPage: 1,
      pageArticleCount: 1
    }
  }

  async componentDidMount() {

    let result = await getArticlesByCatalog(this.props.catalogCotent, 1, 4);

    if (result.code === '1') {

      this.setState({
        articles: result.articles,
        pageArticleCount: result.count
      })
    } else {
      console.log(result);
    }
  }

  async handlePage(curPage) {
    this.setState({
      currentPage: curPage
    })
    let result = await getArticlesByCatalog(this.props.catalogCotent, curPage, 4);

    if (result.code === '1') {
      this.setState({
        articles: result.articles,
        pageArticleCount: result.count
      })
    } else {
      console.log(result)
    }
  }

  async _handleCatalog(content) {

    let result = await getArticlesByCatalog(content, 1, 4);

    if (result.code === '1') {
      let articles = result.articles;

      this.setState({
        articles: articles,
        catalogCotent: content,
        pageArticleCount: result.count
      })
    } else {
      console.log(result);
    }
  }

  render() {

    let { articles, catalogCotent = this.props.tagContent, currentPage, pageArticleCount } = this.state;

    if (catalogCotent !== this.props.catalogCotent) {
      this._handleCatalog(this.props.catalogCotent);
    }

    let totalPages = Math.ceil(pageArticleCount / 4);
    return (
      <Grid>
        <TopMenu />
        <section>

          <Row>
            <Col md={2} sm={2} xs={12}>
              <SearchBox />
              <CatalogAside
                color = '#07689f'
              />
              {/*<section className='ArticleByCatalog-list'>
                <h6 className="CatalogAsided-CatalogTitle" style={{ color: '#07689f'}}>
                  <FontAwesome className="CatalogAside-icon" name='th' />
                  <span>Catalog List</span>
                </h6>
                <ul>
                  {
                    catalogs.map((item) => {
                      return item ? <li className="ArticleByCatalog-li" onClick={ this._handleCatalog.bind(this, item._id) }>
                                      <span className="catalogName">{item._id}</span>
                                      <span className="catalogCount">({item.count})</span>
                                    </li>
                                  : null
                    })
                  }
                </ul>
              </section>*/}
              <TagsCloud
                color = '#07689f'
              />
            </Col>
            <Col md={10} sm={10} xs={12}>
              <p>
                <span>Search By Catalog > </span>
                <span>{ this.props.catalogCotent }</span>
              </p>
              <ul className="ArticleByCatalog-article">
                {
                  articles.map((article, index) => {
                    return article? <ArticlCatalogItem
                                      key = { index }
                                      article = { article }
                                    />
                                  : null
                  })
                }
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
    );
  }
}

const mapStateToProps = (state) => {
  let pathname = state.routing.location.pathname,
      catalogCotent = pathname.split('/')[2];

  return {
    catalogCotent: catalogCotent,
    catalogs: state.catalog.catalog
  }
}

export default  withRouter(connect(mapStateToProps)(ArticleByCatalog));
