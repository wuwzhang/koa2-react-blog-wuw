import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { view as FieldGroup } from '../../../components/FieldGroup';
import { register, checkAccount } from '../fetch';

// import redirect from '../../../components/Redirect';

import {
  FormGroup,
  Button,
  Form,
  Col
} from 'react-bootstrap';

import './style.css';

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

    // console.log(accountValid + ' ' + usernameValid + ' ' + passwordValid + ' ' + confirmPwdValid);
    // console.log(_checkComplete())
    if (_checkComplete()) {
      // console.log(account + ' ' + username + ' ' + password)
      const result = await register({ account, username, password });
      // console.log(result.code);
      if (result.code === '1') {
        // const pathname = '/login',
        // redirectState = {
        //   from: this.props.location
        // };

        // this.props.redirect(pathname, redirectState)
      }
    }

  }

  render() {
    return (
      <section>
        <Col className='register-container' md={8} xs={10} xsOffset={3} mdOffset={4}>
          <h2>Register</h2>
          <Form horizontal>
            <FieldGroup
              type='email'
              label='Account'
              placeholder="Enter Email"
              ref={(input)=>this.email=input}
              onChange={(event)=>this.setState({account: event.target.value})}
              onBlur={(event)=>this._checkAccount(event.target.value)}
              validationState={this.state.accountValid}
              help={this.state.accountHelp}
            />
            <FieldGroup
              type='text'
              label='Username'
              placeholder='Enter Username'
              onChange={(event)=>this.setState({username: event.target.value})}
              onBlur={(event)=>this._checkUsername(event.target.value)}
              validationState={this.state.usernameValid}
              help={this.state.usernameHelp}
            />
            <FieldGroup
              type='password'
              label='Password'
              placeholder='Enter Password'
              onChange={(event)=>this.setState({password: event.target.value})}
              onBlur={(event)=>this._checkPassword(event.target.value)}
              validationState={this.state.passwordValid}
              help={this.state.passwordHelp}
            />
            <FieldGroup
              type='password'
              label='Confirm password'
              placeholder='Enter password again'
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
              <Col sm={2}>
                <Button
                  block
                  onClick={()=>this._regist()}
                >Sign Up</Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </section>
    );
  }
}

// Register.propTypes = {}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginUp: async(user) => {
//       dispatch()
//     }
//   }
// }

export default withRouter(connect()(Register));
