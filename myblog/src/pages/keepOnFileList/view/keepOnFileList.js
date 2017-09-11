import React, { Component } from 'react';
import { getArticleDateList } from '../fetch.js';

import { view as KeepOnFileItem } from '../../../components/KeepOnFileItem/';

class KeepOnFileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList: []
    }
  }
  async componentDidMount() {
    let result = await getArticleDateList();
    console.log(result);

    if (result.code === '1') {
      this.setState({
        articleList: result.articles
      })
    } else {
      console.log(result);
    }
  }
  render() {

    let { articleList } = this.state;

    return(
      <section>
        <h2>Keep On File</h2>
        <div>
          <ul>
            {
              articleList.map((article, index) => {
                return article? <KeepOnFileItem
                                  key = { index }
                                  article = { article }
                                />
                              : null
              })
            }
          </ul>
        </div>
      </section>
    );
  }
}

export default KeepOnFileList;
