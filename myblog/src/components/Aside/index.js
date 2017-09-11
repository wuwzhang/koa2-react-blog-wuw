import React from 'react';
import KeepOnFile from '../KeepOnFile/index.js';
import { ArticleTags } from '../ArticleTags/index.js';
import { view as TagsCloud } from '../TagsCloud/';
import './style.css';

export const Aside = ({tags}) => {
  return (
    <section className="aside">
      <div>
        <h5>Aside</h5>
        <KeepOnFile />
        <ArticleTags
          tags = {tags}
        />
        <TagsCloud />
      </div>
    </section>
  );
}
