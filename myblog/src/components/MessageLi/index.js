import React, { Component } from 'react';

import MessageOptionNav from '../MessageOptionNav/messageOptionNav.js';

import {
  Row,
  Col
} from 'react-bootstrap';
import { Modal, Button } from 'antd';

import './style.css';

import { FormattedMessage } from 'react-intl';

class view extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }

    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  showModal() {
    this.setState({
      visible: true
    });
  }

  handleOk() {
    this.setState({
      visible: false
    });
  }

  handleCancel() {
    this.setState({
      visible: false
    });
  }

  render() {

    let { user, isChecked, content, id, create_time, index} = this.props;
    create_time = create_time.slice(0, 10);
    let subContent = content.length > 20 ? content.slice(0, 20) + '...'
                                  : content

    return (
      <section className="ArticleLi MessageLi">
        <Row>
          <li className="ArticleLi-li MessageLi-li" >
            <Col md={3}>
              <span>{ user }</span>
            </Col>
            <Col md={5}>
              <span className='subContent' onClick={this.showModal}>
                { subContent }
              </span>
            </Col>
            <Col md={2}>
              <span>{ create_time }</span>
            </Col>
            <Col md={2}>
              <MessageOptionNav
                id = { id }
                isChecked = { isChecked }
                index = { index }
                myStyle = { { color: '#FF7E67' } }
              />
            </Col>
          </li>
          <Modal
            title={ user }
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                <FormattedMessage
                  id='OK'
                  defaultMessage='OK'
                />
              </Button>
            ]}
          >
            <p>{ content }</p>
          </Modal>
        </Row>
      </section>
    );
  }
}

export { view };
