import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import { getTopPreviewArticle, getTopCommentsArticle } from '../fetch.js';
import { setCommentRank, setPreviewRank } from '../action.js';

import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import './style.css';

class Rank extends Component {

  constructor(props) {
    super(props);

    this.state = {
      topPreviewArticle: [],
      topCommentsArticle: []
    }

    this._getTopPreviewArticle = this._getTopPreviewArticle.bind(this);
    this._getTopCommentArticle = this._getTopCommentArticle.bind(this);
  }

  async _getTopPreviewArticle() {

    let result = await getTopPreviewArticle();

    if (result.code === '1') {
      let previewRank = result.result;

      this.setState({
        topPreviewArticle: previewRank
      })

      this.props.setTopPreviewArticle(previewRank)
    } else {

    }
  }

  async _getTopCommentArticle() {

    let result = await getTopCommentsArticle();

    if (result.code === '1') {
      let commentRank = result.result;

      this.setState({
        topCommentsArticle: commentRank
      })

      this.props.setTopCommentsArticle(commentRank);
    } else {

    }
  }

  async componentDidMount() {

    let { rank } = this.props;

    if (rank) {
      let { comment = [], preview = [] } = rank;

      if (comment.length === 0) {
        this._getTopPreviewArticle();
      } else {
        this.setState({
          topCommentsArticle: comment
        })
      }

      if (preview.length === 0) {
        this._getTopCommentArticle();
      } else {
        this.setState({
          topPreviewArticle: preview
        })
      }
    } else {

      this._getTopCommentArticle();
      this._getTopPreviewArticle();
    }
  }

  render() {

    let { topPreviewArticle = [], topCommentsArticle = [] } = this.state,
        { showCharNum = 12, style = {} } = this.props;

    return (
      <section className='articleDetails-rank' style={style}>
        <h5 className='ArticleDetails-Title'>
          <FontAwesome name='user-secret' style={{color: '#ff7e67', marginRight: '5px'}}/>
          <FormattedMessage
            id="Rank"
            defaultMessage="Rank"
          /> ~
        </h5>
        <section className='topPreview topRank'>
          <h6 className='ArticleDetails-sub-Title'>
            <FormattedMessage
              id="Preview"
              defaultMessage="Preview"
            />
          </h6>
          <ul>
            {
              topPreviewArticle.map((article) => {
                return  <Link
                          className='topRank-li'
                          to={`/article_details/${article._id}`}
                        >
                          <span>
                            {
                              article.title.length > showCharNum ? article.title.slice(0, showCharNum) + '...'
                                                                 : article.title
                            }
                          </span>
                          <span className='articleDetail-rank-count'> ({article.pv})</span>
                        </Link>
              })
            }
          </ul>
        </section>
        <section className='topComment topRank'>
          <h6 className='ArticleDetails-sub-Title'>
            <FormattedMessage
              id="Comment"
              defaultMessage="Comment"
            />
          </h6>
          <ul>
            {
              topCommentsArticle.map((article) => {
                return  <Link className='topRank-li'
                          to={`/article_details/${article._id}`}
                        >
                          <span>
                            {
                              article.title.length > showCharNum ? article.title.slice(0, showCharNum) + '...'
                                                                 : article.title
                            }
                          </span>
                          <span className='articleDetail-rank-count'>({article.commentCount})</span>
                        </Link>
              })
            }
          </ul>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  rank: state.rank
})

const mapDispatchToProps = (dispatch) => ({
  setTopPreviewArticle: (rank) => {
    dispatch(setPreviewRank(rank))
  },
  setTopCommentsArticle: (rank) => {
    dispatch(setCommentRank(rank))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Rank);

