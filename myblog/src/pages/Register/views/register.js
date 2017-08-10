import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { register } from '../fetch';

import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
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
      confirmPwd: ''
    }

  }

  async _regist() {

    const { account, username, password } = this.state;
    await register({ account, username, password });

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
              onChange={(event)=>this.setState({account: event.target.value})}
            />
            <FieldGroup
              type='text'
              label='Username'
              placeholder='Enter Username'
              onChange={(event)=>this.setState({username: event.target.value})}
            />
            <FieldGroup
              type='password'
              label='Password'
              placeholder='Enter Password'
              onChange={(event)=>this.setState({password: event.target.value})}
            />
            <FieldGroup
              type='password'
              label='Confirm password'
              placeholder='Enter password again'
            />

            <FormGroup>
              <Col sm={12}>
                <ControlLabel>Upload display photo</ControlLabel>
                <Button
                  bsClass='btn-upload'
                >Upload</Button>
              </Col>
            </FormGroup>
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

function FieldGroup({label, help, validationState, ...props}) {
  return (
    <FormGroup
      validationState={validationState}
    >
      <Col sm={12}>
        <ControlLabel>{label}</ControlLabel>
      </Col>
      <Col sm={6}>
        <FormControl {...props} />
      </Col>
      <Col sm={12}>
        {help && <HelpBlock>{help}</HelpBlock>}
      </Col>

    </FormGroup>
  );
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginUp: async(user) => {
//       dispatch()
//     }
//   }
// }

export default withRouter(connect()(Register));
