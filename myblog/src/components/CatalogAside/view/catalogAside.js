import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getCatalogsAndCount } from "../fetch.js";
import { setCatalog } from "../action.js";

import FontAwesome from "react-fontawesome";
import { Spin } from "antd";
import "./style.css";

import { FormattedMessage } from "react-intl";

class CatalogAside extends Component {
  constructor(props) {
    super(props);

    this.state = {
      catalogs: [],
      loading: true
    };
  }

  /**
   * result = [
   *   {_id: '前端', count: '4'},
   *   {_id: '', count: ''}
   *]
   */
  async componentDidMount() {
    let { catalogs } = this.props.catalogs;

    if (catalogs && catalogs.length > 0) {
      this.setState({
        catalogs: catalogs,
        loading: false
      });
    } else {
      let result = await getCatalogsAndCount();

      if (result.code === "1") {
        this.setState({
          catalogs: result.catalogs,
          loading: false
        });
        this.props.setCatalog(result.catalogs);
      } else {
        console.log(result);
      }
    }
  }
  render() {
    let { catalogs } = this.state;
    let { color } = this.props;
    return (
      <section className="CatalogAside">
        <h6
          className="CatalogAsided-CatalogTitle aside-title"
          style={{ color: color }}
        >
          <FontAwesome className="CatalogAside-icon" name="th" />
          <span>
            <FormattedMessage id="CatalogList" defaultMessage="Catalog List" />
          </span>
        </h6>
        <Spin size="small" spinning={this.state.loading === true}>
          <ul>
            {catalogs
              ? catalogs.map((catalog, index) => {
                  return (
                    <Link to={`/article_by_catalog/${catalog._id}`} key={index}>
                      <li>
                        <span className="catalogName">{catalog._id}</span>
                        <span className="catalogCount">({catalog.count})</span>
                      </li>
                    </Link>
                  );
                })
              : null}
          </ul>
        </Spin>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  catalogs: state.catalog.catalog
});

const mapDispatchToProps = dispatch => {
  return {
    setCatalog: catalog => {
      dispatch(setCatalog(catalog));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogAside);
