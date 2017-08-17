import React from 'react';
var marked = require('marked');

const Home = () => {

  var markdownString = '```js\n console.log("hello"); \n```';
  return (
    <div>
      <h2>Home</h2>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: marked(markdownString, {sanitize: true})
        }}
      />
    </div>
  );
};

export default Home;
