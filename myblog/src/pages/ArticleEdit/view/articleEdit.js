import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import marked from 'marked';

// import { view as FieldGroup } from '../../../components/FieldGroup';
import redirect from '../../../components/Redirect';
import { view as TopMenu } from '../../../components/TopMenu/';
import './style.css';

import {
  getEditArticle,
  updateArticle
} from '../fetch';

import {
  initUpdateArticle,
  startUpdateArticle,
  successUpdateArticle,
  failUpdateArticle,
  updateSuccess,
  updateFail
} from '../action';

import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import { Alert, Button, BackTop } from 'antd';

moment.locale('zh-cn');

class ArticlePostOrEdit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: this.props.articleTitle || '',
      content: this.props.articleContent || '',
      tags: '',
      catalog: '',
      tagsValid: 'success',
      catalogValid: 'success',
      titleValid: 'success',
      contentValid: 'success',
      isPreview: false      //是否预览，默认关闭预览
    }
    import('highlight').then(({hljs}) => {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        highlight: (code) => hljs.highlightAuto(code).value
      });
    }).catch(err => {
      console.log(err);
    })


    this.handlePreview = this.handlePreview.bind(this);
  }

  async componentDidMount () {

    this.props.initPost();

    let { article = {}, articleId } = this.props;

    if (article) {
      let result = await getEditArticle(articleId);

      if (result.code === '1') {
        article = result.article;
      } else {
        console.log(result)
      }
    }

    if (article) {
      this.setState({
        title: article.title,
        content: article.content,
        tags: article.tags,
        catalog: article.catalog
      })
    }
  }

  /**
   * 检测标题是否合法，当标题为空时，不合法
   * @param  {[string]} value [文章标题]
   */
  async _checkTitle(value) {
    this.setState({
      titleValid: null,
      titleHelp: ''
    });

    if (value.length === 0) {
      this.setState({
        titleValid: 'error',
        titleHelp: '标题不为空'
      });
    } else {
      this.setState({
        titleValid: 'success'
      })
    }
  }

  /**
   * 检测内容是否合法，为空不合法
   * @param  {string} value 文章内容
   */
  _checkContent(value) {
    this.setState({
      contentValid: null,
      contentHelp: ''
    });

    if (value.length === 0) {
      this.setState({
        contentValid: 'error',
        contentHelp: '内容不为空'
      });
    } else {
      this.setState({
        contentValid: 'success'
      })
    }
  }

  /**
   * 检测标签是否合法，由中文;分割为不合法
   * @param  {string} value 标签字符串
   */
  _checkTags(value) {
    // console.log(value);
    this.setState({
      tagsValid: null,
      tagsHelp: ''
    })

    if (value.indexOf('；') === '-1') {
      this.setState({
        tagsValid: 'error',
        tagsHelp: '使用英文;分割'
      })
    } else {
      this.setState({
        tagsValid: 'success',
        tagsHelp: ''
      })
    }
  }

  /**
   * 检测文章分类是否合法,多于一个分类为不合法
   * @param  {string} value 文章分类
   */
  _checkCatalog(value) {
    this.setState({
      catalogValid: null,
      catalogHelp: ''
    })

    if (value.indexOf(';') === '-1') {
      this.setState({
        catalogValid: 'error',
        catalogHelp: '分类不得多于一个'
      })
    } else {
      this.setState({
        catalogValid: 'success',
        catalogHelp: ''
      })
    }
  }

  handlePreview() {
    this.setState(prevState => ({
      isPreview: !prevState.isPreview
    }))
  }

  /**
   * 修改文章
   */
  async _updateArticle() {
    const {
      title,
      content,
      tags,
      catalog,
      titleValid,
      contentValid,
      tagsValid,
      catalogValid
    } = this.state;


    function _checkComplete() {

      return (titleValid === 'success'
              && contentValid === 'success'
              && tagsValid === 'success'
              && catalogValid === 'success');
    }

    if (_checkComplete()) {
      let d = new Date(),
        update_time = moment(d).format();

      const article = {
        title: title,
        content: content,
        tags: tags,
        catalog: catalog,
        update_time: update_time
      }

      this.props.updatePost(this.props.articleId, article);
    }
  }

  render() {
    let { title, content, tags, catalog } = this.state;
    let { msgType, msg } = this.props.articleEdit;

    return(
      <section>
        <section className='All-Nav'>
          <TopMenu />
        </section>
        <Grid>
          <section>
            <Row>
              <Col md={6} ms={6} xs={12}>
                <h2 className='articlePost-title'>Article Post</h2>
              </Col>
            </Row>
            <Form horizontal>
              <Row>
                <Col md={6} ms={6} xs={12}>
                  <FormGroup
                    validationState={this.state.titleValid}
                  >
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                        type='text'
                        placeholder='Enter title'
                        value={title}
                        onChange={(event)=>this.setState({title:event.target.value})}
                        onBlur={(event)=>this._checkTitle(event.target.value)}
                      />
                    {this.state.titleHelp && <HelpBlock>{ this.state.titleHelp }</HelpBlock>}

                  </FormGroup>
                </Col>

                <Col md={6} ms={6} xs={0}>
                  <Button className="myButton previewButton" onClick={ this.handlePreview }>{ this.state.isPreview ? '<  Hidden Preview' : 'Show Preview  >' }</Button>
                </Col>
              </Row>
              {
                this.state.isPreview? <Row>
                                        <Col xs={0} ms={6} md={6}>
                                          <FormGroup
                                            validationState={this.state.contentValid}
                                          >

                                              <ControlLabel>Content</ControlLabel>
                                              <FormControl
                                                componentClass="textarea"
                                                placeholder='Enter Content'
                                                value={content}
                                                onChange={(event)=>this.setState({content:event.target.value})}
                                                onBlur={(event)=>this._checkContent(event.target.value)}
                                                style={{ height: 800 }}
                                              />
                                              {this.state.contentHelp && <HelpBlock>{this.state.contentHelp}</HelpBlock>}



                                          </FormGroup>
                                        </Col>
                                        {
                                            this.state.content? <Col sm={6} xs={0} md={6}>
                                                                  <ControlLabel>Preview</ControlLabel>
                                                                  <div
                                                                    className="marked-preview edit-marked-preview"

                                                                    dangerouslySetInnerHTML={{
                                                                      __html: marked(this.state.content, {sanitize: true})
                                                                    }}
                                                                  />
                                                                </Col>
                                                              : null
                                          }
                                      </Row>
                                    : <Row>
                                        <Col sm={12} md={12} xs={12}>
                                          <FormGroup
                                            validationState={this.state.contentValid}
                                          >

                                              <ControlLabel>Content</ControlLabel>
                                              <FormControl
                                                componentClass="textarea"
                                                placeholder='Enter Content'
                                                value={content}
                                                onChange={(event)=>this.setState({content:event.target.value})}
                                                onBlur={(event)=>this._checkContent(event.target.value)}
                                                style={{ height: 800 }}
                                              />
                                              {this.state.contentHelp && <HelpBlock>{this.state.contentHelp}</HelpBlock>}
                                          </FormGroup>
                                        </Col>
                                      </Row>

              }
              <Row>
                <Col sm={6} md={6}>
                  <FormGroup>
                    <ControlLabel
                      validationState={this.state.commentValid}
                    >Input Tags</ControlLabel>
                    <FormControl
                      type='text'
                      label='tags'
                      placeholder='不同标签之间由;间隔'
                      value={ (tags instanceof Array) ? Array.from(tags).join(';') : tags }
                      onChange={(event)=>this.setState({tags:event.target.value})}
                      onBlur={(event)=>this._checkTags(event.target.value)}
                    />
                    {this.state.tagsHelp && <HelpBlock>{this.state.tagsHelp}</HelpBlock>}
                  </FormGroup>
                </Col>
                <Col sm={6} md={6}>
                  <FormGroup>
                    <ControlLabel
                      validationState={this.state.commentValid}
                    >Input Catalog</ControlLabel>
                    <FormControl
                      type='text'
                      label='catalog'
                      placeholder='catalog'
                      value={ catalog }
                      onChange={(event)=>this.setState({catalog:event.target.value})}
                      onBlur={(event)=>this._checkTags(event.target.value)}
                    />
                    {this.state.catalogHelp && <HelpBlock>{this.state.catalogHelp}</HelpBlock>}
                  </FormGroup>
                </Col>

              </Row>
              <Row>
                <Col xs={12} sm={3} md={3}>
                <Button
                  className="myButton postButton submit-btn"
                  onClick={()=>this._updateArticle()}
                >COMPLETE</Button>
                </Col>
              </Row>
              {
                msgType === 'warning' ? <Alert className="myAlert" message={ msg } type="warning" showIcon closable/> : null
              }
              {
                msgType === 'success' ? <Alert className="myAlert" message={ msg } type="success" showIcon closable/> : null
              }
            </Form>
            <BackTop />
          </section>
        </Grid>
      </section>
    );
  }
}

ArticlePostOrEdit.propTypes = {
  article: PropTypes.object,
  updatePost: PropTypes.func,
  initPost: PropTypes.func
};

const mapStateToProps = (state) => {
  let pathname = state.routing.location.pathname,
      articleId = pathname.split('/')[2];

  return {
    articleId: articleId,
    articleEdit: state.articleEdit,
    article: state.articleDetails.article
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    initPost: async () => {
      dispatch(initUpdateArticle());
    },
    updatePost: async (articleId, data) => {
      dispatch(startUpdateArticle())
      let result = await updateArticle(articleId, data);

      if (result.code === '1') {
        dispatch(successUpdateArticle())
        dispatch(updateSuccess());
      } else {
        dispatch(failUpdateArticle())
        dispatch(updateFail());
      }
    }
  }
}

export default redirect(withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticlePostOrEdit)));
