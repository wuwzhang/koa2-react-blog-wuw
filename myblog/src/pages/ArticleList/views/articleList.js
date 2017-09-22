import React, { Component } from 'react';
import { connect } from 'react-redux';

import { view as ArticleLi } from '../../../components/ArticleLi/';
import { view as TopMenu } from '../../../components/TopMenu/';
import Pagination from '../../../components/Pagination/pagination';

import { listPageArticle } from '../fetch';
import { articleInit } from '../action';

import {
  Grid,
  Col,
  Row
} from 'react-bootstrap'

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
      <Grid>
        <TopMenu />
        <section className='ArticleList'>
          <section>
            <ul>
              <Row>
                <li className='ArticleLi-head'>
                  <Col md={6} ms={6} xs={10}><p>标题</p></Col>
                  <Col md={2} ms={2} xsHidden>
                    <p className="ArticleLi-secondRow">
                      <span style={{ width: '75px' }}>创建时间</span>
                      <span style={{ width: '30px' }}>浏览</span>
                      <span style={{ width: '45px' }}>评论</span>
                    </p>
                  </Col>
                  <Col md={2} ms={2} xsHidden>
                    <p>
                      <span>评论</span>
                      <span>公开</span>
                    </p>
                  </Col>
                  <Col md={2} ms={2} xs={2}><p>操作</p></Col>
                </li>
              </Row>
              <section>
                {
                  articles.map((article, index) => {
                    return article ? <ArticleLi
                                      id = { article._id }
                                      key = { index }
                                      index = { index }
                                      title = { article.title }
                                      isPublic = { article.isPublic }
                                      isComment = { article.isComment }
                                      commentCount = { article.commentCount }
                                      pv = { article.pv }
                                      update_time = { article.updated_at }
                                      create_time = { article.created_at }
                                    />
                                  : null
                  })
                }
              </section>
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
