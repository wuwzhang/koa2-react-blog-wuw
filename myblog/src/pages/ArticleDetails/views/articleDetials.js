import React, {
  Component
} from "react";
import {
  connect
} from "react-redux";
import {
  withRouter,
  Redirect,
  Link
} from "react-router-dom";

import ArticleOptionNav from "../../../components/ArticleOptionNav/articleOptionNav.js";
import {
  Aside
} from "../../../components/Aside/index.js";
import {
  view as TopMenu
} from "../../../components/TopMenu/";
import Footer from "../../../components/Footer/index.js";
import ScrollIndicator from "../../../components/ScrollIndicator/index.js";

import {
  view as Comment,
  fetchs as commentFetchs,
  actions as commentActions
} from "../../../components/Comment/";
import {
  detailArticle
} from "../fetch";
import {
  fetchs as rankFetchs
} from "../../../components/Rank/";
import {
  actions as deleteActions
} from "../../ArticleList/";
import {
  articleInitDetails
} from "../action.js";
import {
  fetchs as configFetchs,
  actions as configActions
} from "../../SettingAdmin/";

import {
  BackTop,
  Button,
  Col,
  Row,
  Spin
} from "antd";
import FontAwesome from "react-fontawesome";
import {
  CopyToClipboard
} from "react-copy-to-clipboard";
import {
  FormattedMessage
} from "react-intl";

// import utils from "../../../utils/utils";

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
      windowLocation: document.URL,
      searching: true,
      topPreviewLoading: true,
      topCommentLoading: true,
      base: true,
      rank: true,
      rankCount: 4,
      mathJax: false
      // scrollbarContainer: {},
      // scrollbar: { width: "0px" }
    };
    // let katex = false;

    // if (this.state.mathJax) {
    //   katex =
    //     import ("katex")
    //     .then(res => {
    //       return res;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }

    this.onCopy = this.onCopy.bind(this);

    import ("highlight.js")
    .then(({
        hljs
      }) => {
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
          math: true,
          // kaTex: katex
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  async componentDidMount() {
    let ans = localStorage.getItem("config"),
      config = JSON.parse(ans);
    if (!config) {
      let res = await configFetchs.getConfig();

      if (res.code === "1") {
        this.props.initConfig(res.config);
        localStorage.setItem("config", JSON.stringify(res.config));
        let articleDetailsConfig = res.config.articleDetails;
        this.setState({
          base: articleDetailsConfig.base,
          rank: articleDetailsConfig.rank,
          rankCount: articleDetailsConfig.rankCount,
          mathJax: articleDetailsConfig.mathJax
        });
      }
    } else {
      let articleDetailsConfig = config.articleDetails;

      this.setState({
        base: articleDetailsConfig.base,
        rank: articleDetailsConfig.rank,
        rankCount: articleDetailsConfig.rankCount,
        mathJax: articleDetailsConfig.mathJax
      });
    }

    let articleId = this.props.match.params.articleId;
    let result = await detailArticle(articleId);

    if (result.code === "1") {
      this.props.getDetails(result.article);

      this.setState({
        preArticle: result.preArticle,
        nextArticle: result.nextArticle,
        searching: false
      });
    } else {
      console.log(result);
    }

    if (this.state.rank) {
      let {
        rankCount = 5
      } = this.state;

      let topPreviewRes = await rankFetchs.getTopPreviewArticle();
      if (topPreviewRes.code === "1") {
        let articles = topPreviewRes.result;
        articles = articles.slice(0, Math.min(rankCount, articles.length));
        this.setState({
          topPreviewArticle: articles,
          topPreviewLoading: false
        });
      } else {}

      let topCommentsRes = await rankFetchs.getTopCommentsArticle();
      if (topCommentsRes.code === "1") {
        let articles = topCommentsRes.result;
        articles = articles.slice(0, Math.min(rankCount, articles.length));
        this.setState({
          topCommentsArticle: articles,
          topCommentLoading: false
        });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.searching !== nextState.searching ||
      this.state.topPreviewLoading !== nextState.topPreviewLoading ||
      this.state.topCommentLoading !== nextState.topCommentLoading ||
      this.state.topPreviewArticle !== nextState.topPreviewArticle ||
      this.state.topCommentsArticle !== nextState.topCommentsArticle ||
      this.state.preArticle !== nextState.preArticle ||
      this.state.nextArticle !== nextState.nextArticle ||
      // this.state.scrollbarContainer !== nextState.scrollbarContainer ||
      // this.state.scrollbar !== nextState.scrollbar ||
      this.props.config !== nextProps.config ||
      this.props.article !== nextProps.article ||
      (this.state.pathname !== nextState.pathname &&
        this.state.redirectState !== nextState.redirectState) ||
      this.props.user !== nextProps.user ||
      this.props.deleted !== nextProps.deleted
    );
  }

  async _getNewArticle(articleId) {
    this.setState({
      searching: true
    });
    let result = await detailArticle(articleId);

    if (result.code === "1") {
      this.props.getDetails(result.article);

      this.setState({
        preArticle: result.preArticle,
        nextArticle: result.nextArticle,
        searching: false
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
          let {
            likes,
            dislikes
          } = comment,
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
    } else {}
  }

  onCopy() {
    this.setState({
      copied: true
    });
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
    let {
      article
    } = this.props;
    let {
      preArticle,
      nextArticle,
      topPreviewArticle = [],
      topCommentsArticle = [],
      rank,
      base
    } = this.state;

    if (article) {
      return (
        <section>
          <section className="All-Nav">
            <TopMenu style={{ position: "relative" }} />
          </section>
          <ScrollIndicator
            scrollbarContainer={this.state.scrollbarContainer}
            scrollbar={this.state.scrollbar}
          />
          <div className="container">
            <section className="articleDetail">
              <Spin size="large" spinning={this.state.searching === true}>
                <Row gutter={16} key="articleDetaila">
                  <section className="ArticleDetials-titleContainer">
                    <Col md={12} sm={12} xs={12} key="articleDetaila1">
                      <h3 className="ArticleDetails-articleTitle">
                        {article.title}
                      </h3>
                    </Col>
                    <Col md={12} sm={12} xs={12} key="articleDetaila2">
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
                <Row key="articleDetailb">
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
                    {base ? (
                      <Aside
                        color="#07689f"
                        tags={article.tags}
                        catalog={article.catalog}
                        create_time={
                          article.created_at
                            ? article.created_at.slice(0, 10)
                            : ""
                        }
                        update_time={
                          article.updated_at
                            ? article.updated_at.slice(0, 10)
                            : ""
                        }
                      />
                    ) : null}
                    {rank ? (
                      <section className="articleDetails-rank rank">
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
                          <Spin
                            size="small"
                            spinning={this.state.topPreviewLoading === true}
                          >
                            <ul>
                              {topPreviewArticle.map(article => {
                                return (
                                  <Link
                                    key={`topPreviewArticle${article._id}`}
                                    className="topRank-li"
                                    onClick={() =>
                                      this._getNewArticle(article._id)
                                    }
                                    to={`/article_details/${article._id}`}
                                  >
                                    <span className="articleDetail-rank-content">
                                      {article.title}
                                    </span>
                                    <span className="articleDetail-rank-count">
                                      {" "}
                                      ({article.pv})
                                    </span>
                                  </Link>
                                );
                              })}
                            </ul>
                          </Spin>
                        </section>
                        <section className="topComment topRank">
                          <h6 className="ArticleDetails-sub-Title">
                            <FormattedMessage
                              id="Comment"
                              defaultMessage="Comment"
                            />
                          </h6>
                          <Spin
                            size="small"
                            spinning={this.state.topCommentLoading === true}
                          >
                            <ul>
                              {topCommentsArticle.map(article => {
                                return (
                                  <Link
                                    key={`topCommentsArticle${article._id}`}
                                    className="topRank-li"
                                    onClick={() =>
                                      this._getNewArticle(article._id)
                                    }
                                    to={`/article_details/${article._id}`}
                                  >
                                    <span className="articleDetail-rank-content">
                                      {article.title}
                                    </span>
                                    <span className="articleDetail-rank-count">
                                      ({article.commentCount})
                                    </span>
                                  </Link>
                                );
                              })}
                            </ul>
                          </Spin>
                        </section>
                      </section>
                    ) : null}
                  </Col>
                </Row>
              </Spin>
              <Row key="articleDetailc">
                <section className="pre-next">
                  <ul>
                    {preArticle ? (
                      <Link
                        key={preArticle._id}
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
                        key={nextArticle._id}
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
              <Row key="articleDetaild">
                {article.isComment ? (
                  <Col md={20} ms={20} xs={20} key="articleDetaild1">
                    <Comment />
                  </Col>
                ) : (
                  <p className="ArticleDetails-commentTip">
                    此篇文章暂不开放评论
                  </p>
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
    location: state.routing.location,
    config: state.blog.config
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
    },
    initConfig: config => {
      dispatch(configActions.initConfig(config));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ArticleDetails)
);
