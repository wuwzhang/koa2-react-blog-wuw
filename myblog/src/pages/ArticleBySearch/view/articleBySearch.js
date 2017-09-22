import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { view as ArticlSearchItem } from '../../../components/ArticleItem/';
import { view as CatalogAside } from '../../../components/CatalogAside/';
import { view as TagsCloud } from '../../../components/TagsCloud/';
import { view as TopMenu } from '../../../components/TopMenu/';
import { view as SearchBox } from '../../../components/ArticleSearch/';

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import './style.css';

class ArticleBySearch extends Component {

  render() {

    let { articles } = this.props;
    return (
      <Grid>
        <TopMenu />
        <section>

          <Row>
            <Col md={2} sm={2} xs={12}>
              <SearchBox />
              <TagsCloud
                color = '#07689f'
              />
              <CatalogAside
                color='#07689f'
              />
            </Col>
            <Col md={10} sm={10} xs={12}>
              <ul className="ArticleBySearch-article">
                {
                  articles ? articles.map((article, index) => {
                              return article? <ArticlSearchItem
                                                key = { index }
                                                article = { article }
                                              />
                                            : null
                            })
                           :null
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

  return {
    articles: state.articleSearch.articles
  }
}

export default  withRouter(connect(mapStateToProps)(ArticleBySearch));
