import React, { Component } from 'react';
import {
  toggleComments,
  toggleArticlePublic
} from './fetch.js';

import './style.css';

class ArticleListOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isToggleCommentsOn: this.props.isComment,
      isToggleArticlePublic: this.props.isPublic
    }

  }

  /**
   * 控制是否发放评论
   * true 为开放
   */
  async handleToggleComments(id, e) {
    e.preventDefault();
    let result = await toggleComments(id, !this.state.isToggleCommentsOn);

    if (result.code === '1') {
      this.setState(prevState => ({
        isToggleCommentsOn: !prevState.isToggleCommentsOn
      }))
    } else {
      console.log(result);
    }
  }

  /**
   * 控制是否公开文章
   * true 为公开
   */
  async handleToggleArticlePublic(id, e) {
    e.preventDefault();
    let result = await toggleArticlePublic(id, !this.state.isToggleArticlePublic);

    if (result.code === '1') {
      this.setState(prevState => ({
        isToggleArticlePublic: !prevState.isToggleArticlePublic
      }))
    } else {
      console.log(result)
    }
  }

  render() {

    let { id, color='#07689F' } = this.props;
    let { isToggleArticlePublic, isToggleCommentsOn } = this.state;

    return (
      <section className="ArticleListOption">
        <ul>
          <li style={{color: color, width: '30px'}}>
            <button onClick={this.handleToggleComments.bind(this, id)}>
              { isToggleCommentsOn ? 'ON' : 'OFF' }
            </button>
          </li>
          <li style={{color: color, width: '45px'}}>
            <button onClick={this.handleToggleArticlePublic.bind(this, id) }>
              { isToggleArticlePublic ? 'Public' : 'HIDDEN' }
            </button>
          </li>
        </ul>
      </section>
    );
  }
}

export default ArticleListOption;
