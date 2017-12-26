import React, { Component } from "react";
import { connect } from "react-redux";

import { getArticleDateList } from "../fetch.js";
import {
  fetchs as configFetchs,
  actions as configActions
} from "../../SettingAdmin/";

import { view as KeepOnFileItem } from "../../../components/KeepOnFileItem/";
import KeepOnFile from "../../../components/KeepOnFile/index.js";
import { view as TagsCloud } from "../../../components/TagsCloud/";
import { view as CatalogAside } from "../../../components/CatalogAside/";
import { view as TopMenu } from "../../../components/TopMenu/";
import { view as SearchBox } from "../../../components/ArticleSearch/";
import { view as Rank } from "../../../components/Rank/";
import Footer from "../../../components/Footer/index.js";
import Pagination from "../../../components/Pagination/pagination";

import { Timeline, Radio, Col, Row, Icon, Spin } from "antd";
import FontAwesome from "react-fontawesome";
import { FormattedMessage } from "react-intl";
import QueueAnim from "rc-queue-anim";
import "./style.css";

class KeepOnFileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchLoading: true,
      articleList: [],
      catalogView: "catalog", //true 为list视图, false为summary视图
      aside: true //true为base， false为rank
    };
    this.handleView = this.handleView.bind(this);
    this.handlePage = this.handlePage.bind(this);
  }
  async componentDidMount() {
    let ans = localStorage.getItem("config"),
      config = JSON.parse(ans);
    if (!config) {
      let res = await configFetchs.getConfig();

      if (res.code === "1") {
        this.props.initConfig(res.config);
        localStorage.setItem("config", JSON.stringify(res.config));
        let keepOnFileConfig = res.config.keepOnFile;
        this.setState({
          catalogView: keepOnFileConfig.catalogView,
          aside: keepOnFileConfig.aside
        });
      }
    } else {
      let keepOnFileConfig = config.keepOnFile;
      this.setState({
        catalogView: keepOnFileConfig.catalogView,
        aside: keepOnFileConfig.aside
      });
    }

    let result = await getArticleDateList(1, 4);

    if (result.code === "1") {
      this.setState({
        articleList: result.articles,
        currentPage: 1,
        count: result.count,
        searchLoading: false
      });
    } else {
      console.log(result);
    }
  }

  async handlePage(curPage) {
    this.setState({
      currentPage: curPage,
      redirectToReferrer: false
    });
    let result = await getArticleDateList(curPage, 4);

    if (result.code === "1") {
      this.setState({
        articleList: result.articles,
        count: result.count,
        pageArticleCount: result.count,
        redirectToReferrer: false
      });
    } else {
    }
  }

  handleAside(e) {
    e.preventDefault();
    let { aside } = this.state;
    this.setState({
      aside: !aside
    });
  }

  handleView(e) {
    this.setState({
      catalogView: e.target.value
    });
  }
  render() {
    let { articleList, catalogView, aside, currentPage, count } = this.state;
    let totalPages = Math.ceil(count / 4);

    return (
      <section>
        <section className="All-Nav">
          <TopMenu />
        </section>
        <div className="container">
          <section className="keepOnFile-page">
            <Col
              md={{ span: 6, offset: 14 }}
              sm={{ span: 6, offset: 14 }}
              xs={0}
            >
              <section className="KeepOnFile-View">
                <Radio.Group value={catalogView} onChange={this.handleView}>
                  <Radio.Button value="catalog">
                    <FontAwesome className="KeepOnFile-ViewIcon" name="list" />
                    <FormattedMessage id="ArticleList" defaultMessage="List" />
                  </Radio.Button>
                  <Radio.Button value="summary">
                    <FontAwesome
                      className="KeepOnFile-ViewIcon"
                      name="list-alt"
                    />
                    <FormattedMessage id="Summary" defaultMessage="Summary" />
                  </Radio.Button>
                </Radio.Group>
              </section>
            </Col>
            <Row>
              <Col md={20} sm={20} xs={24}>
                <Spin size="large" spinning={this.state.searchLoading === true}>
                  <section className="timeline">
                    <Timeline>
                      <QueueAnim>
                        {articleList.map((article, index) => {
                          return article ? (
                            <Timeline.Item key={index}>
                              <KeepOnFileItem
                                key={index}
                                article={article}
                                catalogView={catalogView}
                              />
                            </Timeline.Item>
                          ) : null;
                        })}
                      </QueueAnim>
                    </Timeline>
                  </section>
                </Spin>
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  range={5}
                  onChange={this.handlePage}
                />
              </Col>
              <Col md={4} sm={4} xs={0}>
                <section className="keepOnFile-aside">
                  {aside ? (
                    <section className="aside">
                      <SearchBox color="#07689f" />
                      <KeepOnFile color="#07689f" badgeColor="#FF7E67" />
                      <TagsCloud color="#07689f" />
                      <CatalogAside color="#07689f" />
                    </section>
                  ) : (
                    <section className="keepOnFile-rank">
                      <Rank />
                    </section>
                  )}
                  <p
                    className="keepOnFile-aside-change-btn"
                    onClick={e => this.handleAside(e)}
                  >
                    {aside ? (
                      <p>
                        <Icon type="double-right" className="right-animtion" />
                        <FormattedMessage id="Rank" defaultMessage="Rank" />
                      </p>
                    ) : (
                      <p>
                        <Icon type="double-left" className="left-animtion" />
                        <FormattedMessage id="Base" defaultMessage="Base" />
                      </p>
                    )}
                  </p>
                </section>
              </Col>
            </Row>
          </section>
        </div>
        <Footer />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  config: state.blog.config
});

const mapDispatchToProps = dispatch => {
  return {
    initConfig: config => {
      dispatch(configActions.initConfig(config));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KeepOnFileList);
