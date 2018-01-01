import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getTopPreviewArticle, getTopCommentsArticle } from "../fetch.js";
import { setCommentRank, setPreviewRank } from "../action.js";

import { Spin } from "antd";
import FontAwesome from "react-fontawesome";
import { FormattedMessage } from "react-intl";

import "./style.css";

class Rank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topPreviewArticle: [],
      topCommentsArticle: [],
      previewLoading: true,
      commentLoading: true
    };

    this._getTopPreviewArticle = this._getTopPreviewArticle.bind(this);
    this._getTopCommentArticle = this._getTopCommentArticle.bind(this);
  }

  async _getTopPreviewArticle() {
    let result = await getTopPreviewArticle();

    if (result.code === "1") {
      let previewRank = result.result;

      this.setState({
        topPreviewArticle: previewRank,
        previewLoading: false
      });

      this.props.setTopPreviewArticle(previewRank);
    } else {
    }
  }

  async _getTopCommentArticle() {
    let result = await getTopCommentsArticle();

    if (result.code === "1") {
      let commentRank = result.result;

      this.setState({
        topCommentsArticle: commentRank,
        commentLoading: false
      });

      this.props.setTopCommentsArticle(commentRank);
    } else {
    }
  }

  async componentDidMount() {
    let { rank } = this.props;

    if (rank) {
      let { comment = [], preview = [] } = rank;

      if (comment.length === 0) {
        this._getTopPreviewArticle();
      } else {
        this.setState({
          topCommentsArticle: comment,
          commentLoading: false
        });
      }

      if (preview.length === 0) {
        this._getTopCommentArticle();
      } else {
        this.setState({
          topPreviewArticle: preview,
          previewLoading: false
        });
      }
    } else {
      this._getTopCommentArticle();
      this._getTopPreviewArticle();
    }
  }

  render() {
    let { topPreviewArticle = [], topCommentsArticle = [] } = this.state,
      { style = {}, rankCount = 5 } = this.props;

    let previewCount = Math.min(rankCount, topPreviewArticle.length);
    topPreviewArticle = topPreviewArticle.slice(0, previewCount);

    let commentCount = Math.min(rankCount, topCommentsArticle.length);
    topCommentsArticle = topCommentsArticle.slice(0, commentCount);

    return (
      <section className="rank" style={style}>
        <h5 className="rank-Title">
          <FontAwesome
            name="user-secret"
            style={{ color: "#ff7e67", marginRight: "5px" }}
          />
          <FormattedMessage id="Rank" defaultMessage="Rank" /> ~
        </h5>
        <section className="topPreview topRank">
          <h6 className="rank-sub-Title">
            <FormattedMessage id="Preview" defaultMessage="Preview" />
          </h6>
          <Spin size="small" spinning={this.state.previewLoading === true}>
            <ul>
              {topPreviewArticle.map(article => {
                return (
                  <Link
                    key={article._id}
                    className="topRank-li"
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
          <h6 className="rank-sub-Title">
            <FormattedMessage id="Comment" defaultMessage="Comment" />
          </h6>
          <Spin size="small" spinning={this.state.commentLoading === true}>
            <ul>
              {topCommentsArticle.map(article => {
                return (
                  <Link
                    key={article._id}
                    className="topRank-li"
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
    );
  }
}

Rank.propTypes = {
  rank: PropTypes.object,
  setTopPreviewArticle: PropTypes.func,
  setTopCommentsArticle: PropTypes.func,
  style: PropTypes.object,
  showCharNum: PropTypes.number
};

const mapStateToProps = state => ({
  rank: state.rank
});

const mapDispatchToProps = dispatch => ({
  setTopPreviewArticle: rank => {
    dispatch(setPreviewRank(rank));
  },
  setTopCommentsArticle: rank => {
    dispatch(setCommentRank(rank));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Rank);
