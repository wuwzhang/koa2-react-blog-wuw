import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const SummaryView = ({ article }) => {
  return(
    <Link to={`/article_details/${ article.id }`}>
      <div className="KeepOnFile-hover">
        <ul  className="keepOnFile-item">
          <li>{ article.created_at.slice(0, 10) }</li>
          <li>{ article.title }</li>
          <li className="keepOnFileItem-catalog">{ article.catalog }</li>
        </ul>
        <p> { article.content ? article.content.slice(0, 150) : article.content }</p>
      </div>
    </Link>
  );
}

const CatalogView = ({ article }) => {
  return(
    <Link to={`/article_details/${ article.id }`}>
      <div className="KeepOnFile-hover">
        <ul className="keepOnFile-item">
          <li>{ article.created_at.slice(0, 10) }</li>
          <li>{ article.title }</li>
        </ul>
      </div>
    </Link>
  );
}

const view = ({ article, catalogView }) => {

  let created_time = article._id,
      date = created_time.year + ' - ' + created_time.month,
      articles = article.articles;

  return (
    <section>
      <h3 className="keepOnFile-date"><span>{ date }</span></h3>
      {
        articles.map((article) => {

          return article? (catalogView ? <CatalogView article={ article } />
                                       : <SummaryView article={ article } />
                          )
                        : null
        })
      }
    </section>
  );
}

export { view };
