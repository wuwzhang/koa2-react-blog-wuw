import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';

// import { searchStart, searchSuccess, searchFail, successSearch, failSearch } from '../action.js';
import { fetchs, actions } from '../../../components/ArticleSearch/';

import FontAwesome from 'react-fontawesome';
import QueueAnim from 'rc-queue-anim';
import avatar from './avatar.jpg';
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, Spin } from 'antd';

import './style.css';

import { FormattedMessage } from 'react-intl';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      redirectToReferrer: false
    }

    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  async _clickToSearchArtciles() {

    this.props.startSearch();

    let { value } = this.state;

    let result = await fetchs.getArticleBySearch(value, 1, 4);

    if (result.code === '1') {
      this.setState({
        redirectToReferrer: true
      })
      this.props.successSearch(result.articles, result.count);

    } else {

      this.props.failSearch(result.message);
      console.log(result);
    }
  }

  _handleKeyPress(event) {
    if(event.key === 'Enter'){
      this._clickToSearchArtciles();
    }
  }

  render() {

    const { redirectToReferrer, value } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to= {`/article_by_search/${value}` }/>
      );
    }

    return (
      <section id="Home">
         <Spin tip="Loading..." size='large' spinning={this.props.searching === true}>
          <section className='languageToggle'>
            <ul>
              <li>
                <p>
                  <a href="?locale=zh-CN">
                    <FormattedMessage
                    id="Chinses"
                    defaultMessage='Zn'
                    />
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <a href="?locale=en-US"><FormattedMessage
                    id="English"
                    defaultMessage='En'
                  /></a>
                </p>
              </li>
            </ul>
          </section>
          <section className='Home-header'>
            <Grid>
              <QueueAnim
                delay={300}
                type={['top', 'bottom']}
              >
                <div key="0" className='Home-avatar'>
                  <img src={avatar} alt=""/>
                </div>
                <div key="1" className='Home-title'>
                  <h1><span>wuw's</span><span>blog</span></h1>
                </div>
              </QueueAnim>
            </Grid>

          </section>
          <section className='Home-container'>
            <Grid>
              <QueueAnim
                delay={300}
                type={['bottom','top']}
              >
                <section key="0" className="Home-signtuare">
                  <p className="Home-signtuare-small">
                    <FormattedMessage
                      id="HomeHeadingTop"
                      defaultMessage='HA HA HA HA HA HA! PA BU SHI GE SHEN JIN BIN BA'
                    />
                  </p>
                  <p className="Home-signtuare-large">
                    <FormattedMessage
                      id="HomeHeadingCenter"
                      defaultMessage='SHI HUA GAO SU NI! TA JIU SHI YI GE SHEN JIN BIN! HA HA HA'
                    />
                  </p>
                </section>
                <section key="1" className="Home-search">
                  <from>
                    <input
                      type="text"
                      value={ this.state.value }
                      onChange={ (event) => this.setState({ value: event.target.value })}
                      onKeyPress={this._handleKeyPress}
                    />
                    <Button
                      shape="circle"
                      icon="search"
                      onClick = { () => this._clickToSearchArtciles() }
                      htmlType="submit"
                    />
                  </from>
                </section>
                <section key="2" className="Home-foot">
                  <Row>
                    <Col md={4} sm={12} xs={12}><p>© 2017 wuw All rights reserved.</p></Col>
                    <Col md={4} sm={12} xs={12}>
                      <ul className='Home-fontLink'>
                        <li><a href=''><FontAwesome name='github' /></a></li>
                        <li><a href=''><FontAwesome name='wechat' /></a></li>
                        <li><a href=''><FontAwesome name='google-plus' /></a></li>
                      </ul>
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                      <ul className='Home-nav'>
                        <li>
                          <Link to='/Keep_On_File'>
                            <span>
                              <FormattedMessage
                                id="Article"
                                defaultMessage="Article"
                              />
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link to='/about'>
                            <span>
                              <FormattedMessage
                                id="About"
                                defaultMessage="About Me"
                              />
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </section>

              </QueueAnim>
            </Grid>

          </section>
        </Spin>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  searching: state.articleSearch.searching
})

const mapDispatchToProps = (dispatch) => {
  return {
    startSearch: () => {
      dispatch(actions.searchStart());
    },
    successSearch: (articles, count) => {
      dispatch(actions.searchSuccess());
      dispatch(actions.successSearch(articles, count));
    },
    failSearch: (error) => {
      dispatch(actions.searchFail());
      dispatch(actions.failSearch(error));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
