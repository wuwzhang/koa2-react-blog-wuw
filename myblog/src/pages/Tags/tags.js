import React, { Component } from 'react';
import TagItem from '../../components/TagItem/index.js';
import { view as TopMenu } from '../../components/TopMenu/';

import { getAllTags } from './fetch.js';
import {
  Grid
} from 'react-bootstrap';

class Tags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: []
    }
  }
  async componentDidMount() {
    let result = await getAllTags();

    if (result.code === '1') {

      this.setState({
        tags: result.tags
      })

    } else {
      console.log(result);
    }
  }

  render() {

    let { tags } = this.state;

    return(
      <Grid>
        <TopMenu />
        <section>
          <div>
            <ul>
              {
                tags.map((tag, index) => {
                  return tag? <TagItem
                                key = { index }
                                content = { tag.tag }
                                id = { tag._id }
                              />
                            : null
                })
              }
            </ul>
          </div>
        </section>
      </Grid>
    );
  }
}

export default Tags;
