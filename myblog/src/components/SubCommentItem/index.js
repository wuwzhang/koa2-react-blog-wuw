import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Avatar } from '../Avatar/index.js';

import './style.css';

const marked = require('marked');

class SubCommentItem extends Component {

  render() {

    let { reply } = this.props,
        user = reply.user;

    return (
      <section className='subCommentItem'>
        <ul className='subCommentItem-ul'>
          <li style={{width: '4%', marginRight: '5px', minWidth: '34px'}}>
            <Avatar avatarNum={user.avatar} width={'100%'}/>
          </li>
          <li style={{width: '94%'}}>
            <ul>
              <li>
                <p className='commentItem-username'>{ user.username }:&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </li>
              <li>
                {
                  reply.content ? <span
                                      className='commentItem-content'
                                      dangerouslySetInnerHTML={{
                                        __html: marked(reply.content, {sanitize: true})
                                      }}
                                    ></span>
                                  : null
                }
              </li>
            </ul>
            <ul>
              <li>{reply.created_at ? reply.created_at.slice(0, 10) : reply}</li>
              <li>
                <span className='commentItem-option-btn'>举报</span>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comment.articleComments
})

export default connect(mapStateToProps)(SubCommentItem);
