import React, { Component } from 'react';
import { getArticleDateList } from '../fetch.js';

import { view as KeepOnFileItem } from '../../../components/KeepOnFileItem/';
import KeepOnFile from '../../../components/KeepOnFile/index.js'
import { view as TagsCloud } from '../../../components/TagsCloud/';
import { view as CatalogAside } from '../../../components/CatalogAside/';
import { view as TopMenu } from '../../../components/TopMenu/';
import { view as SearchBox } from '../../../components/ArticleSearch/';

import { Timeline, Radio } from 'antd';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import QueueAnim from 'rc-queue-anim';
import './style.css';
import {
  Grid,
  Col,
  Row
} from 'react-bootstrap'

class KeepOnFileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList: [],
      catalogView: 'catalog'
    }
    this.handleView = this.handleView.bind(this);
  }
  async componentDidMount() {
    let result = await getArticleDateList();

    if (result.code === '1') {
      this.setState({
        articleList: result.articles
      })
    } else {
      console.log(result);
    }
  }

  handleView(e) {
    this.setState({
      catalogView: e.target.value
    });
  }
  render() {

    let { articleList, catalogView } = this.state;

    return(
      <section>
        <section className='All-Nav'>
          <TopMenu />
        </section>
        <Grid>
          <section className="keepOnFile-page">
            <Col md={3} mdOffset={7} sm={3} smOffset={7} xsHidden>
              <section className="KeepOnFile-View">
                <Radio.Group value={ catalogView } onChange={ this.handleView }>
                  <Radio.Button value="catalog">
                    <FontAwesome className="KeepOnFile-ViewIcon" name='list' />
                    <span>
                      <FormattedMessage
                        id="ArticleList"
                        defaultMessage="List"
                      />
                    </span>
                  </Radio.Button>
                  <Radio.Button value="summary">
                    <FontAwesome className="KeepOnFile-ViewIcon" name='list-alt' />
                    <span>
                      <FormattedMessage
                        id="Summary"
                        defaultMessage="Summary"
                      />
                    </span>
                  </Radio.Button>
                </Radio.Group>
              </section>
            </Col>
            <Row>
              <Col md={10} sm={10} xs={12}>
                <section className="timeline">
                  <Timeline>
                    <QueueAnim>
                    {
                      articleList.map((article, index) => {
                        return article? <Timeline.Item key={index}>
                                          <KeepOnFileItem
                                            key = { index }
                                            article = { article }
                                            catalogView = { (catalogView === 'catalog' || !catalogView) ? true : false }
                                          />
                                        </Timeline.Item>
                                      : null
                      })
                    }
                    </QueueAnim>
                  </Timeline>
                </section>
              </Col>
              <Col md={2} sm={2} xsHidden>
                <section className="aside">
                  <div>
                    <SearchBox
                      color = '#07689f'
                    />
                    <KeepOnFile
                      color = '#07689f'
                      badgeColor = '#FF7E67'
                    />
                    <TagsCloud
                      color = '#07689f'
                    />
                    <CatalogAside
                      color = '#07689f'
                    />
                  </div>
                </section>
              </Col>
            </Row>

          </section>
        </Grid>
      </section>
    );
  }
}

export default KeepOnFileList;
