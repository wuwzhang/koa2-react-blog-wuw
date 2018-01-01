import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { view as TopMenu } from "../../../components/TopMenu/";
import {
  Row,
  Col,
  Switch,
  Select,
  InputNumber,
  Button,
  Icon,
  notification,
  Spin
} from "antd";
import { injectIntl, FormattedMessage } from "react-intl";

import { getConfig, setConfig } from "../fetch";
import {
  initConfig,
  setKeepOnFile,
  setSearchPage,
  setArticleDetails,
  setComment,
  setBasic
} from "../action.js";

import QueueAnim from "rc-queue-anim";

import "./style.css";

import message from "../../../locale/message";

const Option = Select.Option;

class SettingAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchLoading: true
    };
  }
  async componentDidMount() {
    let ans = localStorage.getItem("config"),
      config = JSON.parse(ans);

    if (!config) {
      let result = await getConfig();
      if (result.code === "1") {
        localStorage.setItem("config", JSON.stringify(result.config));
        config = result.config;
      }
    }

    this.props.initConfig(config);
    this.setState({
      searchLoading: false
    });
  }
  //keepOnFile
  _handleKeepOnFileBase(checked) {
    this.props.setKeepOnFile("aside", checked);
  }
  _handleKeepOnFileCatalogView(value) {
    this.props.setKeepOnFile("catalogView", value);
  }
  _handleKeepOnFileRankCount(value) {
    this.props.setKeepOnFile("rankCount", value);
  }
  _handleKeepOnFileArticleCount(value) {
    this.props.setKeepOnFile("articleCount", value);
  }
  //searchPage
  _handleSearchPageBase(checked) {
    this.props.setSearchPage("base", checked);
  }
  _handleSearchPageRank(checked) {
    this.props.setSearchPage("rank", checked);
  }
  _handleSearchPageArticleCount(value) {
    this.props.setSearchPage("articleCount", value);
  }
  _handleSearchPageRankCount(value) {
    this.props.setSearchPage("rankCount", value);
  }
  //articleDetails
  _handleDetailsBase(checked) {
    this.props.setArticleDetails("base", checked);
  }
  _handleArticleDeatilsRank(checked) {
    this.props.setArticleDetails("rank", checked);
  }
  _handleArticleDetailsMathJax(checked) {
    this.props.setArticleDetails("mathJax", checked);
  }
  _handleArticleDetailsRankCount(value) {
    this.props.setArticleDetails("rankCount", value);
  }
  //comment
  _handleCommentCount(value) {
    this.props.setComment("count", value);
  }
  _handleSubCommentCount(value) {
    this.props.setComment("subComment", value);
  }
  //Basic
  _handleBasicMessageNew(checked) {
    this.props.setBasic("NewMessageSendToEmail", checked);
  }
  _handleBasicCommentNew(checked) {
    this.props.setBasic("NewCommentSendToEmail", checked);
  }
  _handleBasicMessageReport(checked) {
    this.props.setBasic("CommentReportSendToEmail", checked);
  }

  //apply
  async _handleApply(e) {
    e.preventDefault(e);

    let config = this.props.config;

    if (config) {
      let result = await setConfig(config);

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
        localStorage.setItem("config", JSON.stringify(config));
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
  }

  render() {
    let { config, location, user } = this.props,
      { searchPage, keepOnFile, articleDetails, comment, basic } = config,
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
          <Spin size="large" spinning={this.state.searchLoading === true}>
            <section className="settingAdmin">
              <QueueAnim type={["right", "left"]}>
                <Row key="a">
                  <Col md={8} sm={12} xs={24}>
                    <Row>
                      {keepOnFile ? (
                        <section className="settingAdmin-keepOnFile settingAdmin-block bg-white">
                          <Col md={24}>
                            <h3 className="settingAdmin-block-title">
                              <FormattedMessage
                                id="KeepOnFile"
                                defaultMessage="Keep On File"
                              />
                            </h3>
                          </Col>
                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">
                                <FormattedMessage
                                  id="Base"
                                  defaultMessage="Base"
                                />
                              </p>
                            </Col>
                            <Col span={6}>
                              <Switch
                                defaultChecked={keepOnFile.aside}
                                onChange={checked =>
                                  this._handleKeepOnFileBase(checked)
                                }
                              />
                            </Col>
                          </Row>
                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">
                                <FormattedMessage
                                  id="ArticleView"
                                  defaultMessage="Article View"
                                />
                              </p>
                            </Col>
                            <Col span={6}>
                              <Select
                                defaultValue={keepOnFile.catalogView}
                                onChange={value =>
                                  this._handleKeepOnFileCatalogView(value)
                                }
                              >
                                <Option value="catalog">catalog</Option>
                                <Option value="summary">summary</Option>
                              </Select>
                            </Col>
                          </Row>
                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">
                                <FormattedMessage
                                  id="ArticleItemCount"
                                  defaultMessage="Article Item Count"
                                />
                              </p>
                            </Col>
                            <Col span={6}>
                              <InputNumber
                                min={3}
                                max={10}
                                defaultValue={keepOnFile.articleCount}
                                onChange={value =>
                                  this._handleKeepOnFileArticleCount(value)
                                }
                              />
                            </Col>
                          </Row>
                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">
                                <FormattedMessage
                                  id="RankItemCount"
                                  defaultMessage="Rank Item Count"
                                />
                              </p>
                            </Col>
                            <Col span={6}>
                              <InputNumber
                                min={3}
                                max={10}
                                defaultValue={keepOnFile.rankCount}
                                onChange={value =>
                                  this._handleKeepOnFileRankCount(value)
                                }
                              />
                            </Col>
                          </Row>
                        </section>
                      ) : null}
                    </Row>
                  </Col>
                  <Col md={8} sm={12} xs={24}>
                    <Row>
                      {searchPage ? (
                        <section className="settingAdmin-searchPage settingAdmin-block bg-blue">
                          <Col md={24}>
                            <h3 className="settingAdmin-block-title">
                              <FormattedMessage
                                id="SearchPage"
                                defaultMessage="Search Page"
                              />
                            </h3>
                          </Col>
                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">
                                <FormattedMessage
                                  id="Base"
                                  defaultMessage="Base"
                                />
                              </p>
                            </Col>
                            <Col span={6}>
                              <Switch
                                defaultChecked={searchPage.base}
                                onChange={checked =>
                                  this._handleSearchPageBase(checked)
                                }
                              />
                            </Col>
                          </Row>
                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">
                                <FormattedMessage
                                  id="Rank"
                                  defaultMessage="Rank"
                                />
                              </p>
                            </Col>
                            <Col span={6}>
                              <Switch
                                defaultChecked={searchPage.rank}
                                onChange={checked =>
                                  this._handleSearchPageRank(checked)
                                }
                              />
                            </Col>
                          </Row>
                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">
                                <FormattedMessage
                                  id="ArticleItemCount"
                                  defaultMessage="Article Item Count"
                                />
                              </p>
                            </Col>
                            <Col span={6}>
                              <InputNumber
                                min={3}
                                max={10}
                                defaultValue={searchPage.articleCount}
                                onChange={value =>
                                  this._handleSearchPageArticleCount(value)
                                }
                              />
                            </Col>
                          </Row>
                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">
                                <FormattedMessage
                                  id="RankItemCount"
                                  defaultMessage="RankItemCount"
                                />
                              </p>
                            </Col>
                            <Col span={6}>
                              <InputNumber
                                min={3}
                                max={10}
                                defaultValue={searchPage.rankCount}
                                onChange={value =>
                                  this._handleSearchPageRankCount(value)
                                }
                              />
                            </Col>
                          </Row>
                        </section>
                      ) : null}
                    </Row>
                  </Col>
                  <Col md={8} sm={12} xs={24}>
                    <Row>
                      {searchPage ? (
                        <section className="settingAdmin-searchPage settingAdmin-block bg-white">
                          <Col md={24}>
                            <h3 className="settingAdmin-block-title">
                              <FormattedMessage
                                id="ArticleDetails"
                                defaultMessage="Article Show Page"
                              />
                            </h3>
                          </Col>
                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">Base</p>
                            </Col>
                            <Col span={6}>
                              <Switch
                                defaultChecked={articleDetails.base}
                                onChange={checked =>
                                  this._handleDetailsBase(checked)
                                }
                              />
                            </Col>
                          </Row>
                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">
                                <FormattedMessage
                                  id="Rank"
                                  defaultMessage="Rank"
                                />
                              </p>
                            </Col>
                            <Col span={6}>
                              <Switch
                                defaultChecked={articleDetails.rank}
                                onChange={checked =>
                                  this._handleArticleDeatilsRank(checked)
                                }
                              />
                            </Col>
                          </Row>
                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">
                                <FormattedMessage
                                  id="OpenMathJax"
                                  defaultMessage="OpenMathJax"
                                />
                              </p>
                            </Col>
                            <Col span={6}>
                              <Switch
                                defaultChecked={articleDetails.mathJax}
                                onChange={checked =>
                                  this._handleArticleDetailsMathJax(checked)
                                }
                              />
                            </Col>
                          </Row>
                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">
                                <FormattedMessage
                                  id="RankItemCount"
                                  defaultMessage="Rank Item sCount"
                                />
                              </p>
                            </Col>
                            <Col span={6}>
                              <InputNumber
                                min={3}
                                max={10}
                                defaultValue={articleDetails.rankCount}
                                onChange={value =>
                                  this._handleArticleDetailsRankCount(value)
                                }
                              />
                            </Col>
                          </Row>
                        </section>
                      ) : null}
                    </Row>
                  </Col>
                </Row>
                <Row key="b">
                  <Col md={8} sm={12} xs={24}>
                    <Row>
                      {comment ? (
                        <section className="settingAdmin-block bg-blue">
                          <Col md={24}>
                            <h3 className="settingAdmin-block-title">
                              <FormattedMessage
                                id="Comment"
                                defaultMessage="Comment"
                              />
                            </h3>
                          </Col>

                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">
                                <FormattedMessage
                                  id="CommentCount"
                                  defaultMessage="Comment Count"
                                />
                              </p>
                            </Col>
                            <Col span={6}>
                              <InputNumber
                                min={3}
                                max={10}
                                defaultValue={comment.count}
                                onChange={value =>
                                  this._handleCommentCount(value)
                                }
                              />
                            </Col>
                          </Row>
                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">
                                <FormattedMessage
                                  id="SubCommentCount"
                                  defaultMessage="SubComment Count"
                                />
                              </p>
                            </Col>
                            <Col span={6}>
                              <InputNumber
                                min={3}
                                max={10}
                                defaultValue={comment.subComment}
                                onChange={value =>
                                  this._handleSubCommentCount(value)
                                }
                              />
                            </Col>
                          </Row>
                        </section>
                      ) : null}
                    </Row>
                  </Col>
                  <Col md={8} sm={12} xs={24}>
                    <Row>
                      {basic ? (
                        <section className="settingAdmin-block bg-white">
                          <Col md={24}>
                            <h3 className="settingAdmin-block-title">
                              <FormattedMessage
                                id="Basic"
                                defaultMessage="Basic"
                              />
                            </h3>
                          </Col>

                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">
                                <FormattedMessage
                                  id="NewMessageSendToEmail"
                                  defaultMessage="New Message, Send Email"
                                />
                              </p>
                            </Col>
                            <Col span={6}>
                              <Switch
                                defaultChecked={basic.NewMessageSendToEmail}
                                onChange={checked =>
                                  this._handleBasicMessageNew(checked)
                                }
                              />
                            </Col>
                          </Row>
                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">
                                <FormattedMessage
                                  id="NewCommentSendToEmail"
                                  defaultMessage="New Comment, Send Message"
                                />
                              </p>
                            </Col>
                            <Col span={6}>
                              <Switch
                                defaultChecked={basic.NewCommentSendToEmail}
                                onChange={checked =>
                                  this._handleBasicCommentNew(checked)
                                }
                              />
                            </Col>
                          </Row>
                          <Row className="settingAdmin-item">
                            <Col span={18}>
                              <p className="settingAdmin-itemName">
                                <FormattedMessage
                                  id="CommentReportSendToEmail"
                                  defaultMessage="Comment Report, Send Email"
                                />
                              </p>
                            </Col>
                            <Col span={6}>
                              <Switch
                                defaultChecked={basic.CommentReportSendToEmail}
                                onChange={checked =>
                                  this._handleBasicMessageReport(checked)
                                }
                              />
                            </Col>
                          </Row>
                        </section>
                      ) : null}
                    </Row>
                  </Col>
                  <Col md={8} sm={12} xs={24}>
                    <section className="settingAdmin-Apply-item">
                      <Button
                        onClick={e => this._handleApply(e)}
                        className="settingAdmin-apply-btn"
                      >
                        Apply
                      </Button>
                    </section>
                  </Col>
                </Row>
              </QueueAnim>
            </section>
          </Spin>
        </div>
      </section>
    );
  }
}
SettingAdmin.propTypes = {
  intl: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  initConfig: PropTypes.object.func,
  setKeepOnFile: PropTypes.object.func,
  setSearchPage: PropTypes.object.func,
  setArticleDetails: PropTypes.object.func,
  setComment: PropTypes.object.func,
  setBasic: PropTypes.object.func
};

const mapStateToProps = state => ({
  config: state.blog.config,
  user: state.login.user,
  location: state.routing.location
});

const mapDispatchToProps = dispatch => {
  return {
    initConfig: config => {
      dispatch(initConfig(config));
    },
    setKeepOnFile: (item, value) => {
      dispatch(setKeepOnFile(item, value));
    },
    setSearchPage: (item, value) => {
      dispatch(setSearchPage(item, value));
    },
    setArticleDetails: (item, value) => {
      dispatch(setArticleDetails(item, value));
    },
    setComment: (item, value) => {
      dispatch(setComment(item, value));
    },
    setBasic: (item, value) => {
      dispatch(setBasic(item, value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(SettingAdmin, {
    withRef: true
  })
);
