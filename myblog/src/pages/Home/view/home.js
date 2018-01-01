import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";

// import { searchStart, searchSuccess, searchFail, successSearch, failSearch } from '../action.js';
import {
  fetchs as articleFetchs,
  actions as articleActions
} from "../../../components/ArticleSearch/";
import {
  fetchs as configFetchs,
  actions as configActions
} from "../../SettingAdmin/";

import FontAwesome from "react-fontawesome";
import QueueAnim from "rc-queue-anim";
import avatar from "../../../media/avatar.jpg";
import wechat from "../../../media/wechat.jpg";

import { Button, Popover, Row, Col } from "antd";

import "./style.css";

import { FormattedMessage } from "react-intl";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      articleCount: 4,
      redirectToReferrer: false
    };

    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  async componentDidMount() {
    let ans = localStorage.getItem("config"),
      config = JSON.parse(ans);
    if (!config) {
      let res = await configFetchs.getConfig();

      if (res.code === "1") {
        this.props.initConfig(res.config);
        localStorage.setItem("config", JSON.stringify(res.config));
        let searchPageConfig = res.config.searchPage;
        this.setState({
          articleCount: searchPageConfig.articleCount
        });
      }
    } else {
      let searchPageConfig = config.searchPage;

      this.setState({
        articleCount: searchPageConfig.articleCount
      });
    }
  }

  async _clickToSearchArtciles() {
    this.props.startSearch();

    let { value, articleCount } = this.state;

    let result = await articleFetchs.getArticleBySearch(value, 1, articleCount);

    if (result.code === "1") {
      this.setState({
        redirectToReferrer: true
      });
      this.props.successSearch(result.articles, result.count);
    } else {
      this.props.failSearch(result.message);
      console.log(result);
    }
  }

  _handleKeyPress(event) {
    if (event.key === "Enter") {
      this._clickToSearchArtciles();
    }
  }

  render() {
    const { redirectToReferrer, value } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={`/article_by_search/${value}`} />;
    }

    return (
      <section id="Home">
        <section className="languageToggle">
          <ul>
            <li>
              <p>
                <a href="?locale=zh-CN">
                  <FormattedMessage id="Chinses" defaultMessage="Zn" />
                </a>
              </p>
            </li>
            <li>
              <p>
                <a href="?locale=en-US">
                  <FormattedMessage id="English" defaultMessage="En" />
                </a>
              </p>
            </li>
          </ul>
        </section>
        <section className="Home-header">
          <div className="conatiner">
            <QueueAnim delay={300} type={["top", "bottom"]}>
              <div key="0" className="Home-avatar">
                <img src={avatar} alt="" />
              </div>
              <div key="1" className="Home-title">
                <h1>
                  <span>wuw's</span>
                  <span>blog</span>
                </h1>
              </div>
            </QueueAnim>
          </div>
        </section>
        <section className="Home-container">
          <div className="container">
            <QueueAnim delay={300} type={["bottom", "top"]}>
              <section key="0" className="Home-signtuare">
                <p className="Home-signtuare-small">
                  <FormattedMessage
                    id="HomeHeadingTop"
                    defaultMessage="HA HA HA HA HA HA! PA BU SHI GE SHEN JIN BIN BA"
                  />
                </p>
                <p className="Home-signtuare-large">
                  <FormattedMessage
                    id="HomeHeadingCenter"
                    defaultMessage="SHI HUA GAO SU NI! TA JIU SHI YI GE SHEN JIN BIN! HA HA HA"
                  />
                </p>
              </section>
              <section key="1" className="Home-search">
                <from>
                  <input
                    autoFocus
                    type="text"
                    value={this.state.value}
                    onChange={event =>
                      this.setState({ value: event.target.value })
                    }
                    onKeyPress={this._handleKeyPress}
                  />
                  <Button
                    shape="circle"
                    icon="search"
                    onClick={() => this._clickToSearchArtciles()}
                    htmlType="submit"
                  />
                </from>
              </section>
              <section key="2" className="Home-foot">
                <Row>
                  <Col md={8} sm={24} xs={24}>
                    <p>© 2017 wuw All rights reserved.</p>
                  </Col>
                  <Col md={8} sm={24} xs={24}>
                    <ul className="Home-fontLink">
                      <li>
                        <a href="https://github.com/wuwzhang">
                          <FontAwesome name="github" />
                        </a>
                      </li>
                      <li>
                        <span>
                          <Popover
                            content={content}
                            title={null}
                            trigger="hover"
                          >
                            <FontAwesome name="wechat" />
                          </Popover>
                        </span>
                      </li>
                      <li>
                        <a href="">
                          <FontAwesome name="google-plus" />
                        </a>
                      </li>
                    </ul>
                  </Col>
                  <Col md={8} sm={24} xs={12}>
                    <ul className="Home-nav">
                      <li>
                        <Link to="/Keep_On_File">
                          <span>
                            <FormattedMessage
                              id="Article"
                              defaultMessage="Article"
                            />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/about">
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
          </div>
        </section>
      </section>
    );
  }
}

const content = (
  <div>
    <img src={wechat} alt="" height="150" />
  </div>
);

const mapStateToProps = state => ({
  searching: state.articleSearch.searching,
  config: state.blog.config
});

const mapDispatchToProps = dispatch => {
  return {
    startSearch: () => {
      dispatch(articleActions.searchStart());
    },
    successSearch: (articles, count) => {
      dispatch(articleActions.searchSuccess());
      dispatch(articleActions.successSearch(articles, count));
    },
    failSearch: error => {
      dispatch(articleActions.searchFail());
      dispatch(articleActions.failSearch(error));
    },
    initConfig: config => {
      dispatch(configActions.initConfig(config));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
