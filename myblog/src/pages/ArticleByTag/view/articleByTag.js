import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getArticlesByTag } from '../fetch.js'

class ArticleByTag extends Component {

  constructor(props) {
    super(props);

    this.state = {
      articles: []
    }
  }

  async componentDidMount() {

    let result = await getArticlesByTag(this.props.tagContent);

    if (result.code === '1') {
      let articles = result.articles;

      this.setState({
        articles: articles
      })
    } else {
      console.log(result);
    }
  }

  render() {

    let { articles } = this.state;

    return (
      <section>
        <h2>Articles By Tag</h2>
        <ul>
          {
            articles.map((article, index) => {
              return article? <ArticlTagItem
                                key = { index }
                                article = { article }
                              />
                            : null
            })
          }
        </ul>
      </section>
    );
  }
}

const ArticlTagItem = ({ article }) => {
  return (
    <li>
      <section>
        <h5>{ article.title }</h5>
        <div>
          <span>
          {
            article.tags.map((tag) => {
              return tag ? <span>{ tag }</span> : null
            })
          }
          </span>
          <span>{ article.updated_at.slice(0, 10) }</span>
        </div>
        <p>{ article.content } </p>
      </section>
    </li>
  );
}

const mapStateToProps = (state) => {
  let pathname = state.routing.location.pathname,
      tagContent = pathname.split('/')[2];

  return {
    tagContent: tagContent
  }
}

export default  withRouter(connect(mapStateToProps)(ArticleByTag));
