import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import { successSearch, failSearch, searchStart, searchSuccess, searchFail } from '../action';
import { getArticleBySearch } from '../fetch';

import FontAwesome from 'react-fontawesome';
import { Button, Spin } from 'antd';

import './style.css';
import { FormattedMessage } from 'react-intl';

class ArticleSearch extends Component {

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

    let result = await getArticleBySearch(value, 1, 4);

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
    let { route, color='#07689f' } = this.props;
    let { redirectToReferrer, value } = this.state;

    if (route !== '/article_by_search/' && redirectToReferrer) {
      return (
        <Redirect to= {`/article_by_search/${value}`} />
      );
    }
    return (
      <section className='ArticleSearch'>
        <h6 className="ArticleSearch-SearchTitle" style={{ color: color }}>
          <FontAwesome className="ArticleSearch-SearchTitle-icon" name='search' />
          <span>
            <FormattedMessage
              id="Search"
              defaultMessage="Search"
            />
          </span>
        </h6>
        <from>
          <input
            type="text"
            value={ this.state.value }
            onChange={ (event) => this.setState({ value: event.target.value }) }
            onKeyPress={this._handleKeyPress}
          />
          <Button
            shape="circle"
            icon="search"
            onClick = { () => this._clickToSearchArtciles() }
            htmlType="submit"
          />
        </from>
        {
          this.props.searching ? <Spin spinning={this.state.loading} delay={500} size = 'large' />
                               : null
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  route: state.routing.location.pathname.split('/')[1],
  searching: state.articleSearch.searching
})

const mapDispatchToProps = (dispatch) => {
  return {
    startSearch: () => {
      dispatch(searchStart());
    },
    successSearch: (articles, count) => {
      dispatch(searchSuccess());
      dispatch(successSearch(articles, count));
    },
    failSearch: (error) => {
      dispatch(searchFail());
      dispatch(failSearch(error));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleSearch));
