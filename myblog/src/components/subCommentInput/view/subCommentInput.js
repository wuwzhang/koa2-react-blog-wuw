import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import {
  fetchs as commentFetchs,
  actions as commentAction
} from '../../Comment/';

import {
  Form,
  FormGroup,
  FormControl,
  Button,
  Row,
  Col
} from 'react-bootstrap';
// import { Avatar } from 'antd';
import { Avatar } from '../../Avatar/index.js';
import './style.css';

class SubCommentInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      subComment: '',
      pathname: null,
      redirectState: null
    }
  }

  async _addSubComment() {
    let { parentId, user, commentIndex } = this.props,
        { subComment } = this.state;

    const data = {
      parentId: parentId,
      subComment: subComment,
      userId: user._id
    }

    let result = await commentFetchs.addSubComment(data);

    if (result.code === '1') {

      this.props.successComment({
          subComment: {
            user: user,
            content: subComment,
            created_at: result.created_at,
            thumbsUp: 0
          },
          commentIndex: commentIndex
        },{
          state: false,
          commentIndex: commentIndex
        }
      );

    } else {

    }
  }

  _login() {
    let pathname ='/login',
        redirectState = { from: this.props.location };

    this.setState({
      pathname: pathname,
      redirectState: redirectState
    })
  }

  render() {

    let { pathname, redirectState } = this.state,
        { user } = this.props;
    if (pathname) {
      return <Redirect to={{
              pathname: pathname,
              state: redirectState
            }}/>
    }

    return(
      <section className='subCommentInput'>
        <Form>
          <FormGroup>
            <Row>
              <Col md={1}>
                {
                  this.props.user ? <Avatar avatarNum={ user.avatar } /> : 'Comment：'
                }
              </Col>
              <Col md={10}>
                <FormControl
                  componentClass='textarea'
                  placeholder='Enter Comment'
                  onChange={(event)=>this.setState({subComment:event.target.value})}
                />
              </Col>
              <Col md={1}>
                {
                  this.props.user ? <Button
                                      className="submit-btn subComment-btn"
                                      onClick={()=>this._addSubComment()}
                                    >submit</Button>
                                  : <Button
                                      className="submit-btn subComment-btn"
                                      onClick={()=>this._login()}
                                    >login</Button>
                }
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    location: state.routing.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    successComment: (addSubData, replyState) => {
      dispatch(commentAction.setIsShowReply(replyState));
      dispatch(commentAction.addSubComment(addSubData));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubCommentInput))