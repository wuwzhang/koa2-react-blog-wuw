import React from 'react';

import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import FontAwesome from 'react-fontawesome';
import './style.css';

export const ArticleCatalog = ({ catalog, color='#369' }) => {
  return(
    <section className="ArticleCatalog">
      <h6 className="ArticleCatalog-CatalogTitle" style={{ color: color }}><FontAwesome className="ArticleCatalog-Catalogitle-icon" name='bookmark' /><span style={{ color: color }}>Catalog</span></h6>
      <Link to={ `/article_by_catalog/${catalog}` }><Tag color='green'>{ catalog }</Tag></Link>
    </section>
  );
}
