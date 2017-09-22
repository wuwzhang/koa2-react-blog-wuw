import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getArticlesByCatalog } from '../fetch.js'
import { view as ArticlCatalogItem } from '../../../components/ArticleItem/';
import { view as TagsCloud } from '../../../components/TagsCloud/';
import { view as TopMenu } from '../../../components/TopMenu/';
import { view as SearchBox } from '../../../components/ArticleSearch/';

import FontAwesome from 'react-fontawesome';

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import './style.css';

class ArticleByCatalog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      articles: []
    }
  }

  async componentDidMount() {

    let result = await getArticlesByCatalog(this.props.catalogCotent);

    if (result.code === '1') {
      let articles = result.articles;

      this.setState({
        articles: articles
      })
    } else {
      console.log(result);
    }
  }

  async _handleCatalog(content) {

    let result = await getArticlesByCatalog(content);

    if (result.code === '1') {
      let articles = result.articles;

      this.setState({
        articles: articles
      })
    } else {
      console.log(result);
    }
  }

  render() {

    let { articles } = this.state;
    let { catalogs } = this.props;
    return (
      <Grid>
        <TopMenu />
        <section>

          <Row>
            <Col md={2} sm={2} xs={12}>
              <SearchBox />
              <section className='ArticleByCatalog-list'>
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
              </section>
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
