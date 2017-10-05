import React, { Component } from 'react';
import { connect } from 'react-redux';
import { detailArticle } from '../fetch';
import { withRouter, Redirect } from 'react-router-dom';

import { BackTop } from 'antd';

import { articleInitDetails } from '../action.js';
import ArticleOptionNav from '../../../components/ArticleOptionNav/articleOptionNav.js';
import { Comment } from '../../../components/Comment/'
import { Aside } from '../../../components/Aside/index.js';
import { view as TopMenu } from '../../../components/TopMenu/';

import { actions as deleteActions } from '../../ArticleList/';

import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import './style.css';

const marked = require('marked');

class ArticleDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preArticle: {},
      nextArticle: {}
    }

    import('highlight').then(({hljs}) => {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: true,
        highlight: (code) => hljs.highlightAuto(code).value,
        math: true
      });
    }).catch(err => {
      console.log(err);
    })
  }

  async componentDidMount() {
    let articleId = this.props.match.params.articleId;
    let result = await detailArticle(articleId);

    if (result.code === '1') {

      this.props.getDetails(result.article);

      this.setState({
        preArticle: result.preArticle,
        nextArticle: result.nextArticle
      })
    } else {
      console.log(result)
    }

  }

  async _getNewArticle(articleId) {
    let result = await detailArticle(articleId);

    if (result.code === '1') {
      this.props.getDetails(result.article);

      this.setState({
        preArticle: result.preArticle,
        nextArticle: result.nextArticle
      })
    } else {
      console.log(result)
    }
  }

  render() {
    if (this.props.deleted) {
      this.props.endDelete();
      return (
        <Redirect
          to = {{
            pathname: '/article_list'
          }}
        />
      );
    }
    let { article } = this.props;
    let { preArticle, nextArticle } = this.state;

    if (article) {
      return(
        <section>
          <section className='All-Nav'>
            <TopMenu />
          </section>
          <Grid>
            <section>
              <Row>
                <section className='ArticleDetials-titleContainer'>
                  <Col md={6} sm={6} xs={6}>
                    <h3 className='ArticleDetails-articleTitle'>{ article.title }</h3>
                  </Col>
                  <Col md={6} sm={6}  xs={6}>
                    <ArticleOptionNav
                      myStyle = { { color: '#FF7E67', fontSize: '16px', marginRight: '15px' } }
                    />
                  </Col>
                </section>
              </Row>
              <Row>
                <Col md={10} sm={10} xs={12}>
                  {
                    article.content ? <div
                                        className="article-content marked-preview"
                                        dangerouslySetInnerHTML={{
                                          __html: marked(article.content)
                                        }}
                                      />
                                    : null
                  }
                </Col>
                <Col md={2} sm={2} xsHidden>
                  <Aside
                    color='#07689f'
                    tags = {article.tags}
                    catalog = { article.catalog }
                    create_time = { article.created_at ? article.created_at.slice(0, 10) : '' }
                    update_time = { article.updated_at ? article.updated_at.slice(0, 10) : '' }
                  />
                </Col>
              </Row>
              <Row>

                <section className="pre-next">
                  <ul>
                    {
                      preArticle? <li onClick={()=>this._getNewArticle(preArticle._id)}>
                                    <FontAwesome name='angle-left'/>
                                    <span>&nbsp;&nbsp;{preArticle.title}</span>
                                  </li>
                                : null

                    }
                    <li>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</li>
                    {
                      nextArticle ? <li onClick={()=>this._getNewArticle(nextArticle._id)}>
                                      <span>{nextArticle.title}&nbsp;&nbsp;</span>
                                      <FontAwesome name='angle-right'/>
                                    </li>
                                  : null
                    }
                  </ul>
                </section>

              </Row>
              <Row>
                {
                  article.isComment ? <Col md={10} ms={10} xs={10}>
                                        <Comment />
                                      </Col>
                                    : <p>此篇文章暂不开放评论</p>
                }
              </Row>
            <BackTop />
            </section>
          </Grid>
        </section>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  // console.log('state');
  // console.log(state.articleDetails.article)
  return {
    article: state.articleDetails.article,
    deleted: state.articleList.deleted
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetails: (article) => {
      dispatch(articleInitDetails({
        article: article
      }))
    },
    endDelete: () => {
      dispatch(deleteActions.successDelete())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleDetails));
