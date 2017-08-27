import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import redirect from '../../Redirect/'
import {
  fetchs as commentFetchs,
  actions as CommentAction
} from '../../Comment/';


import {
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';

class CommentInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      commentValid: null,
      commentHelp: ''
    }
  }

  _checkComment(value) {
    this.setState({
      commentValid: null,
      commentHelp: ''
    })

    if (value.length === 0) {
      this.setState({
        commentValid: 'error',
        commentHelp: '评论不为空'
      })
    } else {
      this.setState({
        commentValid: 'success'
      })
    }
  }

  async _addComment() {

    const { commentValid } = this.state;

    if (commentValid === 'success') {
      const { user } = this.props,
            { comment } = this.state,
            articleId = this.props.location.pathname.split('/')[2];

      const data = {
        userId: user._id,
        articleId: articleId,
        comment: comment
      }

      this.props.addComment(data);
    }
  }

  _login() {
    let pathname ='/login',
    redirectState = { from: this.props.location };
    redirect(pathname, redirectState)
  }
  render() {
    return (
      <Form>
        <FormGroup>
          <ControlLabel
            validationState={this.state.commentValid}
          >Comment</ControlLabel>
          <FormControl
            componentClass='textarea'
            placeholder='Enter Comment'
            onChange={(event)=>this.setState({comment:event.target.value})}
            onBlur={(event)=>this._checkComment(event.target.value)}
          />
          {this.state.commentHelp && <HelpBlock>{this.state.commentHelp}</HelpBlock>}
          {
            this.props.user ? <Button

                                onClick={()=>this._addComment()}
                              >submit</Button>
                            : <Button

                                onClick={()=>this._login()}
                              >login</Button>
          }
        </FormGroup>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.login.user,
  location: state.routing.location
})

/*
*result = {
* "code": "1",
* "message": "",
* "comment": {
*   "userId": {
*   },
*   "result": {
*   }
* }
*}
*
*/
const mapDispatchToProps = (dispatch) => {
  return {
    addComment: async (data) => {

      let result = await commentFetchs.addComment(data);

      if (result.code === '1') {
        let comment = result.comment;
        let commentDet = comment.result;
        dispatch(CommentAction.commentAdd({
          user: comment.user,
          articleId: commentDet.articleId,
          content: commentDet.content,
          create_at: commentDet.created_at
        }))
      } else {
        console.log(result.code);
      }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentInput))
