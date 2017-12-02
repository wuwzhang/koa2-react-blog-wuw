import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import { Avatar } from '../../Avatar/index.js';

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
import './style.css';

import { FormattedMessage } from 'react-intl';

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

    console.log('subCommentInput - userId', user._id)
    console.log('subCommentInput - parentId', parentId)

    let result = await commentFetchs.addSubComment(data);

    if (result.code === '1') {

      this.props.successComment({
          subComment: {
            user: user,
            content: subComment,
            created_at: result.created_at,
            isRePort: false
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

  _login(e) {
    e.preventDefault();
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
    if (pathname && redirectState) {
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
                                    >
                                      <FormattedMessage
                                        id="Submit"
                                        defaultMessage="Submit"
                                      />
                                    </Button>
                                  : <Button
                                      className="submit-btn subComment-btn"
                                      onClick={(e)=>this._login(e)}
                                    >
                                      <FormattedMessage
                                        id="Login"
                                        defaultMessage="Login"
                                      />
                                    </Button>
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
