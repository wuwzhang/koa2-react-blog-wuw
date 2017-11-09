import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { view as TopMenu } from '../../../components/TopMenu/';
import { view as MessageLi } from '../../../components/MessageLi/';
import Pagination from '../../../components/Pagination/pagination';

import { fetchs as messageFetch, actions as messageAction } from '../../../components/Contact/';

import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';
import { Radio } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { FormattedMessage } from 'react-intl';

class MessageAdmin extends Component {

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
    let result = await messageFetch.getAllMessage(1, 10);

    if (result.code === '1') {
      this.props.initAllMessage(result.messages);
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

    let result = await messageFetch.getAllMessage(curPage, 10);

    if (result.code === '1') {
      this.props.initAllMessage(result.messages);
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

    let { messages = [], location, user } = this.props;
    let { currentPage, pageArticleCount, filter } = this.state;
    let totalPages = Math.ceil(pageArticleCount / 10),
        pathname ='/login',
        redirectState = { from: location };

    if (!user) {
      return <Redirect to={{
              pathname: pathname,
              state: redirectState
            }}/>
    }

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
                          id="MessageListHeading"
                          defaultMessage='Message Management'
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
                            id='labelEmail'
                            defaultMessage='Email'
                          />
                        </span>
                      </Col>
                      <Col md={5}>
                        <span>
                          <FormattedMessage
                            id='Message'
                            defaultMessage='Message'
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
                      messages.map((message, index) => {
                        return message? <MessageLi
                                          id = {message._id}
                                          index = {index}
                                          user = { message.email}
                                          isChecked = {message.isChecked}
                                          content = {message.content}
                                          create_time = {message.created_at}
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

const selectVisibleMessage = (Message, filter) => {
  switch (filter) {
    case 'ALL':
      return Message;
    case 'CHECKED':
      return Message.filter(item => item.isChecked);
    case 'CHECK':
      return Message.filter(item => !item.isChecked);
    default:
      throw new Error('unsupported filter');
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    location: state.routing.location,
    messages: selectVisibleMessage(state.message.message, state.message.filter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initAllMessage: (message) => {
      dispatch(messageAction.messageAllInit(message))
    },
    setFilter: (filter) => {
      dispatch(messageAction.setFilter(filter))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageAdmin);
