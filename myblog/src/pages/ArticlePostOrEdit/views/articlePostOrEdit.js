import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import marked from 'marked';

import { view as FieldGroup } from '../../../components/FieldGroup';
import redirect from '../../../components/Redirect';
import './style.css';

import {
  addPost,
  checkTitle,
  getEditArticle,
  updateArticle
} from '../fetch';

import {
  startPostArticle,
  successPostArticle,
  failPostArticle,
  postSuccess,
  postFail,
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
  Row,
  Col,
  Button
} from 'react-bootstrap';
import { Alert } from 'antd';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});
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
      mode: 1
    }
  }

  async componentDidMount () {
    let result = await getEditArticle(this.props.articleId);

    if (result.code === '1') {
      this.setState({
        title: result.article.title,
        content: result.article.content,
        tags: result.article.tags,
        catalog: result.article.catalog,
        mode: 2
      })
    } else {
      console.log(result.code);
    }
  }

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
      if (this.state.mode === 1) {
        let result = await checkTitle(value);

        if (result.code === '1') {
          this.setState({
            titleValid: 'success'
          })
        } else {
          this.setState({
            titleValid: 'error',
            titleHelp: '存在同名标题文章'
          })
        }
      } else {
        this.setState({
          titleValid: 'success'
        })
      }
    }
  }

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
  _checkCatalog(value) {
    // console.log(value);
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
  async _postArticle() {
    // console.log(this.state);
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
      this.props.addPost({
        article: {
          title,
          content,
          tags,
          catalog
        }
      })
    }
  }

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

    console.log(msgType);
    console.log(msg);

    return(
      <section>
        <h2>Article Edit</h2>
        <Form horizontal>
          <FieldGroup
            type='text'
            label='Title'
            placeholder='Enter title'
            value={title}
            onChange={(event)=>this.setState({title:event.target.value})}
            onBlur={(event)=>this._checkTitle(event.target.value)}
            validationState={this.state.titleValid}
            help={this.state.titleHelp}
          />
          <FormGroup
            validationState={this.state.contentValid}
          >
            <Col sm={12} md={6}>
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
            </Col>
            {
              this.state.content? <Col smHidden xsHidden md={6}>
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

          </FormGroup>
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
          <Col sm={12} md={2} >
          {
            this.state.mode === 1 ? <Button
                                      componentClass="foot_btn"
                                      onClick={()=>this._postArticle()}
                                    >POST</Button>
                                  : null
          }
          {
            this.state.mode === 2 ? <Button
                                        componentClass="foot_btn"
                                        onClick={()=>this._updateArticle()}
                                      >COMPLETE</Button>
                                  : null
          }
          </Col>
          {
            msgType === 'warning' ? <Alert className="myAlert" message={ msg } type="warning" showIcon closable/> : null
          }
          {
            msgType === 'success' ? <Alert className="myAlert" message={ msg } type="success" showIcon closable/> : null
          }
        </Form>
      </section>
    );
  }
}

ArticlePostOrEdit.propTypes = {
  article: PropTypes.object,
  addPost: PropTypes.func
};

const mapStateToProps = (state) => {
  let pathname = state.routing.location.pathname,
      articleId = pathname.split('/')[2];

  return {
    articleId: articleId,
    articleEdit: state.articleEdit
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: async (article) => {

      dispatch(startPostArticle());

      let result = await addPost(article);

      if (result.code === '1') {
        dispatch(successPostArticle());
        dispatch(postSuccess());
      } else {
        dispatch(failPostArticle());
        dispatch(postFail());
      }
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

export default redirect(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePostOrEdit)));
