import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { view as FieldGroup } from '../../../components/FieldGroup';

import { addPost } from '../fetch';
import {
  startPostArticle,
  successPostArticle,
  failPostArticle
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

class ArticlePostOrEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      content: '',
      mode: 1
    }
  }

  _checkTitle(value) {
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

  }

  async _updateArticle() {

  }

  render() {
    return(
      <section>
        <h2>Article Edit</h2>
        <Form horizontal>
          <FieldGroup
            type='text'
            label='Title'
            placeholder='Enter title'
            onChange={(event)=>this.setState({title:event.target.value})}
            onBlur={(event)=>this._checkTitle(event.target.value)}
            validationState={this.state.titleValid}
            help={this.state.titleHelp}
          />
          <FormGroup
            validationState={this.state.contentValid}
          >
            <Col sm={12} md={8}>
              <ControlLabel>Content</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder='Enter Content'
                onChange={(event)=>this.setState({content:event.target.value})}
                onBlur={(event)=>this._checkContent(event.target.value)}
                style={{height: 500}}
              />
              {this.state.contentHelp && <HelpBlock>{this.state.contentHelp}</HelpBlock>}
            </Col>
          </FormGroup>
          <Col sm={12} md={2} mdOffset={7}>
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
  posts: PropTypes.func
};

const mapStateToProps = (state) => (
  {

  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    posts: async(article) => {
      dispatch(startPostArticle());

      let result = await addPost(article);

      if (result.code === '1') {
        dispatch(successPostArticle());
      } else {
        dispatch(failPostArticle());
      }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticlePostOrEdit));
