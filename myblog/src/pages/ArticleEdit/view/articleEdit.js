import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import moment from "moment";
import marked from "marked";

import redirect from "../../../components/Redirect";
import { view as TopMenu } from "../../../components/TopMenu/";
import "./style.css";

import { getEditArticle, updateArticle } from "../fetch";
import {
  fetchs as catalogFetchs,
  actions as catalogActions
} from "../../../components/CatalogAside/";

import {
  fetchs as tagsFetchs,
  actions as tagsActions
} from "../../../components/TagsCloud/";

import { initUpdateArticle } from "../action";

import { Button, Icon, Form, Input, Modal, Tag, notification } from "antd";
import { injectIntl, FormattedMessage } from "react-intl";
import message from "../../../locale/message";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

moment.locale("zh-cn");

function validateIsEmpty(value) {
  if (value.length === 0) {
    return {
      validateStatus: "error",
      errorMsg: "不为空"
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  }
}

function validateCatalog(value) {
  if (value.length === 0) {
    return {
      validateStatus: "error",
      errorMsg: "分类不为空"
    };
  } else if (value.indexOf("；") === "-1") {
    return {
      validateStatus: "warning",
      errorMsg: "使用英文;分割"
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  }
}

class ArticleEdit extends Component {
  constructor(props) {
    super(props);

    if (true) {
      var katex = import("katex")
        .then(res => {
          return res;
        })
        .catch(err => {
          console.log(err);
        });
    }

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
          smartypants: false,
          math: true,
          kaTex: katex,
          highlight: code => hljs.highlightAuto(code).value
        });
      })
      .catch(err => {
        console.log(err);
      });

    let fontSize = localStorage.getItem("fontSize") || 12;

    this.state = {
      title: { value: "" },
      content: { value: "" },
      tags: { value: "" },
      catalog: { value: "" },
      preTags: [],
      preCatalog: [],
      isShowHead: true,
      isShowPreview: true,
      isSubmit: false,
      fontSize: fontSize
    };
  }

  async componentDidMount() {
    this.props.initPost();

    let { article = {}, articleId } = this.props;

    if (article) {
      let result = await getEditArticle(articleId);

      if (result.code === "1") {
        article = result.article;
      } else {
        console.log(result);
      }
    }

    if (article) {
      this.setState({
        title: { value: article.title },
        content: { value: article.content, validateStatus: "success" },
        tags: {
          value: article.tags.join(";").toString(),
          validateStatus: "success"
        },
        catalog: {
          value: article.catalog.join(";").toString(),
          validateStatus: "success"
        },
        preTags: article.tags,
        preCatalog: article.catalog
      });
    }
  }

  async _handleSubModel() {
    let isSubmit = this.state.isSubmit,
      content = this.state.content.value,
      { catalogs, tags } = this.props;

    this.setState({
      isSubmit: !isSubmit,
      content: {
        ...validateIsEmpty(content),
        value: content
      }
    });

    if (catalogs.length === 0) {
      let result = await catalogFetchs.getCatalogsAndCount();

      if (result.code === "1") {
        this.props.setCatalog(result.catalogs);
      }
    }

    if (tags.length === 0) {
      let result = await tagsFetchs.getTags();

      if (result.code === "1") {
        this.props.setTags(result.tags);
      }
    }
  }

  async _updateArticle() {
    let { content, tags, catalog, preTags, preCatalog } = this.state;
    if (
      content.validateStatus === "success" &&
      tags.validateStatus === "success" &&
      catalog.validateStatus === "success"
    ) {
      let d = new Date(),
        update_time = moment(d).format(),
        article = {
          preTags: preTags,
          preCatalog: preCatalog,
          content: content.value,
          tags: tags.value,
          catalog: catalog.value,
          update_time: update_time
        };
      let result = await updateArticle(this.props.articleId, article);

      if (result.code === "1") {
        notification.open({
          message: this.props.intl.formatMessage(message.PostSucceedMsg),
          description: this.props.intl.formatMessage(message.PostSucceedDes),
          icon: <Icon type="smile-o" style={{ color: "#A2D5F2" }} />,
          style: {
            color: "#ff7e67",
            bacground: "#fafafa"
          }
        });
      } else {
        notification.open({
          message: this.props.intl.formatMessage(message.PostFailedMsg),
          description: this.props.intl.formatMessage(message.PostFailedDes),
          icon: <Icon type="meh-o" style={{ color: "#ff7e67" }} />,
          style: {
            color: "#A2D5F2",
            bacground: "#fafafa"
          }
        });
      }
    } else {
      notification.open({
        message: this.props.intl.formatMessage(message.CheckMsgMsg),
        description: this.props.intl.formatMessage(message.CheckMsgDes),
        icon: <Icon type="meh-o" style={{ color: "#ff7e67" }} />,
        style: {
          color: "#A2D5F2",
          bacground: "#fafafa"
        }
      });
    }

    this.setState({
      isSubmit: false
    });
  }

  _handleContent = e => {
    let value = e.target.value;

    this.setState({
      content: {
        ...validateIsEmpty(value),
        value: value
      }
    });
  };

  _handleCatalog = e => {
    let value = e.target.value;
    this.setState({
      catalog: {
        ...validateCatalog(value),
        value: value
      }
    });
  };

  _handleTags = e => {
    let value = e.target.value;
    this.setState({
      tags: {
        ...validateCatalog(value),
        value: value
      }
    });
  };

  _addCatalog(e, catalogIndex) {
    let { catalog } = this.state;

    catalog = catalog.value;

    if (catalog.length !== 0 && catalog[catalog.length - 1] !== ";") {
      catalog = catalog + ";";
    }

    let catalogs = this.props.catalogs;
    let tmpCatalog =
      catalogs && catalogs[catalogIndex]
        ? catalogs[catalogIndex]._id + ";"
        : "";

    if (catalog.indexOf(tmpCatalog) === -1) {
      let catalogValue = "" + catalog + tmpCatalog;

      this.setState({
        catalog: {
          ...validateCatalog(catalogValue),
          value: catalogValue
        }
      });
    }
  }

  _addTag(e, tagIndex) {
    let { tags } = this.state;

    let tagsArr = this.props.tags;
    let tmpTag =
      tagsArr && tagsArr[tagIndex] ? tagsArr[tagIndex].tag + ";" : "";

    if (tags.value.indexOf(tmpTag) === -1) {
      let tagsValue = "" + tags.value + tmpTag;

      this.setState({
        tags: {
          ...validateCatalog(tagsValue),
          value: tagsValue
        }
      });
    }
  }

  _addFontSize() {
    let fontSize = this.state.fontSize;

    fontSize = parseInt(fontSize, 10) + 1;

    this.setState({
      fontSize: fontSize
    });

    localStorage.setItem("fontSize", fontSize);
  }

  _desFontSize() {
    let fontSize = this.state.fontSize;

    fontSize = parseInt(fontSize, 10) - 1;

    if (fontSize < 12) {
      fontSize = 12;
    }

    this.setState({
      fontSize: fontSize
    });

    localStorage.setItem("fontSize", fontSize);
  }

  render() {
    let {
      title,
      content,
      tags,
      catalog,
      isSubmit,
      isShowHead,
      isShowPreview,
      fontSize
    } = this.state;
    let { location, user } = this.props,
      tagsArr = this.props.tags,
      catalogsArr = this.props.catalogs;
    let pathname = "/login",
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
      <section className="ArticlePost-Page">
        {isShowHead ? (
          <section className="All-Nav">
            <TopMenu />
          </section>
        ) : null}
        <section className="ArticlePost">
          <Form>
            {isShowHead ? (
              <section className="ArticlePost-header">
                <section className="Article-mainOption">
                  <Input value={title.value} disabled />

                  <Button
                    className="submit-btn ArticlePost-btn"
                    onClick={() => this._handleSubModel()}
                  >
                    <FormattedMessage id="Post" defaultMessage="Post" />
                  </Button>
                </section>
                <section className="ArticlePost-subOption">
                  <ul>
                    <li>
                      <label className="custom-file-upload">
                        <p onClick={() => this._addFontSize()}>
                          <Icon type="plus-circle-o" />
                        </p>
                      </label>
                    </li>
                    <li>
                      <label className="custom-file-upload">
                        <p onClick={() => this._desFontSize()}>
                          <Icon type="minus-circle-o" />
                        </p>
                      </label>
                    </li>
                  </ul>
                </section>
              </section>
            ) : null}

            <section
              className="article-wrtite-part"
              style={{ height: isShowHead ? "88%" : "107%" }}
            >
              <section
                className="Article-Edit"
                style={{ width: isShowPreview ? "49%" : "98%" }}
              >
                <TextArea
                  value={content.value}
                  onChange={this._handleContent}
                  style={{ fontSize: fontSize }}
                />
              </section>
              <section
                className="ArticlePost-showOption"
                style={{ left: isShowPreview ? "49%" : "98%" }}
              >
                <p
                  className="ArticlePost-showOptio-button"
                  onClick={() => this.setState({ isShowHead: !isShowHead })}
                >
                  <Icon type="appstore-o" />
                </p>
                <p
                  className="ArticlePost-showOptio-button showPreview-btn"
                  onClick={() =>
                    this.setState({ isShowPreview: !isShowPreview })
                  }
                >
                  {isShowPreview ? <Icon type="right" /> : <Icon type="left" />}
                </p>
              </section>
              {isShowPreview ? (
                <section
                  className="ArticlePost-Preview"
                  style={{ width: isShowPreview ? "49%" : "0%" }}
                >
                  {content.value ? (
                    <div
                      className="marked-preview edit-marked-preview"
                      dangerouslySetInnerHTML={{
                        __html: marked(content.value, {
                          sanitize: true
                        })
                      }}
                    />
                  ) : null}
                </section>
              ) : null}
              <Modal
                visible={isSubmit}
                onCancel={() => this.setState({ isSubmit: false })}
                onOk={() => this._updateArticle()}
              >
                <FormItem label="title">
                  <Input value={title.value} disabled />
                </FormItem>
                <FormItem
                  label="catalog"
                  validateStatus={catalog.validateStatus}
                  help={catalog.errorMsg}
                >
                  <Input value={catalog.value} onChange={this._handleCatalog} />
                </FormItem>
                {catalogsArr.map((catalog, index) => {
                  return (
                    <Tag
                      key={`tag${index}`}
                      checked={index}
                      onClick={e => this._addCatalog(e, index)}
                    >
                      {catalog._id}
                    </Tag>
                  );
                })}
                <FormItem
                  label="Tags"
                  validateStatus={tags.validateStatus}
                  help={tags.errorMsg}
                >
                  <Input value={tags.value} onChange={this._handleTags} />
                </FormItem>
                {tagsArr.map((tag, index) => {
                  return (
                    <Tag
                      key={`tag${index}`}
                      checked={index}
                      onClick={e => this._addTag(e, index)}
                    >
                      {tag.tag}
                    </Tag>
                  );
                })}
              </Modal>
            </section>
          </Form>
        </section>
      </section>
    );
  }
}

ArticleEdit.propTypes = {
  intl: PropTypes.object.isRequired,
  article: PropTypes.object,
  setTags: PropTypes.func,
  setCatalog: PropTypes.func,
  initPost: PropTypes.func,
  user: PropTypes.object,
  catalog: PropTypes.object,
  tags: PropTypes.object
};

const mapStateToProps = state => {
  let pathname = state.routing.location.pathname,
    articleId = pathname.split("/")[2];
  return {
    user: state.login.user,
    location: state.routing.location,
    article: state.articleDetails.article,
    articleId: articleId,
    catalogs: state.catalog.catalog,
    tags: state.tag.tags
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initPost: async () => {
      dispatch(initUpdateArticle());
    },
    setCatalog: catalog => {
      dispatch(catalogActions.setCatalog(catalog));
    },
    setTags: tags => {
      dispatch(tagsActions.initTags(tags));
    }
  };
};

export default redirect(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
      injectIntl(ArticleEdit, {
        withRef: true
      })
    )
  )
);
