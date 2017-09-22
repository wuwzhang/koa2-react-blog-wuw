import React from 'react';
import ArticleTags from '../ArticleTags/index.js';
import { ArticleTime } from '../ArticleTime/index.js';
import { ArticleCatalog } from '../ArticleCatalog/index.js';
import { view as TagsCloud } from '../TagsCloud/';
import { view as SearchBox } from '../ArticleSearch/';
import './style.css';

export const Aside = ({tags, color, create_time, catalog, update_time }) => {
  return (
    <section className="aside">
      <div>
        <SearchBox />
        <ArticleTime
          color = { color }
          create_time = { create_time }
          update_time = { update_time }
        />
        <ArticleTags
          color = { color }
          tags = {tags}
        />
        <ArticleCatalog
          color = { color }
          catalog = { catalog }
        />
        <TagsCloud />
      </div>
    </section>
  );
}
