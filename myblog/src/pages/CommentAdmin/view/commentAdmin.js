import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { view as TopMenu } from "../../../components/TopMenu/";
import CommentLi from "../../../components/CommentLi/";
import Pagination from "../../../components/Pagination/pagination";

import {
  fetchs as commentFetch,
  actions as commentAction
} from "../../../components/Comment/";

import { Row, Col } from "antd";
import { Radio } from "antd";
import QueueAnim from "rc-queue-anim";
import { FormattedMessage } from "react-intl";

class CommentAdmin extends Component {
  constructor(props) {
    super(props);

    this.handlePage = this.handlePage.bind(this);
    this.handleView = this.handleView.bind(this);

    this.state = {
      currentPage: 1,
      pageArticleCount: 1,
      filter: "ALL"
    };
  }

  async componentDidMount() {
    let result = await commentFetch.getAllComment(1, 10);

    if (result.code === "1") {
      this.props.initAllComment(result.comments);
      this.setState({
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

    let result = await commentFetch.getAllComment(curPage, 10);

    if (result.code === "1") {
      this.props.initAllComment(result.comments);
      this.setState({
        pageArticleCount: result.count
      });
    } else {
      console.log(result);
    }
  }

  handleView(e) {
    e.preventDefault();

    this.setState({
      filter: e.target.value
    });

    this.props.setFilter(e.target.value);
  }

  render() {
    let { comments = [], location, user } = this.props;
    let { currentPage, pageArticleCount, filter } = this.state;
    let totalPages = Math.ceil(pageArticleCount / 10),
      pathname = "/login",
      redirectState = { from: location };

    if (!user) {
      return (
        <Redirect
          to={{
            pathname: pathname,
            state: redirectState
          }}
        />
      );
    }

    return (
      <section>
        <section className="All-Nav">
          <TopMenu />
        </section>
        <div className="container">
          <section className="ArticleList-bg">
            <section className="ArticleList">
              <ul>
                <QueueAnim className="demo-content">
                  <Row key="commentAdmina">
                    <Col md={18} sm={18} xs={24}>
                      <h2>
                        <FormattedMessage
                          id="CommentListHeading"
                          defaultMessage="Comment Management"
                        />
                      </h2>
                    </Col>
                    <Col md={6} sm={6} xs={24}>
                      <section>
                        <Radio.Group value={filter} onChange={this.handleView}>
                          <Radio.Button value="ALL">
                            <span>
                              <FormattedMessage id="All" defaultMessage="All" />
                            </span>
                          </Radio.Button>
                          <Radio.Button value="CHECK">
                            <span>
                              <FormattedMessage
                                id="Check"
                                defaultMessage="Check"
                              />
                            </span>
                          </Radio.Button>
                          <Radio.Button value="CHECKED">
                            <span>
                              <FormattedMessage
                                id="Checked"
                                defaultMessage="Checked"
                              />
                            </span>
                          </Radio.Button>
                        </Radio.Group>
                      </section>
                    </Col>
                  </Row>

                  <Row key="commentAdminb">
                    <section
                      className="ArticleLi-head"
                      style={{ color: "#999" }}
                    >
                      <Col md={4}>
                        <span>
                          <FormattedMessage id="Title" defaultMessage="Title" />
                        </span>
                      </Col>
                      <Col md={8}>
                        <span>
                          <FormattedMessage
                            id="Comment"
                            defaultMessage="Comment"
                          />
                        </span>
                      </Col>
                      <Col md={4}>
                        <p className="ArticleLi-secondRow-head">
                          <span>
                            <FormattedMessage
                              id="CreateTime"
                              defaultMessage="Create Time"
                            />
                          </span>
                          <span>
                            <FormattedMessage
                              id="Likes"
                              defaultMessage="Create Time"
                            />
                          </span>
                          <span>
                            <FormattedMessage
                              id="CreateTime"
                              defaultMessage="Create Time"
                            />
                          </span>
                        </p>
                      </Col>
                      <Col md={4}>
                        <span>
                          <FormattedMessage
                            id="Report"
                            defaultMessage="Report"
                          />
                        </span>
                      </Col>
                      <Col md={4}>
                        <span>
                          <FormattedMessage
                            id="Option"
                            defaultMessage="Option"
                          />
                        </span>
                      </Col>
                    </section>
                  </Row>
                  <section key="commentAdminc">
                    {comments.map((comment, index) => {
                      return comment ? (
                        <CommentLi
                          key={`CommentLi${index}`}
                          commentIndex={index}
                        />
                      ) : null;
                    })}
                  </section>
                </QueueAnim>
              </ul>
            </section>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              range={5}
              onChange={this.handlePage}
            />
          </section>
        </div>
      </section>
    );
  }
}

const selectVisibleComment = (comments, filter) => {
  switch (filter) {
    case "ALL":
      return comments;
    case "CHECKED":
      return comments.filter(item => item.isChecked);
    case "CHECK":
      return comments.filter(item => !item.isChecked);
    default:
      throw new Error("unsupported filter");
  }
};

const mapStateToProps = state => {
  return {
    user: state.login.user,
    location: state.routing.location,
    comments: selectVisibleComment(
      state.comment.allComment,
      state.comment.filter
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initAllComment: comments => {
      dispatch(commentAction.commentAllInit(comments));
    },
    setFilter: filter => {
      dispatch(commentAction.setFilter(filter));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentAdmin);
