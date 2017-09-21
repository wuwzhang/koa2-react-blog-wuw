import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { view as ArticlTagItem } from '../../../components/ArticleItem/';
import { view as TopMenu } from '../../../components/TopMenu/';
import { view as CatalogAside } from '../../../components/CatalogAside/';

import { fetchs as TagsFetch } from '../../../components/TagsCloud/';
import { getArticlesByTag } from '../fetch.js';

import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';
import { Tag, Tooltip } from 'antd';
import FontAwesome from 'react-fontawesome';

class ArticleByTag extends Component {

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      tags: [],
      tagContent: this.props.tagContent
    }
  }

  async componentDidMount() {

    let result = await Promise.all([getArticlesByTag(this.props.tagContent),
                                    TagsFetch.getTags()]);

    if (result[0].code === '1' || result[1].code === '1') {
      this.setState({
        articles: result[0].articles,
        tags: result[1].tags
      })
    } else {
      console.log(result);
    }
  }

  async _handleTags(content) {

    let result = await getArticlesByTag(content);

    console.log(result)

    if (result.code === '1') {
      this.setState({
        articles: result.articles,
        tagContent: content
      })
    } else {
      console.log(result);
    }
  }

  render() {

    let { articles, tags = [], tagContent = this.props.tagContent } = this.state;

    return (
      <Grid>
        <TopMenu />
        <section>

          <Row>
            <Col  md={2} sm={2} xs={12}>
              <section  className="TagsCloud" style={{ marginLeft: '16px'}}>
                <h6 className="TagsCloud-TagsTitle">
                  <Tooltip placement='top' title={ <span>click to show more</span> }>
                    <Link to='/tags_cloud' style={{ color: '#07689f' }}>
                      <FontAwesome className="TagsCloud-icon" name='cloud' />
                      <span>cloud label >> </span>
                    </Link>
                  </Tooltip>
                </h6>
                <ul>
                  {
                    tags.map((tag, index) => {
                      return (

                        tag ? <Tag
                                key={ index }
                                style={{ marginBottom: 3 }}
                                color='blue'
                                onClick={ this._handleTags.bind(this, tag.tag) }
                              > { tag.tag } </Tag>
                            : null
                      );
                    })
                  }
                </ul>
                <CatalogAside
                  color='#07689f'
                />
              </section>
            </Col>
            <Col  md={10} sm={10} xs={12}>
              <p>
                <span>Search By Catalog > </span>
                <span>{ tagContent }</span>
              </p>
              <ul>
                {
                  articles.map((article, index) => {
                    return article? <ArticlTagItem
                                      key = { index }
                                      article = { article }
                                    />
                                  : null
                  })
                }
              </ul>
            </Col>
          </Row>

        </section>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  let pathname = state.routing.location.pathname,
      tagContent = pathname.split('/')[2];

  return {
    tagContent: tagContent
  }
}

export default  withRouter(connect(mapStateToProps)(ArticleByTag));
