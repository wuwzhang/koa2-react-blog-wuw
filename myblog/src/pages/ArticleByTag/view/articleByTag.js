import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { view as TagsCloud } from "../../../components/TagsCloud/";

import { view as ArticlTagItem } from "../../../components/ArticleItem/";
import { view as TopMenu } from "../../../components/TopMenu/";
import { view as CatalogAside } from "../../../components/CatalogAside/";
import { view as SearchBox } from "../../../components/ArticleSearch/";
import { view as Rank } from "../../../components/Rank/";
import Footer from "../../../components/Footer/index.js";
import Pagination from "../../../components/Pagination/pagination";

import { fetchs as TagsFetch } from "../../../components/TagsCloud/";
import { getArticlesByTag } from "../fetch.js";
import {
  fetchs as configFetchs,
  actions as configActions
} from "../../SettingAdmin/";

import QueueAnim from "rc-queue-anim";

import { Row, Col, Spin } from "antd";
import "./style.css";
import { FormattedMessage } from "react-intl";

class ArticleByTag extends Component {
  constructor(props) {
    super(props);

    this.handlePage = this.handlePage.bind(this);

    this.state = {
      articles: [],
      tagContent: this.props.tagContent,
      currentPage: 1,
      pageArticleCount: 1,
      base: true,
      rank: true,
      rankCount: 4,
      articleCount: 4
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

    let result = await Promise.all([
      getArticlesByTag(this.props.tagContent, 1, this.state.articleCount),
      TagsFetch.getTags()
    ]);

    if (result[0].code === "1" || result[1].code === "1") {
      this.setState({
        articles: result[0].articles,
        tags: result[1].tags,
        pageArticleCount: result[0].count
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
    let result = await getArticlesByTag(
      this.props.tagContent,
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

  async _handleTags(content) {
    let result = await getArticlesByTag(content, 1, this.state.articleCount);

    if (result.code === "1") {
      this.setState({
        articles: result.articles,
        tagContent: content,
        pageArticleCount: result.count
      });
    } else {
      console.log(result);
    }
  }

  render() {
    let {
      articles = [],
      tagContent = this.props.tagContent,
      currentPage,
      pageArticleCount,
      base,
      rank,
      rankCount
    } = this.state;
    let { route } = this.props;
    if (tagContent !== this.props.tagContent) {
      this._handleTags(this.props.tagContent);
    }

    let totalPages = Math.ceil(pageArticleCount / this.state.articleCount);
    return (
      <section>
        <section className="All-Nav">
          <TopMenu />
        </section>
        <div className="container">
          <section className="articleByxx-container articleByTag-bg">
            <Row gutter={16}>
              <Col md={4} sm={4} xs={24}>
                {base ? (
                  <section className="articleByxx-Aside">
                    <SearchBox />
                    <TagsCloud color="#07689f" />
                    <CatalogAside color="#07689f" />
                  </section>
                ) : null}
                {rank ? <Rank rankCount={rankCount} /> : null}
              </Col>
              <Col md={20} sm={20} xs={24}>
                <p className="ArticleBySearch-tip">
                  <span>
                    <FormattedMessage
                      id="SearchByTag"
                      defaultMessage="Search By Tag"
                    />{" "}
                    >{" "}
                  </span>
                  <span>{tagContent}</span>
                </p>
                <Spin size="large" spinning={this.state.searchLoading === true}>
                  <ul>
                    <QueueAnim className="demo-content">
                      {articles.map((article, index) => {
                        return article ? (
                          <ArticlTagItem
                            key={index}
                            ind={index}
                            article={article}
                            route={route}
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
    tagContent = pathname.split("/")[2],
    route = pathname.split("/")[1];
  return {
    tagContent: tagContent,
    route: route,
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
  connect(mapStateToProps, mapDispatchToProps)(ArticleByTag)
);
