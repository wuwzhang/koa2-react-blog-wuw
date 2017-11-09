import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import qs from 'qs';

import { view as FieldGroup } from '../../../components/FieldGroup';
import { view as TopMenu } from '../../../components/TopMenu/';

import { register, checkAccount } from '../fetch';
import {
  startRegist,
  registSuccess,
  registFaile,
  finishRegist,
  faileRegist
} from '../action';

import QueueAnim from 'rc-queue-anim';

import {
  FormGroup,
  Button,
  Form,
  Grid,
  Col
} from 'react-bootstrap';
import { Alert } from 'antd';

import './style.css';

import { FormattedMessage } from 'react-intl';

class Register extends Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      account: '',
      password: '',
      confirmPwd: '',
      username: '',
      porfile: '',
      accountValid: null,
      usernameValid: null,
      passwordValid: null,
      confirmPwdValid: null
    }

    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  async _checkAccount(value) {
    this.setState({
      accountValid: null,
      accountHelp: ''
    });

    function _isEmail(str) {
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      return reg.test(str);
    }

    if (value.length < 6) {
      this.setState({
        accountValid: 'error',
        accountHelp: '账号长度至少大于6'
      });
    } else if(!_isEmail(value)){
      this.setState({
        accountValid: 'error',
        accountHelp: '不是合法的邮箱地址'
      });
    } else {
      let result = await checkAccount(value);
      if (result.code === '1') {
        this.setState({
          accountValid: 'success',
          accountHelp: '账号可用'
        })
      } else {
        this.setState({
          accountValid: 'error',
          accountHelp: '账号已被占用'
        })
      }
    }
  }

  _checkUsername(value) {

    this.setState({
      usernameValid: null,
      usernameHelp: ''
    });

    if (value.length < 3) {
      this.setState({
        usernameValid: 'error',
        usernameHelp: '用户名长度不得小于3'
      })
    } else {
      this.setState({
        usernameValid: 'success'
      })
    }
  }

  _checkPassword(value) {

    this.setState({
      passwordValid: null,
      passwordHelp: ''
    });

    if (value.length < 8) {
      this.setState({
        passwordValid: 'error',
        passwordHelp: '密码长度不得小于8位'
      })
    } else {
      this.setState({
        passwordValid: 'success'
      })
    }
  }

  _checkConfirmPwd(value) {
    this.setState({
      confirmPwdValid: null,
      confirmPwdHelp: ''
    });

    if (value.length < 8 || this.state.password !== value) {
      this.setState({
        confirmPwdValid: 'error',
        confirmPwdHelp: '确认密码不相同'
      })
    } else {
      this.setState({
        confirmPwdValid: 'success'
      })
    }
  }

  async _regist() {

    const {
      account,
      username,
      password,
      accountValid,
      usernameValid,
      passwordValid,
      confirmPwdValid
    } = this.state;

    function _checkComplete() {

      return (accountValid === 'success'
              && usernameValid === 'success'
              && passwordValid === 'success'
              && confirmPwdValid === 'success');
    }

    if (_checkComplete()) {
      this.props.loginUp({ account, username, password });
    }

  }

  _handleKeyPress(event) {
    if(event.key === 'Enter'){
      this._regist();
    }
  }

  render() {
    let { msgType } = this.props;

    return (
      <section className='Regist-Bg'>
        <section className='All-Nav'>
          <TopMenu />
        </section>
        <Grid>
          <section>
            <Col className='register-container' md={4} xs={10} sm={4} mdOffset={4} smOffset={4}>
              <QueueAnim className="demo-content">
                <h2 key="a">
                  <FormattedMessage
                    id="Regist"
                    defaultMessage="Sign Up"
                  />
                </h2>
                <Form key="b" horizontal>
                  <FieldGroup
                    autoFocus
                    type='email'
                    label='labelEmail'
                    defaultMessage= 'Email'
                    labelColor='#07689f'
                    ref={(input)=>this.email=input}
                    onChange={(event)=>this.setState({account: event.target.value})}
                    onBlur={(event)=>this._checkAccount(event.target.value)}
                    validationState={this.state.accountValid}
                    help={this.state.accountHelp}
                  />
                  <FieldGroup
                    type='text'
                    label='labelUserName'
                    labelColor='#07689f'
                    defaultMessage='User Name'
                    onChange={(event)=>this.setState({username: event.target.value})}
                    onBlur={(event)=>this._checkUsername(event.target.value)}
                    validationState={this.state.usernameValid}
                    help={this.state.usernameHelp}
                  />
                  <FieldGroup
                    type='password'
                    label='labelPassword'
                    labelColor='#07689f'
                    defaultMessage='Password'
                    onChange={(event)=>this.setState({password: event.target.value})}
                    onBlur={(event)=>this._checkPassword(event.target.value)}
                    validationState={this.state.passwordValid}
                    help={this.state.passwordHelp}
                  />
                  <FieldGroup
                    type='password'
                    label='labelComfirmPassword'
                    labelColor='#07689f'
                    defaultMessage='Comfirm Password'
                    onKeyPress={this._handleKeyPress}
                    onChange={(event)=>this.setState({confirmPwd: event.target.value})}
                    onBlur={(event)=>this._checkConfirmPwd(event.target.value)}
                    validationState={this.state.confirmPwdValid}
                    help={this.state.confirmPwdHelp}
                  />

                  {/*
                    <FormGroup>
                      <Col sm={12}>
                        <ControlLabel>Upload display photo</ControlLabel>
                        <Button
                          bsClass='btn-upload'
                        >Upload</Button>
                      </Col>
                    </FormGroup>
                  */}
                  <FormGroup>
                    <Col sm={4} md={5} xs={10}>
                      <Button
                        className='submit-btn'
                        block
                        onClick={()=>this._regist()}
                      >
                      <FormattedMessage
                        id="Regist"
                        defaultMessage="Sign Up"
                      />
                      </Button>
                    </Col>
                  </FormGroup>
                  {
                    msgType === 'warning' ? <Alert className="myAlert registAlert" message="注册失败" type="warning" showIcon closable/> : null
                  }
                  {
                    msgType === 'success' ? <Alert className="myAlert registAlert" message="在相应邮箱确认" type="success" showIcon closable/> : null
                  }
                </Form>
              </QueueAnim>
            </Col>
          </section>
        </Grid>
      </section>
    );
  }
}

Register.propTypes = {
  loginUp: PropTypes.func
}

const mapStateToProps = (state)=> (
  state.register
);

const mapDispatchToProps = (dispatch) => {
  return {
    loginUp: async (data) => {
      dispatch(startRegist());

      let result = await register(data);

      if (result.code === '1') {
        dispatch(finishRegist());
        dispatch(registSuccess());
      } else {
        dispatch(faileRegist(result.message));
        dispatch(registFaile(result.message));
      }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
