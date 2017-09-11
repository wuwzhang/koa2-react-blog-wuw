import React from 'react';

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
          tags.map((tag, index) => {
            return <li><span>{tag}</span></li>
          })
        }
      </ul>
    </section>
  );
}
