import React from "react";
import { Link } from "react-router-dom";

const TagItem = ({ content, ...resPorps }) => {
  return (
    <Link {...resPorps} to={`/article_by_catalog/${content}`}>
      {content}
    </Link>
  );
};

export default TagItem;
