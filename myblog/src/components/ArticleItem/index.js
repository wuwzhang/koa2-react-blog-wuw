import React from 'react';
import './style.css';

const view = ({ article }) => {
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
          <span>{ article.catalog }</span>
        </div>
        <p>{ article.content ? article.content.slice(0, 120) : '' } </p>
      </section>
    </li>
  );
}

export { view };
