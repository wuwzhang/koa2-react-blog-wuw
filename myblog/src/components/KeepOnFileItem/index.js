import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

const SummaryView = ({ article }) => {
  let { catalog = [] } = article;
  return (
    <Link to={`/article_details/${article.id}`}>
      <div className="KeepOnFile-hover">
        <ul className="keepOnFile-item">
          <li>{article.created_at.slice(0, 10)}</li>
          <li>{article.title}</li>
          <li className="keepOnFileItem-catalog">
            {catalog.map(catalog => {
              return <span>{catalog}&nbsp;&nbsp;</span>;
            })}
          </li>
        </ul>
        <p>
          {" "}
          {article.content ? article.content.slice(0, 150) : article.content}
        </p>
      </div>
    </Link>
  );
};

const CatalogView = ({ article }) => {
  return (
    <Link to={`/article_details/${article.id}`}>
      <div className="KeepOnFile-hover">
        <ul className="keepOnFile-item">
          <li>{article.created_at.slice(0, 10)}</li>
          <li>{article.title}</li>
        </ul>
      </div>
    </Link>
  );
};

const view = ({ article, catalogView }) => {
  let created_time = article._id,
    date = created_time.year + " - " + created_time.month,
    articles = article.articles;

  return (
    <section>
      <h3 className="keepOnFile-date">
        <span>{date}</span>
      </h3>
      {articles.map((article, index) => {
        return article ? (
          catalogView === "catalog" ? (
            <CatalogView article={article} key={index} />
          ) : (
            <SummaryView article={article} key={index} />
          )
        ) : null;
      })}
    </section>
  );
};

export { view };
