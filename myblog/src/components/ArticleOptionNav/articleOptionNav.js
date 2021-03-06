import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchs as deleteFetchs,
  actions as deleteActions
} from "../../pages/ArticleList/";

// import {
//   Redirect
// } from 'react-router'

import { Popconfirm, message } from "antd";
import "./style.css";

import { FormattedMessage } from "react-intl";

class ArticleOptionNav extends Component {
  constructor(props) {
    super(props);

    this._deleteArticle = this._deleteArticle.bind(this);

    this.cancel = this.cancel.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  _deleteArticle(event) {
    event.preventDefault();
    const articleId = this.props.id || this.props.articleId;
    this.props.deletePost(articleId, this.props.index);
  }

  confirm(e) {
    this._deleteArticle(e);
    message.success("Delete the article");
  }

  cancel() {
    message.error("Cancle delete");
  }
  render() {
    let { myStyle = { color: "#07689F" } } = this.props;

    return (
      <nav className="article-option-nav">
        <ul>
          <li>
            <Link to={`/article_edit/${this.props.articleId || this.props.id}`}>
              <span style={myStyle}>
                <FormattedMessage id="Edit" defaultMessage="Edit" />
              </span>
            </Link>
          </li>
          <li>
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={this.confirm}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <span style={myStyle}>
                <FormattedMessage id="Delete" defaultMessage="Delete" />
              </span>
            </Popconfirm>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  let pathname = state.routing.location.pathname,
    articleId = pathname.split("/")[2];

  return {
    articleId: articleId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deletePost: async (articleId, index) => {
      let result = await deleteFetchs.deleteArticle(articleId);
      if (result.code === "1") {
        dispatch(deleteActions.artcileDelete(index));
      } else {
        console.log(result);
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleOptionNav);
