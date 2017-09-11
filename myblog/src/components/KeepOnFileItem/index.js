import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const view = ({article}) => {
  console.log(article);
  let created_time = article._id,
      date = created_time.year + '/ ' + created_time.month,
      articles = article.articles;

  return (
    <li>
      <h3>{ date }</h3>
      {
        articles.map((article) => {

          return article? <Link to={`/article_details/${ article.id }`}>
                            <ul className="keepOnFile-item">
                              <li>{ article.title }</li>
                              <li>{ article.created_at.slice(0, 10) }</li>
                            </ul>
                          </Link>
                        : null
        })
      }
    </li>
  );
}

export { view };
