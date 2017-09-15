import React, { Component } from 'react';
import { getArticleDateList } from '../fetch.js';

import { view as KeepOnFileItem } from '../../../components/KeepOnFileItem/';
import KeepOnFile from '../../../components/KeepOnFile/index.js'
import { view as TagsCloud } from '../../../components/TagsCloud/';

import { Timeline, Radio } from 'antd';
import FontAwesome from 'react-fontawesome';
import './style.css';
import {
  Col,
  Row
} from 'react-bootStrap'

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
      <section className="keepOnFile-page">
        <Col md={3} mdOffset={7}>
          <section className="KeepOnFile-View">
            <Radio.Group value={ catalogView } onChange={ this.handleView }>
              <Radio.Button value="catalog" ><FontAwesome className="KeepOnFile-ViewIcon" name='list' /><span>Catalog</span></Radio.Button>
              <Radio.Button value="summary"><FontAwesome className="KeepOnFile-ViewIcon" name='list-alt' /><span>Summary</span></Radio.Button>
            </Radio.Group>
          </section>
        </Col>
        <Row>
          <Col md={10} sm={10} xs={12}>
            <section className="timeline">
              <Timeline>
                {
                  articleList.map((article, index) => {
                    return article? <Timeline.Item>
                                      <KeepOnFileItem
                                        key = { index }
                                        article = { article }
                                        catalogView = { (catalogView === 'catalog' || !catalogView) ? true : false }
                                      />
                                    </Timeline.Item>
                                  : null
                  })
                }
              </Timeline>
            </section>
          </Col>
          <Col md={2} sm={2} xsHidden>
            <section className="aside">
              <div>
                <KeepOnFile />
                <TagsCloud />
              </div>
            </section>
          </Col>
        </Row>

      </section>
    );
  }
}

export default KeepOnFileList;
