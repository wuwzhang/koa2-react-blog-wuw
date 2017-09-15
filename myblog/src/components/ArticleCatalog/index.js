import React from 'react';

import FontAwesome from 'react-fontawesome';
import './style.css';

export const ArticleCatalog = ({ catalog }) => {
  return(
    <section className="ArticleCatalog">
      <h6 className="ArticleCatalog-CatalogTitle"><FontAwesome className="ArticleCatalog-Catalogitle-icon" name='bookmark' /><span>Catalog</span></h6>
      <p>{ catalog }</p>
    </section>
  );
}
