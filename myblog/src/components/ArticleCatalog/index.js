import React from "react";

import { Link } from "react-router-dom";
import { Tag } from "antd";
import FontAwesome from "react-fontawesome";
import "./style.css";

import { FormattedMessage } from "react-intl";

export const ArticleCatalog = ({ catalog, color = "#369" }) => {
  return (
    <section className="ArticleCatalog">
      <h6
        className="ArticleCatalog-CatalogTitle aside-title"
        style={{ color: color }}
      >
        <FontAwesome
          className="ArticleCatalog-Catalogitle-icon"
          name="bookmark"
        />
        <span style={{ color: color }}>
          <FormattedMessage id="Catalog" defaultMessage="Catalog" />
        </span>
      </h6>
      {catalog
        ? catalog.map(catalog => (
            <Link to={`/article_by_catalog/${catalog}`}>
              <Tag color="green">{catalog}</Tag>
            </Link>
          ))
        : null}
    </section>
  );
};
