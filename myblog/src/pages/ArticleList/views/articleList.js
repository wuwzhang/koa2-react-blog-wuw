import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { view as ArticleLi } from '../../../components/ArticleLi/';
import { view as TopMenu } from '../../../components/TopMenu/';
import { FormattedMessage } from 'react-intl';
import Pagination from '../../../components/Pagination/pagination';

import { listPageArticle } from '../fetch';
import { articleInit } from '../action';

import {
  Grid,
  Col,
  Row
} from 'react-bootstrap'
import QueueAnim from 'rc-queue-anim';
import { Button } from 'antd';

import './style.css';

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.handlePage = this.handlePage.bind(this);
    this.state = {
      currentPage: 1,
      pageArticleCount: 1
    }
  }

  async componentDidMount() {

    let result = await listPageArticle(1, 10);

    if (result.code === '1') {
      this.props.initArticles(result.articles);
      this.setState({
        // articles: this.props.articles,
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
        // articles: result.articles,
        pageArticleCount: result.count
      })
    } else {
      console.log(result)
    }
  }

  render() {
    let { currentPage, pageArticleCount } = this.state;
    let { articles } = this.props;
    let totalPages = Math.ceil(pageArticleCount / 10);


    return(
      <section>
        <section className='All-Nav'>
          <TopMenu />
        </section>
        <Grid>
          <section className='ArticleList-bg'>
            <section className='ArticleList'>
              <ul>
                <QueueAnim className="demo-content">
                <Row key = 'a'>
                  <Col md={9} sm={9} xs={6}>
                    <h2>
                      <FormattedMessage
                        id="ArticleListHeading"
                        defaultMessage='Article Management'
                      />
                    </h2>
                  </Col>
                  <Col md={3} sm={3} xs={6}>
                    <Link to='/article_post'>
                      <Button className="submit-btn ArtricleList-addArticlebtn" icon="plus" size='large'>
                        <FormattedMessage
                          id="AddArticle"
                          defaultMessage="Add An Article"
                        />
                      </Button>
                    </Link>
                  </Col>
                </Row>
                <Row key = 'b'>
                  <li className='ArticleLi-head'>
                    <Col md={6} ms={6} xs={10}>
                      <p>
                        <FormattedMessage
                          id="Title"
                          defaultMessage="Title"
                        />
                      </p>
                    </Col>
                    <Col md={2} ms={2} xsHidden>
                      <p className="ArticleLi-secondRow-head">
                        <span>
                          <FormattedMessage
                            id="CreateTime"
                            defaultMessage="Create Time"
                          />
                        </span>
                        <span >
                          <FormattedMessage
                            id="Preview"
                            defaultMessage="Preview"
                          />
                        </span>
                        <span>
                          <FormattedMessage
                            id="Comment"
                            defaultMessage="Comment"
                          />
                        </span>
                      </p>
                    </Col>
                    <Col md={2} ms={2} xsHidden>
                      <p className="ArticleLi-thirdRow-head">
                        <span>
                          <FormattedMessage
                            id="Comment"
                            defaultMessage="Comment"
                          />
                        </span>
                        <span>
                          <FormattedMessage
                            id="Public"
                            defaultMessage="Public"
                          />
                        </span>
                      </p>
                    </Col>
                    <Col md={2} ms={2} xs={2}>
                      <p>
                        <FormattedMessage
                          id="Option"
                          defaultMessage="Option"
                        />
                      </p>
                    </Col>
                  </li>
                </Row>
                <section key='c'>

                  {
                    articles.map((article, index) => {
                      return article ? <ArticleLi
                                        id = { article._id }
                                        key = { index }
                                        title = { article.title }
                                        isPublic = { article.isPublic }
                                        isComment = { article.isComment }
                                        commentCount = { article.commentCount }
                                        pv = { article.pv }
                                        index = { index }
                                        update_time = { article.updated_at }
                                        create_time = { article.created_at }
                                      />
                                    : null
                    })
                  }

                </section>
                </QueueAnim>
              </ul>
            </section>
            <Pagination
              totalPages={ totalPages }
              currentPage={ currentPage }
              range={ 5 }
              onChange={ this.handlePage }
            />
          </section>
        </Grid>
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
    initArticles: (articles) => {
      dispatch(articleInit({articles}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
