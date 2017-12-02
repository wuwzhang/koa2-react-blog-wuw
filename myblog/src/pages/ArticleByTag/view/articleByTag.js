import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { view as TagsCloud } from '../../../components/TagsCloud/';

import { view as ArticlTagItem } from '../../../components/ArticleItem/';
import { view as TopMenu } from '../../../components/TopMenu/';
import { view as CatalogAside } from '../../../components/CatalogAside/';
import { view as SearchBox } from '../../../components/ArticleSearch/';
import { view as Rank } from '../../../components/Rank/';
import Footer from '../../../components/Footer/index.js'
import Pagination from '../../../components/Pagination/pagination';

import { fetchs as TagsFetch } from '../../../components/TagsCloud/';
import { getArticlesByTag } from '../fetch.js';

import QueueAnim from 'rc-queue-anim';
import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';
import './style.css';
import { FormattedMessage } from 'react-intl';

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
      <section>
        <section className='All-Nav'>
          <TopMenu />
        </section>
        <Grid>
          <section className="articleByxx-container articleByTag-bg">
            <Row>
              <Col  md={2} sm={2} xs={12}>
                <section className="articleByxx-Aside">
                  <SearchBox />
                  <TagsCloud
                    color = '#07689f'
                  />
                  <CatalogAside
                    color='#07689f'
                  />
                </section>
                <Rank showCharNum={8} style={{width: '100%', padding:'10px', border: '0'}}/>
              </Col>
              <Col  md={10} sm={10} xs={12}>
                <p>
                  <span><FormattedMessage
                    id="SearchByTag"
                    defaultMessage='Search By Tag'
                    /> > </span>
                  <span>{ tagContent }</span>
                </p>
                <ul>
                  <QueueAnim className="demo-content">
                  {
                    articles.map((article, index) => {
                      return article? <ArticlTagItem
                                        key = { index }
                                        ind = { index }
                                        article = { article }
                                        route = { route }
                                      />
                                    : null
                    })
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
  let pathname = state.routing.location.pathname,
      tagContent = pathname.split('/')[2],
      route = pathname.split('/')[1];
  return {
    tagContent: tagContent,
    route: route
  }
}

export default  withRouter(connect(mapStateToProps)(ArticleByTag));
