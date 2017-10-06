import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchs as messageFetch, actions as messageAction } from '../Contact/'

import { Popconfirm, message } from 'antd';

import { FormattedMessage } from 'react-intl';

class MessageOptionNav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      alertVisble: false
    }

    this._deleteMessage = this._deleteMessage.bind(this);
    this._checkMessage = this._checkMessage.bind(this);

    this.cancelDelete = this.cancelDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.cancelCheck = this.cancelCheck.bind(this);
    this.confirmCheck = this.confirmCheck.bind(this);

  }

  async _deleteMessage(event) {
    event.preventDefault();

    let result = await messageFetch.deleteMessage(this.props.id);

    if (result.code === '1') {
      this.props.deleteMessage(this.props.index, this.props.isChecked);
      message.success('Delete the message');
    } else {
      message.error('Failure');
    }
  }

  async _checkMessage(event) {
    event.preventDefault();

    let result = await messageFetch.changeMessageCheck(this.props.id);

    if (result.code === '1') {
      this.props.setMessageChecked(this.props.index);
      message.success('Checked the message');
    } else {
      message.error('Failure');
    }
  }

  confirmDelete (e) {
    e.preventDefault();
    this._deleteMessage(e);
  }

  cancelDelete (e) {
    e.preventDefault();
    message.error('Cancle delete');
  }

  confirmCheck (e) {
    e.preventDefault();
    this._checkMessage(e);
  }

  cancelCheck (e) {
    e.preventDefault();
    message.error('Cancle check');
  }

  render() {

    let { myStyle = {color: '#FF7E67'}, isChecked } = this.props;

    return (
      <nav className="article-option-nav">
        <ul>
          <li>
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={this.confirmDelete}
              onCancel={this.cancelDelete}
              okText="Yes"
              cancelText="No"
            >
              <span style = { myStyle }>
                  <FormattedMessage
                    id="Delete"
                    defaultMessage="Delete"
                  />
              </span>
            </Popconfirm>
          </li>
          <li>
            {
              isChecked ? <span className='comment-checked'>
                              <FormattedMessage
                                id="Checked"
                                defaultMessage="Checked"
                              />
                          </span>
                        : <span>
                            <Popconfirm
                              title="Are you sure checked this task?"
                              onConfirm={this.confirmCheck}
                              onCancel={this.cancelCheck}
                              okText="Yes"
                              cancelText="No"
                            >
                              <span style = { myStyle }>
                                <FormattedMessage
                                  id="Check"
                                  defaultMessage="Check"
                                />
                              </span>
                            </Popconfirm>
                          </span>
            }
          </li>
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMessage: (index, checked) => {
      dispatch(messageAction.messageDelete(index, checked));
    },
    setMessageChecked: (index) => {
      dispatch(messageAction.messageChecked(index));
    }
  }
}

export default connect(null, mapDispatchToProps)(MessageOptionNav);
