import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { view as ArticlSearchItem } from "../../../components/ArticleItem/";
import { view as CatalogAside } from "../../../components/CatalogAside/";
import { view as TagsCloud } from "../../../components/TagsCloud/";
import { view as TopMenu } from "../../../components/TopMenu/";
import { view as Rank } from "../../../components/Rank/";
import Footer from "../../../components/Footer/index.js";
import Pagination from "../../../components/Pagination/pagination";

import {
  fetchs as searchFetch,
  actions as searchAction
} from "../../../components/ArticleSearch/";
import {
  fetchs as configFetchs,
  actions as configActions
} from "../../SettingAdmin/";

import { FormattedMessage } from "react-intl";

import FontAwesome from "react-fontawesome";
import { Button, Spin, Col, Row } from "antd";
import QueueAnim from "rc-queue-anim";
import "./style.css";

class ArticleBySearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      base: true,
      rank: true,
      rankCount: 4,
      articleCount: 4,
      searchLoading: true
    };

    this.handlePage = this.handlePage.bind(this);
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
          base: searchPageConfig.base,
          rank: searchPageConfig.rank,
          rankCount: searchPageConfig.rankCount,
          articleCount: searchPageConfig.articleCount
        });
      }
    } else {
      let searchPageConfig = config.searchPage;

      this.setState({
        base: searchPageConfig.base,
        rank: searchPageConfig.rank,
        rankCount: searchPageConfig.rankCount,
        articleCount: searchPageConfig.articleCount
      });
    }
    let { articles, searchContent } = this.props;

    if (!articles || articles.length === 0) {
      let result = await searchFetch.getArticleBySearch(
        searchContent,
        1,
        this.state.articleCount
      );

      if (result.code === "1") {
        this.setState({
          redirectToReferrer: true,
          searchLoading: false
        });
        this.props.successSearch(result.articles, result.count);
      } else {
        this.props.failSearch(result.message);
      }
    } else {
      this.setState({
        searchLoading: false
      });
    }
  }

  async handlePage(curPage) {
    this.setState({
      currentPage: curPage,
      redirectToReferrer: false,
      searchLoading: true
    });
    let result = await searchFetch.getArticleBySearch(
      this.props.searchContent,
      curPage,
      this.state.articleCount
    );

    if (result.code === "1") {
      this.setState({
        articles: result.articles,
        pageArticleCount: result.count,
        redirectToReferrer: false,
        searchLoading: false
      });
      this.props.successSearch(result.articles, result.count);
    } else {
      console.log(result);
      this.props.failSearch(result.message);
    }
  }

  async _clickToSearchArtciles() {
    this.props.startSearch();

    let { value } = this.state;
    window.location.href = "/article_by_search/" + value;
  }

  _handleKeyPress(event) {
    if (event.key === "Enter") {
      this._clickToSearchArtciles();
    }
  }

  render() {
    let { articles = [] } = this.props;
    let { currentPage, rank, base, rankCount, articleCount } = this.state;
    let totalPages = Math.ceil(this.props.count / articleCount);

    return (
      <section>
        <section className="All-Nav">
          <TopMenu />
        </section>
        <div className="container">
          <section className="articleByxx-container articleSearch-bg">
            <Row gutter={16}>
              <Col md={4} sm={4} xs={24}>
                {base ? (
                  <section className="articleByxx-Aside">
                    <section className="ArticleSearch">
                      <h6
                        className="ArticleSearch-SearchTitle aside-title"
                        style={{ color: "#07689f" }}
                      >
                        <FontAwesome
                          className="ArticleSearch-SearchTitle-icon"
                          name="search"
                        />
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
                    <TagsCloud color="#07689f" />
                    <CatalogAside color="#07689f" />
                  </section>
                ) : null}
                {rank ? <Rank rankCount={rankCount} /> : null}
              </Col>
              <Col md={20} sm={20} xs={24}>
                <Spin size="large" spinning={this.state.searchLoading === true}>
                  <ul className="ArticleBySearch-article">
                    <QueueAnim className="demo-content">
                      {articles
                        ? articles.map((article, index) => {
                            return article ? (
                              <ArticlSearchItem
                                ind={index}
                                key={`ArticlSearchItem${index}`}
                                article={article}
                              />
                            ) : null;
                          })
                        : null}
                    </QueueAnim>
                  </ul>
                </Spin>
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  range={5}
                  onChange={this.handlePage}
                />
              </Col>
            </Row>
          </section>
        </div>
        <Footer />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articleSearch.articles,
    count: state.articleSearch.count,
    searchContent: state.routing.location.pathname.split("/")[2],
    config: state.blog.config
  };
};
const mapDispatchToProps = dispatch => {
  return {
    startSearch: () => {
      dispatch(searchAction.searchStart());
    },
    successSearch: (articles, count) => {
      dispatch(searchAction.searchSuccess());
      dispatch(searchAction.successSearch(articles, count));
    },
    failSearch: error => {
      dispatch(searchAction.searchFail());
      dispatch(searchAction.failSearch(error));
    },
    initConfig: config => {
      dispatch(configActions.initConfig(config));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ArticleBySearch)
);
