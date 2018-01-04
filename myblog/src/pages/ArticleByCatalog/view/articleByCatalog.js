import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { view as ArticlCatalogItem } from "../../../components/ArticleItem/";
import { view as CatalogAside } from "../../../components/CatalogAside/";
import { view as TagsCloud } from "../../../components/TagsCloud/";
import { view as TopMenu } from "../../../components/TopMenu/";
import { view as SearchBox } from "../../../components/ArticleSearch/";
import { view as Rank } from "../../../components/Rank/";
import Footer from "../../../components/Footer/index.js";
import Pagination from "../../../components/Pagination/pagination";

import { getArticlesByCatalog } from "../fetch.js";
import {
  fetchs as configFetchs,
  actions as configActions
} from "../../SettingAdmin/";

import { Col, Row, Spin } from "antd";
import QueueAnim from "rc-queue-anim";
import "./style.css";

import { FormattedMessage } from "react-intl";

class ArticleByCatalog extends Component {
  constructor(props) {
    super(props);

    this.handlePage = this.handlePage.bind(this);

    this.state = {
      articles: [],
      catalogCotent: this.props.catalogCotent,
      searchLoading: true,
      base: true,
      rank: true,
      rankCount: 4,
      articleCount: 4,
      currentPage: 1,
      pageArticleCount: 1
    };
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

    let result = await getArticlesByCatalog(
      this.props.catalogCotent,
      1,
      this.state.articleCount
    );

    if (result.code === "1") {
      this.setState({
        articles: result.articles,
        pageArticleCount: result.count,
        searchLoading: false
      });
    } else {
      console.log(result);
    }
  }

  async handlePage(curPage) {
    this.setState({
      currentPage: curPage,
      searchLoading: true
    });
    let result = await getArticlesByCatalog(
      this.props.catalogCotent,
      curPage,
      this.state.articleCount
    );

    if (result.code === "1") {
      this.setState({
        articles: result.articles,
        pageArticleCount: result.count,
        searchLoading: false
      });
    } else {
      console.log(result);
    }
  }

  async _handleCatalog(content) {
    let result = await getArticlesByCatalog(
      content,
      1,
      this.state.articleCount
    );

    if (result.code === "1") {
      let articles = result.articles;

      this.setState({
        articles: articles,
        catalogCotent: content,
        pageArticleCount: result.count,
        searchLoading: false
      });
    } else {
      console.log(result);
    }
  }

  render() {
    let {
      articles = [],
      catalogCotent = this.props.tagContent,
      currentPage,
      pageArticleCount,
      base,
      rank,
      rankCount,
      articleCount
    } = this.state;

    if (catalogCotent !== this.props.catalogCotent) {
      this._handleCatalog(this.props.catalogCotent);
    }

    let totalPages = Math.ceil(pageArticleCount / articleCount);
    return (
      <section>
        <section className="All-Nav">
          <TopMenu />
        </section>
        <div className="container">
          <section className="articleByxx-container ArticleBySearch-bg">
            <Row gutter={16}>
              <Col md={4} sm={4} xs={24}>
                {base ? (
                  <section className="articleByxx-Aside">
                    <SearchBox />
                    <CatalogAside color="#07689f" />
                    <TagsCloud color="#07689f" />
                  </section>
                ) : null}
                {rank ? <Rank rankCount={rankCount} /> : null}
              </Col>
              <Col md={20} sm={20} xs={24}>
                <p className="ArticleBySearch-tip">
                  <span>
                    <FormattedMessage
                      id="SearchByCatalog"
                      defaultMessage="Search By Catalog"
                    />{" "}
                    >{" "}
                  </span>
                  <span>{this.props.catalogCotent}</span>
                </p>
                <Spin size="large" spinning={this.state.searchLoading === true}>
                  <ul className="ArticleByCatalog-article">
                    <QueueAnim className="demo-content">
                      {articles.map((article, index) => {
                        return article ? (
                          <ArticlCatalogItem
                            ind={index}
                            key={`ArticlCatalogItem${index}`}
                            article={article}
                          />
                        ) : null;
                      })}
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
  let pathname = state.routing.location.pathname,
    catalogCotent = pathname.split("/")[2];

  return {
    catalogCotent: catalogCotent,
    catalogs: state.catalog.catalog,
    config: state.blog.config
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initConfig: config => {
      dispatch(configActions.initConfig(config));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ArticleByCatalog)
);
