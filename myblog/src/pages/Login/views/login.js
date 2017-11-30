import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link  } from 'react-router-dom';
// import PreloaderLink from '../../../enhancers/PreloaderLink.js';

import { login, loginByGithub } from '../fetch';
import { view as FieldGroup } from '../../../components/FieldGroup';
import { view as TopMenu } from '../../../components/TopMenu/';
import { fetchs as commentFetch, actions as commentAction } from '../../../components/Comment/';
import { fetchs as messageFetch, actions as messageAction } from '../../../components/Contact/';
import { FormattedMessage } from 'react-intl';

import {
  startLogin,
  finishLogin,
  failLogin,
  loginFail,
  loginSuccess
} from '../action';

import {
  FormGroup,
  Button,
  Form,
  Grid,
  Col
} from 'react-bootstrap';
import { notification, message, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';

import './style.css';

class Login extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      account: '',
      password: '',
      loading: false,
      failMessage: ''
    }

    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._signInByGithub = this._signInByGithub.bind(this);
    let { fromPath } = this.props;
    let path = fromPath.state ? fromPath.state.from.pathname : '';
    if (path) {
      sessionStorage.setItem('fromPath', path);
    }
  }

  async _signIn() {
    const { account, password } = this.state;
    this.props.startLogin();

    let result = await login({account, password});

    if (result.code === '1') {
      this.props.successLogin(result.user, result.message);
      message.success('login success');

      if (result.token) {
        window.localStorage.setItem('token', result.token);
      }

      let res = await commentFetch.getNotCheckedComments();
      if (res.code === '1') {
        this.props.initNotCheckedComment(res.result)
      } else {

      }

      let res1 = await messageFetch.getNotCheckedMessages();
      if (res1.code === '1') {
        this.props.initNotCheckedMessage(res1.result);
      } else {

      }
    } else {
      this.props.failLogin(result.message)
      if (result.code === '-1') {
        this.setState({
          failMessage: '邮箱未确认'
        })
      } else {
        this.setState({
          failMessage: '用户名密码错误'
        })
      }

      notification.open({
        message: '登录失败',
        description: this.state.failMessage,
        icon: <Icon type="meh-o" style={{ color: '#ff7e67' }} />,
        style: {
          color: '#ff7e67',
          bacground: '#fafafa'
        }
      });
    }
  }

  async _signInByGithub(event) {
    event.preventDefault();

    let result = await loginByGithub();

    if (result.code === '1') {
      window.location.href = result.path;
    }

  }

  _handleKeyPress(event) {
    if(event.key === 'Enter'){
      this._signIn();
    }
  }

  _checkAccount(value) {
    this.setState({
      accountValid: null,
      accountHelp: ''
    });

    if (value.length < 6) {
      this.setState({
        accountValid: 'error',
        accountHelp: '账号长度至少大于6'
      });
    } else {
      this.setState({
        accountValid: 'success'
      })
    }
  }

  _checkPassword(value){

    this.setState({
      pwdValid:null,
      pwdHelp:''
    });

    if (value.length === 0) {
      this.setState({
        pwdValid:'error',
        pwdHelp:'密码不为空'
      });
    } else {
      this.setState({
        pwdValid:'success'
      })
    }
  }

  render() {
    let { user, fromPath, msgType } = this.props;

    if (msgType === 'success' && user && fromPath.state) {

      return <Redirect to={{
              pathname: fromPath.state.from.pathname
            }}/>
    }

    return (
      <section className='Login-Bg'>
        <section className='All-Nav'>
          <TopMenu />
        </section>
        <Grid>
          <section className='login-cover'>
            <Col className='login-container' md={4} xs={10} sm={3} mdOffset={4} smOffset={4}>
              <QueueAnim className="demo-content">
                <h2 key='a'>
                  <FormattedMessage
                    id="Login"
                    defaultMessage="Sign In"
                  />
                </h2>
                <Form key='b' horizontal>
                  <FieldGroup
                    type='email'
                    label='labelEmail'
                    labelColor='#07689f'
                    defaultMessage='Email'
                    ref={(input)=>this.email=input}
                    onBlur={(event)=>this._checkAccount(event.target.value)}
                    onChange={(event)=>this.setState({account:event.target.value})}
                    validationState={this.state.accountValid}
                    help={this.state.accountHelp}
                  />

                  <FieldGroup
                    type='password'
                    label='labelPassword'
                    labelColor='#07689f'
                    defaultMessage='Password'
                    onKeyPress={this._handleKeyPress}
                    onChange={(event)=>this.setState({password:event.target.value})}
                    onBlur={(event)=>this._checkPassword(event.target.value)}
                    validationState={this.state.pwdValid}
                    help={this.state.pwdHelp}
                  />
                  {/*
                    <FormGroup>
                      <Col sm={10}>
                        <Checkbox>Remember me</Checkbox>
                      </Col>
                    </FormGroup>
                  */}

                  <FormGroup>
                    <Col sm={4} md={5} xs={10}>
                      <Button
                        className='submit-btn'
                        block
                        onClick={()=>this._signIn()}
                      >
                        <FormattedMessage
                          id="Login"
                          defaultMessage="Sign In"
                        />
                      </Button>
                    </Col>
                  </FormGroup>
                  <Link onClick={this._signInByGithub} to="/login/github">
                    <Icon type='github' />
                  </Link>
                </Form>
              </QueueAnim>
            </Col>
          </section>
        </Grid>
      </section>
    )
  }
}


Login.propTypes = {
  user: PropTypes.object,
  startLogin: PropTypes.func,
  successLogin: PropTypes.func,
  failLogin: PropTypes.func
}


const mapStateToProps = (state)=> ({
  msgType: state.login.msgType,
  user: state.login.user,
  fromPath: state.routing.location
});

const mapDispatchToProps = (dispatch) => {
  return {
    startLogin: () => {
      dispatch(startLogin());
    },
    successLogin: (user, message) => {
      dispatch(finishLogin(user));
      dispatch(loginSuccess(message));
    },
    failLogin: (message) => {
      dispatch(failLogin(message));
      dispatch(loginFail(message));
    },
    initNotCheckedComment: (count) => {
      dispatch(commentAction.commentNotChecked(count))
    },
    initNotCheckedMessage: (count) => {
      dispatch(messageAction.messageNotChecked(count))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
