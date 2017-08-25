import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import marked from 'marked';

import { view as FieldGroup } from '../../../components/FieldGroup';
import redirect from '../../../components/Redirect';

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
  articleInitEdit,
  startUpdateArticle,
  successUpdateArticle,
  failUpdateArticle,
} from '../action';

import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Col,
  Button
} from 'react-bootstrap';

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

class ArticlePostOrEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.articleTitle || '',
      content: this.props.articleContent || '',
      titleValid: 'success',
      contentValid: 'success',
      mode: 1
    }
  }

  componentDidMount () {
    (async function() {
      let result = await getEditArticle(this.props.articleId);

      if (result.code === '1') {
        this.setState({
          title: result.article.title,
          content: result.article.content,
          mode: 2
        })
      } else {
        console.log(result.code);
      }

    }.bind(this))()
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

  async _postArticle() {
    const {
      title,
      content,
      titleValid,
      contentValid
    } = this.state;

    function _checkComplete() {

      return (titleValid === 'success'
              && contentValid === 'success');
    }

    if (_checkComplete()) {
      this.props.addPost({
        article: {
          title,
          content
        }
      })
    }
  }

  async _updateArticle() {

    const {
      title,
      content,
      titleValid,
      contentValid
    } = this.state;


    function _checkComplete() {

      return (titleValid === 'success'
              && contentValid === 'success');
    }

    if (_checkComplete()) {
      let d = new Date();
      const update_time = d.toUTCString();

      const article = {
        title: title,
        content: content,
        update_time: update_time
      }

      this.props.updatePost(this.props.articleId, article);
    }
  }

  render() {
    let { title, content } = this.state;

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
                style={{height: 500}}
              />
              {this.state.contentHelp && <HelpBlock>{this.state.contentHelp}</HelpBlock>}
            </Col>
            {
              this.state.content? <Col smHidden xsHidden md={6}>
                                    <ControlLabel>Preview</ControlLabel>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: marked(this.state.content, {sanitize: true})
                                      }}
                                    />
                                  </Col>
                                : null
            }

          </FormGroup>
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

  let title = '',
      content = '';

  return {
    articleId: articleId
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: async (article) => {
      dispatch(startPostArticle());

      let result = await addPost(article);

      if (result.code === '1') {
        dispatch(successPostArticle());
      } else {
        dispatch(failPostArticle());
      }
    },
    updatePost: async (articleId, data) => {

      dispatch(startUpdateArticle())
      let result = await updateArticle(articleId, data);

      if (result.code === '1') {
        dispatch(successUpdateArticle())
      } else {
        dispatch(failUpdateArticle())
      }
    }
  }
}

export default redirect(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePostOrEdit)));
