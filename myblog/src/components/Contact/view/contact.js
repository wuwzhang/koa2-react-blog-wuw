import React, { Component } from 'react';

import { view as FieldGroup } from '../components/FieldGroup';

import {
  FormGroup,
  Button,
  Form,
  Col
} from 'react-bootstrap';

class Contact extends Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      account: '',
      content: '',
      accountValid: 'success',
      contentValid: 'success'
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
      this.setState({
        accountValid: 'success',
        accountHelp: '账号可用'
      })
    }
  }

  _checkContent(value) {
    this.setState({
      contentValid: null,
      contentHelp: ''
    });

    if (value.length === 0) {
      this.setState({
        contentValid: 'error',
        contentHelp: '内容不为空'
      });
    } else {
      this.setState({
        contentValid: 'success'
      })
    }
  }

  async _contact() {

    const {
      account,
      content,
      accountValid,
      contentValid
    } = this.state;

    function _checkComplete() {

      return (accountValid === 'success'
              && contentValid === 'success');
    }

    if (_checkComplete()) {
      // this.props.loginUp({ account, content });
    }

  }

  render() {
    return (
      <Form>
        <FieldGroup
          autofocus
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
        <Col sm={12} md={12} xs={12}>
          <FormGroup
            validationState={this.state.contentValid}
          >

              <ControlLabel>Content</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder='Enter Content'
                onChange={(event)=>this.setState({content:event.target.value})}
                onBlur={(event)=>this._checkContent(event.target.value)}
                style={{ height: 800 }}
              />
              {this.state.contentHelp && <HelpBlock>{this.state.contentHelp}</HelpBlock>}
          </FormGroup>
        </Col>
        <FormGroup>
          <Col sm={4} md={5} xs={12}>
            <Button
              className='submit-btn'
              block
              onClick={()=>this._contact()}
            >
            <FormattedMessage
              id="Submit"
              defaultMessage="Submit"
            />
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default Contact;
