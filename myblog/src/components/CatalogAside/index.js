import React, { Component } from 'react';
import { getCatalogsAndCount } from './fetch.js'
import { Link } from 'react-router-dom';

import FontAwesome from 'react-fontawesome';
import './style.css';

class CatalogAside extends Component {

  constructor(props) {
    super(props);

    this.state = {
      catalogs: []
    }
  }

  /**
   * result = [
   *   {_id: '前端', count: '4'},
   *   {_id: '', count: ''}
   *]
   */
  async componentDidMount() {
    let result = await getCatalogsAndCount();

    if (result.code === '1') {
      this.setState({
        catalogs: result.catalogs
      })
    } else {
      console.log(result)
    }
  }
  render() {
    let { catalogs } = this.state;
    // console.log(catalogs)
    return (
      <section className="CatalogAside">
        <h6 className="CatalogAsided-CatalogTitle"><FontAwesome className="CatalogAside-icon" name='th' /><span>Catalog List</span></h6>
        <ul>
        {
          catalogs ? catalogs.map((catalog) => {
                                  return <Link to={ `/article_by_catalog/${catalog._id}` }><li><span className="catalogName">{ catalog._id }</span><span className="catalogCount">({ catalog.count })</span></li></Link>
                                })
                              : null
        }
        </ul>
      </section>
    );
  }
}

export default CatalogAside;
