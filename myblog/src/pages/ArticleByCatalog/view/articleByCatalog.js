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

import { Col, Row } from "antd";
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
      currentPage: 1,
      pageArticleCount: 1
    };
  }

  async componentDidMount() {
    let result = await getArticlesByCatalog(this.props.catalogCotent, 1, 4);

    if (result.code === "1") {
      this.setState({
        articles: result.articles,
        pageArticleCount: result.count
      });
    } else {
      console.log(result);
    }
  }

  async handlePage(curPage) {
    this.setState({
      currentPage: curPage
    });
    let result = await getArticlesByCatalog(
      this.props.catalogCotent,
      curPage,
      4
    );

    if (result.code === "1") {
      this.setState({
        articles: result.articles,
        pageArticleCount: result.count
      });
    } else {
      console.log(result);
    }
  }

  async _handleCatalog(content) {
    let result = await getArticlesByCatalog(content, 1, 4);

    if (result.code === "1") {
      let articles = result.articles;

      this.setState({
        articles: articles,
        catalogCotent: content,
        pageArticleCount: result.count
      });
    } else {
      console.log(result);
    }
  }

  render() {
    let {
      articles,
      catalogCotent = this.props.tagContent,
      currentPage,
      pageArticleCount
    } = this.state;

    if (catalogCotent !== this.props.catalogCotent) {
      this._handleCatalog(this.props.catalogCotent);
    }

    let totalPages = Math.ceil(pageArticleCount / 4);
    return (
      <section>
        <section className="All-Nav">
          <TopMenu />
        </section>
        <div className="container">
          <section className="articleByxx-container ArticleBySearch-bg">
            <Row gutter={16}>
              <Col md={4} sm={4} xs={24}>
                <section className="articleByxx-Aside">
                  <SearchBox />
                  <CatalogAside color="#07689f" />
                  <TagsCloud color="#07689f" />
                </section>
                <Rank
                  showCharNum={8}
                  style={{ width: "100%", padding: "10px", border: "0" }}
                />
              </Col>
              <Col md={20} sm={20} xs={24}>
                <p>
                  <span>
                    <FormattedMessage
                      id="SearchByCatalog"
                      defaultMessage="Search By Catalog"
                    />{" "}
                    >{" "}
                  </span>
                  <span>{this.props.catalogCotent}</span>
                </p>
                <ul className="ArticleByCatalog-article">
                  <QueueAnim className="demo-content">
                    {articles.map((article, index) => {
                      return article ? (
                        <ArticlCatalogItem
                          ind={index}
                          key={index}
                          article={article}
                        />
                      ) : null;
                    })}
                  </QueueAnim>
                </ul>
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
    catalogs: state.catalog.catalog
  };
};

export default withRouter(connect(mapStateToProps)(ArticleByCatalog));
