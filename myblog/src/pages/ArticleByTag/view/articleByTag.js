import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { view as TagsCloud } from '../../../components/TagsCloud/';

import { view as ArticlTagItem } from '../../../components/ArticleItem/';
import { view as TopMenu } from '../../../components/TopMenu/';
import { view as CatalogAside } from '../../../components/CatalogAside/';
import { view as SearchBox } from '../../../components/ArticleSearch/';
import Pagination from '../../../components/Pagination/pagination';

import { fetchs as TagsFetch } from '../../../components/TagsCloud/';
import { getArticlesByTag } from '../fetch.js';

import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';

class ArticleByTag extends Component {

  constructor(props) {
    super(props);

    this.handlePage = this.handlePage.bind(this);

    this.state = {
      articles: [],
      tagContent: this.props.tagContent,
      currentPage: 1,
      pageArticleCount: 1
    }
  }

  async componentDidMount() {
    let result = await Promise.all([getArticlesByTag(this.props.tagContent, 1, 4),
                                    TagsFetch.getTags()]);

    if (result[0].code === '1' || result[1].code === '1') {
      this.setState({
        articles: result[0].articles,
        tags: result[1].tags,
        pageArticleCount: result[0].count
      })
    } else {
      console.log(result);
    }
  }

  async handlePage(curPage) {
    this.setState({
      currentPage: curPage
    })
    let result = await getArticlesByTag(this.props.tagContent, curPage, 4);

    if (result.code === '1') {
      this.setState({
        articles: result.articles,
        pageArticleCount: result.count
      })
    } else {
      console.log(result)
    }
  }

  async _handleTags(content) {

    let result = await getArticlesByTag(content, 1, 4);

    if (result.code === '1') {
      this.setState({
        articles: result.articles,
        tagContent: content,
        pageArticleCount: result.count
      })
    } else {
      console.log(result);
    }
  }

  render() {

    let { articles, tagContent = this.props.tagContent, currentPage, pageArticleCount } = this.state;
    let { route } = this.props;
    if (tagContent !== this.props.tagContent) {
      this._handleTags(this.props.tagContent);
    }

    let totalPages = Math.ceil(pageArticleCount / 4);
    return (
      <Grid>
        <TopMenu />
        <section>

          <Row>
            <Col  md={2} sm={2} xs={12}>
              <SearchBox />
              <TagsCloud
                color = '#07689f'
              />
              <CatalogAside
                color='#07689f'
              />
            </Col>
            <Col  md={10} sm={10} xs={12}>
              <p>
                <span>Search By Tag > </span>
                <span>{ tagContent }</span>
              </p>
              <ul>
                {
                  articles.map((article, index) => {
                    return article? <ArticlTagItem
                                      key = { index }
                                      article = { article }
                                      route = { route }
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
      tagContent = pathname.split('/')[2],
      route = pathname.split('/')[1];
  return {
    tagContent: tagContent,
    route: route
  }
}

export default  withRouter(connect(mapStateToProps)(ArticleByTag));
