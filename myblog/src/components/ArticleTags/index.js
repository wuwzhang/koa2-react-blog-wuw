import React from 'react';
import { Link } from 'react-router-dom';

export const ArticleTags = ({tags}) => {
  // console.log(tags);
  if (!tags) {
    tags = [];
  }
  return (
    <section>
      <h6>tags</h6>
      <ul>
        {
          tags.map((tag) => {
            return <Link to={ `/article_by_tag/${tag}` }><li> { tag } </li> </Link>
          })
        }
      </ul>
    </section>
  );
}
