import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import { login } from '../fetch';
import { view as FieldGroup } from '../../../components/FieldGroup';
import {
  startLogin,
  finishLogin,
  failLogin
} from '../action';

import {
  FormGroup,
  Button,
  Form,
  Col
} from 'react-bootstrap';

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
    await this.props.loginIn({account, password});
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

    if (value.length < 8) {
      this.setState({
        pwdValid:'error',
        pwdHelp:'密码长度需要大于8位'
      });
    } else {
      this.setState({
        pwdValid:'success'
      })
    }
  }

  render() {
    let { user } = this.props;
    if (user) {
      return (
        <Redirect
          to = {{
            pathname: '/home'
          }}
        />
      );
    }

    return (
      <section >
        <Col className='login-container' md={8} xs={10} xsOffset={3} mdOffset={4}>
          <h2>Sign In</h2>
          <Form horizontal>
            <FieldGroup
              type='email'
              label='Email Address'
              placeholder='Email'
              ref={(input)=>this.email=input}
              onBlur={(event)=>this._checkAccount(event.target.value)}
              onChange={(event)=>this.setState({account:event.target.value})}
              validationState={this.state.accountValid}
              help={this.state.accountHelp}
            />

            <FieldGroup
              type='password'
              label='Password Address'
              placeholder='Password'
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
              <Col sm={2}>
                <Button
                  block
                  onClick={()=>this._signIn()}
                >Sign in</Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </section>
    )
  }
}

// function FieldGroup({label, help, validationState, ...props}) {
//   return (
//     <FormGroup
//       validationState={validationState}
//     >
//       <Col sm={12}>
//         <ControlLabel>{label}</ControlLabel>
//       </Col>
//       <Col sm={6}>
//         <FormControl {...props} />
//       </Col>
//       <Col sm={12}>
//         {help && <HelpBlock>{help}</HelpBlock>}
//       </Col>

//     </FormGroup>
//   );
// }


Login.propTypes = {
  user: PropTypes.object,
  loginIn: PropTypes.func
}


const mapStateToProps = (state)=> (
  state.login
);

const mapDispatchToProps = (dispatch) => {
  return {
    loginIn: async(user) => {
      dispatch(startLogin());

      let result = await login(user);

      if (result.code === '1') {
        dispatch(finishLogin(user));
      } else {
        dispatch(failLogin());
      }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
