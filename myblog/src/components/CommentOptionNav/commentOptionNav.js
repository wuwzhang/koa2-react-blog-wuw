import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchs as commentFetch, actions as commentAction } from '../Comment/'

import { Popconfirm, message } from 'antd';

import './style.css';

import { FormattedMessage } from 'react-intl';

class CommentOptionNav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      alertVisble: false
    }

    this._deleteComment = this._deleteComment.bind(this);
    this._checkComment = this._checkComment.bind(this);

    this.cancelDelete = this.cancelDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.cancelCheck = this.cancelCheck.bind(this);
    this.confirmCheck = this.confirmCheck.bind(this);

  }

  async _deleteComment(event) {
    event.preventDefault();

    let result = await commentFetch.deleteComment(this.props.id, this.props.articleId);

    if (result.code === '1') {
      this.props.deleteComment(this.props.index, this.props.isChecked);
      message.success('Delete the comment');
    } else {
      message.error('Fail');
    }
  }

  async _checkComment(event) {
    event.preventDefault();

    let result = await commentFetch.changeCommentCheck(this.props.id);

    if (result.code === '1') {
      this.props.setCommentChecked(this.props.index);
      message.success('Checked the comment');
    } else {
      message.error('Failure');
    }
  }

  confirmDelete (e) {
    this._deleteComment(e);
  }

  cancelDelete () {
    message.error('Cancle delete');
  }

  confirmCheck (e) {
    this._checkComment(e);
  }

  cancelCheck () {
    message.error('Cancle check');
  }

  render() {

    let { myStyle = {color: '#07689F'}, isChecked } = this.props;

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
    deleteComment: (index, checked) => {
      dispatch(commentAction.commentDelete(index, checked));
    },
    setCommentChecked: (index) => {
      dispatch(commentAction.commentChecked(index));
    }
  }
}

export default connect(null, mapDispatchToProps)(CommentOptionNav);
