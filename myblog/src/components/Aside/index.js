import React from 'react';
import ArticleTags from '../ArticleTags/index.js';
import { ArticleTime } from '../ArticleTime/index.js';
import { view as TagsCloud } from '../TagsCloud/';
import './style.css';

export const Aside = ({tags, create_time, update_time }) => {
  return (
    <section className="aside">
      <div>
        <ArticleTime
          create_time = { create_time }
          update_time = { update_time }
        />
        <ArticleTags
          tags = {tags}
        />
        <TagsCloud />
      </div>
    </section>
  );
}
