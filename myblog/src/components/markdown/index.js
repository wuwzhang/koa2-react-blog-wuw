import React from 'react';
import marked from 'marked';

const view = ({markdownString}) => {
 return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(markdownString, {sanitize: true})
      }}
    />
  );
}
export { view }
