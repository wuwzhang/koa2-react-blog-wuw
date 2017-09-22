import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';

import { searchStart, searchSuccess, searchFail, successSearch, failSearch } from '../action.js';
import { getArticleBySearch } from '../fetch.js';

import FontAwesome from 'react-fontawesome';
import QueueAnim from 'rc-queue-anim';
import avatar from './avatar.jpg';
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, Spin } from 'antd';

import './style.css'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      redirectToReferrer: false
    }
  }

  async _clickToSearchArtciles() {

    this.props.startSearch();

    let { value } = this.state;

    let result = await getArticleBySearch(value);

    if (result.code === '1') {
      this.setState({
        redirectToReferrer: true
      })
      this.props.successSearch(result.articles);

    } else {

      this.props.failSearch(result.message);
      console.log(result);
    }
  }

  render() {

    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to='/article_by_search/'/>
      );
    }

    return (
      <section id="Home">

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
                <p className="Home-signtuare-small"><span>哈哈哈哈哈哈哈哈哈哈哈！</span>怕不是个神经病吧</p>
                <p className="Home-signtuare-large">实话告诉你，他就是个神经病！哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
              </section>
              <section key="1" className="Home-search">
                <from>
                  <input
                    type="text"
                    value={ this.state.value }
                    onChange={ (event) => this.setState({ value: event.target.value }) }
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
                      <li><Link to='/Keep_On_File'><span>Article</span></Link></li>
                      <li><Link to='/about'><span>About Me</span></Link></li>
                    </ul>
                  </Col>
                </Row>
              </section>
              {
                this.props.searching ? <Spin spinning={this.state.loading} delay={500} size = 'large' /> : null
              }
            </QueueAnim>
          </Grid>
        </section>
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
      dispatch(searchStart());
    },
    successSearch: (articles) => {
      dispatch(searchSuccess());
      dispatch(successSearch(articles));
    },
    failSearch: (error) => {
      dispatch(searchFail());
      dispatch(failSearch(error));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
