import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCatalogsAndCount } from '../fetch.js'
import { setCatalog } from '../action.js';

import FontAwesome from 'react-fontawesome';
import './style.css';

import { FormattedMessage } from 'react-intl';

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
      this.props.setCatalog(result.catalogs);
    } else {
      console.log(result)
    }
  }
  render() {
    let { catalogs } = this.state;
    let { color } = this.props;
    return (
      <section className="CatalogAside">
        <h6 className="CatalogAsided-CatalogTitle" style={{ color: color}}>
          <FontAwesome className="CatalogAside-icon" name='th' />
          <span>
            <FormattedMessage
              id="CatalogList"
              defaultMessage="Catalog List"
            />
          </span>
        </h6>
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


const mapDispatchToProps = (dispatch) => {
  return {
    setCatalog: (catalog) => {
      dispatch(setCatalog(catalog));
    }
  }
}

export default connect(null, mapDispatchToProps)(CatalogAside);
