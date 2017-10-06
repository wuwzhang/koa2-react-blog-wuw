import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { login } from '../fetch';
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
import { Alert } from 'antd';
import QueueAnim from 'rc-queue-anim';

import './style.css';

class Login extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      account: '',
      password: '',
      loading: false
    }
  }

  async _signIn() {
    const { account, password } = this.state;
    // await this.props.loginIn({account, password});
    this.props.startLogin();
    let result = await login({account, password});

    if (result.code === '1') {
      this.props.successLogin(result.user, result.message);

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
    let { user, msgType } = this.props;

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
                    autoFocus
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

                  {
                    msgType === 'warning' ? <Alert className="myAlert registAlert" message="用户名或密码错误" type="warning" showIcon closable/>
                                          : null
                  }
                  {
                    msgType === 'success' ? <Alert className="myAlert registAlert" message="登录成功" type="success" showIcon closable/>
                                          : null
                  }
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


const mapStateToProps = (state)=> (
  state.login
);

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
