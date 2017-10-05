import React from 'react';
import { Link } from 'react-router-dom';

import TagItem from '../TagItem/index.js';

import './style.css';

const view = ({ article, ind }) => {
  return (
    <li key={ind} >
      <section className="ArticleItem">
        <Link to={`/article_details/${article._id}`}><h5 className="ArticleItem-title">{ article.title }</h5></Link>
        <div>
          <span className="ArticleItem-time">{ article.updated_at.slice(0, 10) }</span>
          <span className="ArticleItem-catalog">{ article.catalog }</span>
        </div>
        <p className="ArticleItem-content">{ article.content ? article.content.slice(0, 120) : '' }... </p>
        <div>
          <ul>
            {
              article.tags.map((item, index) => {
                return item ? <TagItem
                                key = { index }
                                content = { item }
                              />
                            : null
              })
            }
          </ul>
        </div>
      </section>
    </li>
  );
}

export { view };
