import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getArticlesByCatalog } from '../fetch.js'
import { view as ArticlCatalogItem } from '../../../components/ArticleItem/';

class ArticleByCatalog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      articles: []
    }
  }

  async componentDidMount() {

    let result = await getArticlesByCatalog(this.props.catalogCotent);

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
        <h2>Articles By Catalog</h2>
        <ul>
          {
            articles.map((article, index) => {
              return article? <ArticlCatalogItem
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

// const ArticlCatalogItem = ({ article }) => {
//   return (
//     <li>
//       <section>
//         <h5>{ article.title }</h5>
//         <div>
//           <span>
//           {
//             article.tags.map((tag) => {
//               return tag ? <span>{ tag }</span> : null
//             })
//           }
//           </span>
//           <span>{ article.updated_at.slice(0, 10) }</span>
//           <span>{ article.catalog }</span>
//         </div>
//         <p>{ article.content ? article.content.slice(0, 120) : '' } </p>
//       </section>
//     </li>
//   );
// }

const mapStateToProps = (state) => {
  let pathname = state.routing.location.pathname,
      catalogCotent = pathname.split('/')[2];

  return {
    catalogCotent: catalogCotent
  }
}

export default  withRouter(connect(mapStateToProps)(ArticleByCatalog));
