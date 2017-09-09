import React from 'react';
import KeepOnFile from '../KeepOnFile/index.js';
import { ArticleTags } from '../ArticleTags/index.js';

export const Aside = ({tags}) => {
  return (
    <section>
      <div>
        <h5>Aside</h5>
        <KeepOnFile />
        <ArticleTags
          tags = {tags}
        />
      </div>
    </section>
  );
}
