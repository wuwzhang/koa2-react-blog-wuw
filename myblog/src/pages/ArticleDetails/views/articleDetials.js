import React, { Component } from 'react';
import { connect } from 'react-redux';
import { detailArticle } from '../fetch';

import { articleInitDetails } from '../action.js';

const marked = require('marked');

// import {
//   Col,
//   Row
// } from 'react-bootstrap';

class ArticleDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    (async function () {
      let articleId = this.props.match.params.articleId;
      await this.props.getDetails(articleId);
    }.bind(this))()
  }

  render() {
    let { article } = this.props;
    return(
      <section>
        <h2>Article details</h2>
        <h3>{ article.title }</h3>
        {
          article.content ? <div
                              className="content"
                              dangerouslySetInnerHTML={{
                                __html: marked(article.content, {sanitize: true})
                              }}
                            />
                          : null
        }
        {
          article.updated_at ? <div>{ article.updated_at.slice(0, 10) }</div>
                             : null
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('state');
  // console.log(state.articleDetails.article)
  return {
    article: state.articleDetails.article
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetails: async (articleId) => {
      let result = await detailArticle(articleId)

      if (result.code === '1') {
        // console.log('-----article details-----')
        // console.log(result.article);

        dispatch(articleInitDetails({
          article: result.article
        }))
      } else {
        console.log(result);
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetails);
