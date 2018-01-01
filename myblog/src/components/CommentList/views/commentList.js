import React, { Component } from "react";
import { connect } from "react-redux";
import CommentItem from "../../CommentItem/";
import CommentPagination from "../../CommentPagination/index.js";

import {
  fetchs as commentFetchs,
  actions as commentActions
} from "../../Comment/";
import {
  fetchs as configFetchs,
  actions as configActions
} from "../../../pages/SettingAdmin/";

import "./style.css";

class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      commentCount: 4
    };

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
        let commentConfig = res.config.comment;
        this.setState({
          commentCount: commentConfig.count
        });
      }
    } else {
      let commentConfig = config.comment;

      this.setState({
        commentCount: commentConfig.count
      });
    }
    let result = await commentFetchs.getComment(
      this.props.articleId,
      1,
      this.state.commentCount
    );

    if (result.code === "1") {
      // this.props.initComment(result.comments)
      let comments = result.comments;
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

  async handlePage(currentPage) {
    this.setState({
      currentPage: currentPage
    });

    let result = await commentFetchs.getComment(
      this.props.articleId,
      currentPage,
      this.state.commentCount
    );

    if (result.code === "1") {
      // this.props.initComment(result.comments)
      let comments = result.comments;
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

  render() {
    let { comments = [], commentCount } = this.props,
      { currentPage } = this.state,
      totalPages = Math.ceil(commentCount / this.state.commentCount);

    return (
      <section className="comment-list">
        <CommentPagination
          commentsCount={commentCount}
          currentPage={currentPage}
          totalPages={totalPages}
          range={5}
          onChange={this.handlePage}
        />
        <ul>
          {comments.map((comment, index) => {
            return <CommentItem key={index} commentIndex={index} />;
          })}
        </ul>
      </section>
    );
  }
}
const mapStateToProps = state => {
  let pathname = state.routing.location.pathname,
    articleId = pathname.split("/")[2];

  return {
    comments: state.comment.articleComments,
    commentCount: state.articleDetails.article.comments,
    articleId: articleId,
    user: state.login.user,
    config: state.blog.config
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initComment: comments => {
      dispatch(commentActions.commentInit(comments));
    },
    initConfig: config => {
      dispatch(configActions.initConfig(config));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
