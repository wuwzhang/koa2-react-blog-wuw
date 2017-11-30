import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
  ControlLabel,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Col
} from 'react-bootstrap';
import { notification, Avatar, Icon } from 'antd';

import './style.css';

import avatar1 from '../../../media/1.jpg';
import avatar2 from '../../../media/2.jpg';
import avatar3 from '../../../media/3.jpg';
import avatar4 from '../../../media/4.jpg';
import avatar5 from '../../../media/5.jpg';
// import avatar6 from '../../../media/6.jpg';

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
      avatarValue: 1,
      accountValid: null,
      usernameValid: null,
      passwordValid: null,
      confirmPwdValid: null
    }

    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleAvatar = this._handleAvatar.bind(this);
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

  _handleAvatar(avatarValue) {

    this.setState({
      avatarValue: avatarValue
    })
  }

  _checkEmail(email) {
    // console.log('checkEmail', email)
    function _getEmailAddr(suffixe) {

    if (suffixe === '163.com'){
      return 'mail.163.com';
    } else if (suffixe === 'vip.163.com'){
      return 'vip.163.com';
    } else if (suffixe === '126.com'){
      return 'mail.126.com';
    } else if (suffixe === 'qq.com' || suffixe === 'vip.qq.com' || suffixe === 'foxmail.com'){
      return 'mail.qq.com';
    } else if (suffixe === 'gmail.com'){
      return 'mail.google.com';
    } else if (suffixe === 'sohu.com'){
      return 'mail.sohu.com';
    } else if (suffixe === 'tom.com'){
      return 'mail.tom.com';
    } else if (suffixe === 'vip.sina.com'){
      return 'vip.sina.com';
    } else if (suffixe === 'sina.com.cn' || suffixe === 'sina.com'){
      return 'mail.sina.com.cn';
    } else if (suffixe === 'tom.com'){
      return 'mail.tom.com';
    } else if (suffixe === 'yahoo.com.cn' || suffixe === 'yahoo.cn'){
      return 'mail.cn.yahoo.com';
    } else if (suffixe === 'tom.com'){
      return 'mail.tom.com';
    } else if (suffixe === 'yeah.net'){
      return 'www.yeah.net';
    } else if (suffixe === '21cn.com'){
      return 'mail.21cn.com';
    } else if (suffixe === 'hotmail.com'){
      return 'www.hotmail.com';
    } else if (suffixe === 'sogou.com'){
      return 'mail.sogou.com';
    } else if (suffixe === '188.com'){
      return 'www.188.com';
    } else if (suffixe === '139.com'){
      return 'mail.10086.cn';
    } else if (suffixe === '189.cn'){
      return 'webmail15.189.cn/webmail';
    } else if (suffixe === 'wo.com.cn'){
      return 'mail.wo.com.cn/smsmail';
    } else if (suffixe === '139.com'){
      return 'mail.10086.cn';
    } else {
       return '';
    }
  }

    if (email) {
      let suffixe = email.split('@')[1],
          addr = _getEmailAddr(suffixe);

      window.location.href = 'https://' +  (addr ? addr : 'www.baidu.com')
    }
  }

  async _regist() {

    const {
      account,
      username,
      password,
      avatarValue,
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

      this.props.regist();

      let result = await register({
        account,
        username,
        password,
        avatarValue
      });

      if (result.code === '1') {
        this.props.registSuccess();

        const btn = (
          <Button
            className="submit-btn"
            onClick={()=>this._checkEmail(account)}
          >
            前往确认
          </Button>
        );

        notification.open({
          message: '邮箱确认',
          description: '前往相应邮箱确认，完成登录',
          btn,
          duration: null,
          icon: <Icon type="meh-o" style={{ color: '#A2D5F2' }} />,
          style: {
            color: '#ff7e67',
            bacground: '#fafafa'
          }
        });
      } else {
        this.props.registFaile(result.message)
      }
    }

  }

  _handleKeyPress(event) {
    if(event.key === 'Enter'){
      this._regist();
    }
  }

  render() {

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
                    <Col sm={12} md={12}>
                      <ControlLabel className='avatarLabel'>
                        <FormattedMessage
                          id="Avatar"
                          defaultMessage='Avatar'
                        />
                      </ControlLabel>
                    </Col>
                    <Col sm={12} md={12}>

                      <ButtonToolbar>
                        <ToggleButtonGroup
                          type="radio"
                          name="options"
                          value={this.state.avatarValue}
                          onChange={this._handleAvatar}
                        >
                          <ToggleButton value={1}>
                            <Avatar src={avatar1} />
                          </ToggleButton>
                          <ToggleButton value={2}>
                            <Avatar src={avatar2} />
                          </ToggleButton>
                          <ToggleButton value={3}>
                            <Avatar src={avatar3} />
                          </ToggleButton>
                          <ToggleButton value={4}>
                            <Avatar src={avatar4} />
                          </ToggleButton>
                          <ToggleButton value={5}>
                            <Avatar src={avatar5} />
                          </ToggleButton>
                          <ToggleButton value={6}>
                            <Avatar src={avatar5} />
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </ButtonToolbar>
                    </Col>
                  </FormGroup>
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
  regist: PropTypes.func
}

const mapStateToProps = (state)=> (
  state.register
);

const mapDispatchToProps = (dispatch) => {
  return {
    regist: async (data) => {
      dispatch(startRegist());
    },
    registSuccess: () => {
      dispatch(finishRegist());
      dispatch(registSuccess());
    },
    registFaile: (message) => {
      dispatch(faileRegist(message));
      dispatch(registFaile(message));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
