import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import { view as TopMenu } from '../../../components/TopMenu/';
import { view as CommentLi } from '../../../components/CommentLi/';
import Pagination from '../../../components/Pagination/pagination';

import { fetchs as commentFetch, actions as commentAction } from '../../../components/Comment/';

import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';
import { Radio } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { FormattedMessage } from 'react-intl';

class CommentAdmin extends Component {

  constructor(props) {
    super(props);

    this.handlePage = this.handlePage.bind(this);
    this.handleView = this.handleView.bind(this);

    this.state = {
      currentPage: 1,
      pageArticleCount: 1,
      filter: 'ALL'
    }
  }

  async componentDidMount() {
    let result = await commentFetch.getAllComment(1, 10);

    if (result.code === '1') {
      this.props.initAllComment(result.comments);
      this.setState({
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

    let result = await commentFetch.getAllComment(curPage, 10);

    if (result.code === '1') {
      this.props.initAllComment(result.comments);
      this.setState({
        pageArticleCount: result.count
      })
    } else {
      console.log(result)
    }
  }

  handleView(e) {
    this.setState({
      filter: e.target.value
    });

    this.props.setFilter(e.target.value);
  }

  render() {

    let { comments = [] } = this.props;
    let { currentPage, pageArticleCount, filter } = this.state;
    let totalPages = Math.ceil(pageArticleCount / 10);

    return (
      <section>
        <section className="All-Nav">
          <TopMenu />
        </section>
        <Grid>
          <section className="ArticleList-bg">
            <section className="ArticleList">
              <ul>
                <QueueAnim className="demo-content">
                  <Row key = 'a'>
                    <Col md={9} sm={9} xs={12}>
                      <h2>
                        <FormattedMessage
                          id="CommentListHeading"
                          defaultMessage='Comment Management'
                        />
                      </h2>
                    </Col>
                    <Col md={3} sm={3} xs={12}>
                      <section>
                        <Radio.Group value={ filter } onChange={ this.handleView }>
                          <Radio.Button value="ALL">
                            <span>
                              <FormattedMessage
                                id="All"
                                defaultMessage="All"
                              />
                            </span>
                          </Radio.Button>
                          <Radio.Button value="CHECK">
                            <span>
                              <FormattedMessage
                                id="Check"
                                defaultMessage="Check"
                              />
                            </span>
                          </Radio.Button>
                          <Radio.Button value="CHECKED">
                            <span>
                              <FormattedMessage
                                id="Checked"
                                defaultMessage="Checked"
                              />
                            </span>
                          </Radio.Button>

                        </Radio.Group>
                      </section>
                    </Col>
                  </Row>
                  <Row key = 'b'>
                    <section className='ArticleLi-head' style={{color: '#999'}}>
                      <Col md={3}>
                        <span>
                          <FormattedMessage
                            id='Title'
                            defaultMessage='Title'
                          />
                        </span>
                      </Col>
                      <Col md={5}>
                        <span>
                          <FormattedMessage
                            id='Comment'
                            defaultMessage='Comment'
                          />
                        </span>
                      </Col>
                      <Col md={2}>
                        <span>
                          <FormattedMessage
                            id="CreateTime"
                            defaultMessage="Create Time"
                          />
                        </span>
                      </Col>
                      <Col md={2}>
                        <span>
                          <FormattedMessage
                            id="Option"
                            defaultMessage="Option"
                          />
                        </span>
                      </Col>
                    </section>
                  </Row>
                  <section key = 'c'>
                    {
                      comments.map((comment, index) => {
                        return comment? <CommentLi
                                          id = {comment.id}
                                          index = {index}
                                          user = { comment.user.account}
                                          isChecked = {comment.isChecked}
                                          articleTitle = {comment.articleTitle}
                                          articleId = {comment.articleId}
                                          content = {comment.content}
                                          create_time = {comment.create_at}
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
    );
  }
}

const selectVisibleComment = (comments, filter) => {
  switch (filter) {
    case 'ALL':
      return comments;
    case 'CHECKED':
      return comments.filter(item => item.isChecked);
    case 'CHECK':
      return comments.filter(item => !item.isChecked);
    default:
      throw new Error('unsupported filter');
  }
}

const mapStateToProps = (state) => {
  return {
    comments: selectVisibleComment(state.comment.allComment, state.comment.filter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initAllComment: (comments) => {
      dispatch(commentAction.commentAllInit(comments))
    },
    setFilter: (filter) => {
      dispatch(commentAction.setFilter(filter))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentAdmin);
