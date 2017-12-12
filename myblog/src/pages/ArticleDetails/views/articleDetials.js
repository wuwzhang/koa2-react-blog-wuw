import React, { Component } from "react";
import { connect } from "react-redux";
import { detailArticle } from "../fetch";
import { fetchs as rankFetchs } from "../../../components/Rank/";
import { withRouter, Redirect, Link } from "react-router-dom";

import { articleInitDetails } from "../action.js";
import ArticleOptionNav from "../../../components/ArticleOptionNav/articleOptionNav.js";
import {
  view as Comment,
  fetchs as commentFetchs,
  actions as commentActions
} from "../../../components/Comment/";
import { Aside } from "../../../components/Aside/index.js";
import { view as TopMenu } from "../../../components/TopMenu/";
import Footer from "../../../components/Footer/index.js";

import { actions as deleteActions } from "../../ArticleList/";

import { BackTop, Button, Col, Row } from "antd";
import FontAwesome from "react-fontawesome";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FormattedMessage } from "react-intl";

import "./style.css";

const marked = require("marked");

class ArticleDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preArticle: {},
      nextArticle: {},
      topPreviewArticle: [],
      topCommentsArticle: [],
      windowLocation: document.URL
    };

    this.onCopy = this.onCopy.bind(this);

    import("highlight")
      .then(({ hljs }) => {
        marked.setOptions({
          renderer: new marked.Renderer(),
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: true,
          smartLists: true,
          smartypants: true,
          highlight: code => hljs.highlightAuto(code).value,
          math: true
        });
      })
      .catch(err => {
        console.log(err);
      });

    // console.log('articleDetails - constructor - location', this.props.location)
  }

  async componentDidMount() {
    // console.log('articleDetails - componentDidMount - location', this.props.location)

    let articleId = this.props.match.params.articleId;
    let result = await detailArticle(articleId);

    if (result.code === "1") {
      this.props.getDetails(result.article);

      this.setState({
        preArticle: result.preArticle,
        nextArticle: result.nextArticle
      });
    } else {
      console.log(result);
    }

    let topPreviewRes = await rankFetchs.getTopPreviewArticle();
    if (topPreviewRes.code === "1") {
      this.setState({
        topPreviewArticle: topPreviewRes.result
      });
    } else {
    }

    let topCommentsRes = await rankFetchs.getTopCommentsArticle();
    if (topCommentsRes.code === "1") {
      this.setState({
        topCommentsArticle: topCommentsRes.result
      });
    }
  }

  async _getNewArticle(articleId) {
    let result = await detailArticle(articleId);

    if (result.code === "1") {
      this.props.getDetails(result.article);

      this.setState({
        preArticle: result.preArticle,
        nextArticle: result.nextArticle
      });
    } else {
      console.log(result);
    }

    let commentRes = await commentFetchs.getComment(articleId, 1, 4);
    if (commentRes.code === "1") {
      // this.props.initComment(commentRes.comments)
      let comments = commentRes.comments;
      let ans = comments.map(comment => {
        let likesState = 0,
          dislikesState = 0;

        if (this.props.user && this.props.user._id) {
          let { likes, dislikes } = comment,
            userId = this.props.user._id;

          if (likes && likes.length > 0) {
            likesState = userId.indexOf(likes) === "-1" ? -1 : 1;
          } else {
            likesState = -1;
          }

          if (dislikes && dislikes.length > 0) {
            dislikesState = userId.indexOf(dislikes) === "-1" ? -1 : 1;
          } else {
            dislikesState = -1;
          }
        }

        return {
          likesState,
          dislikesState,
          ...comment
        };
      });

      this.props.initComment(ans);
    } else {
    }
  }

  onCopy() {
    this.setState({ copied: true });
  }

  render() {
    if (this.props.deleted) {
      this.props.endDelete();
      return (
        <Redirect
          to={{
            pathname: "/article_admin"
          }}
        />
      );
    }
    let { article } = this.props;
    let {
      preArticle,
      nextArticle,
      topPreviewArticle = [],
      topCommentsArticle = []
    } = this.state;

    if (article) {
      return (
        <section>
          <section className="All-Nav">
            <TopMenu />
          </section>
          <div className="container">
            <section>
              <Row gutter={16}>
                <section className="ArticleDetials-titleContainer">
                  <Col md={12} sm={12} xs={12}>
                    <h3 className="ArticleDetails-articleTitle">
                      {article.title}
                    </h3>
                  </Col>
                  <Col md={12} sm={12} xs={12}>
                    {this.props.user && this.props.user.level === 0 ? (
                      <ArticleOptionNav
                        myStyle={{
                          color: "#FF7E67",
                          fontSize: "16px",
                          marginRight: "15px"
                        }}
                      />
                    ) : (
                      <CopyToClipboard
                        onCopy={this.onCopy}
                        text={this.state.windowLocation}
                      >
                        <Button>
                          <FormattedMessage
                            id="Fork"
                            defaultMessage="Copy To Clipboard"
                          />
                        </Button>
                      </CopyToClipboard>
                    )}
                  </Col>
                </section>
              </Row>
              <Row>
                <Col md={20} sm={20} xs={24}>
                  {article.content ? (
                    <div
                      className="article-content marked-preview"
                      dangerouslySetInnerHTML={{
                        __html: marked(article.content)
                      }}
                    />
                  ) : null}
                </Col>
                <Col md={4} sm={4} xs={0}>
                  <Aside
                    color="#07689f"
                    tags={article.tags}
                    catalog={article.catalog}
                    create_time={
                      article.created_at ? article.created_at.slice(0, 10) : ""
                    }
                    update_time={
                      article.updated_at ? article.updated_at.slice(0, 10) : ""
                    }
                  />
                  <section className="articleDetails-rank">
                    <h5 className="ArticleDetails-Title">
                      <FontAwesome
                        name="user-secret"
                        style={{ color: "#ff7e67", marginRight: "5px" }}
                      />
                      <FormattedMessage id="Rank" defaultMessage="Rank" /> ~
                    </h5>
                    <section className="topPreview topRank">
                      <h6 className="ArticleDetails-sub-Title">
                        <FormattedMessage
                          id="Preview"
                          defaultMessage="Preview"
                        />
                      </h6>
                      <ul>
                        {topPreviewArticle.map(article => {
                          return (
                            <Link
                              className="topRank-li"
                              onClick={() => this._getNewArticle(article._id)}
                              to={`/article_details/${article._id}`}
                            >
                              <span>
                                {article.title.length > 12
                                  ? article.title.slice(0, 15) + "..."
                                  : article.title}
                              </span>
                              <span className="articleDetail-rank-count">
                                {" "}
                                ({article.pv})
                              </span>
                            </Link>
                          );
                        })}
                      </ul>
                    </section>
                    <section className="topComment topRank">
                      <h6 className="ArticleDetails-sub-Title">
                        <FormattedMessage
                          id="Comment"
                          defaultMessage="Comment"
                        />
                      </h6>
                      <ul>
                        {topCommentsArticle.map(article => {
                          return (
                            <Link
                              className="topRank-li"
                              onClick={() => this._getNewArticle(article._id)}
                              to={`/article_details/${article._id}`}
                            >
                              <span>
                                {article.title.length > 12
                                  ? article.title.slice(0, 15) + "..."
                                  : article.title}
                              </span>
                              <span className="articleDetail-rank-count">
                                ({article.commentCount})
                              </span>
                            </Link>
                          );
                        })}
                      </ul>
                    </section>
                  </section>
                </Col>
              </Row>
              <Row>
                <section className="pre-next">
                  <ul>
                    {preArticle ? (
                      <Link
                        onClick={() => this._getNewArticle(preArticle._id)}
                        to={`/article_details/${preArticle._id}`}
                      >
                        <FontAwesome name="angle-left" />
                        <span>&nbsp;&nbsp;{preArticle.title}</span>
                      </Link>
                    ) : null}
                    <li>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</li>
                    {nextArticle ? (
                      <Link
                        onClick={() => this._getNewArticle(nextArticle._id)}
                        to={`/article_details/${nextArticle._id}`}
                      >
                        <span>{nextArticle.title}&nbsp;&nbsp;</span>
                        <FontAwesome name="angle-right" />
                      </Link>
                    ) : null}
                  </ul>
                </section>
              </Row>
              <Row>
                {article.isComment ? (
                  <Col md={20} ms={20} xs={20}>
                    <Comment />
                  </Col>
                ) : (
                  <p>此篇文章暂不开放评论</p>
                )}
              </Row>
              <BackTop />
            </section>
          </div>
          <Footer />
        </section>
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  return {
    user: state.login.user,
    article: state.articleDetails.article,
    deleted: state.articleList.deleted,
    location: state.routing.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDetails: article => {
      dispatch(
        articleInitDetails({
          article: article
        })
      );
    },
    endDelete: () => {
      dispatch(deleteActions.successDelete());
    },
    initComment: comments => {
      dispatch(commentActions.commentInit(comments));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ArticleDetails)
);
