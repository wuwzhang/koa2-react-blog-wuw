import React from 'react';
import { Link } from 'react-router-dom';

const Article = () => {
  return(
    <section>
      <h2>Article</h2>
      <ul>
        <li><Link to='/article_list'>List</Link></li>
        <li><Link to='/article_post'>POST</Link></li>
      </ul>
    </section>
  );
}

export default Article;
