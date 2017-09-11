import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TagItem from '../../TagItem/index.js';
import { getTags } from '../fetch.js';

class TagsCloud extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: []
    }
  }
  async componentDidMount() {
    let result = await getTags(10);

    if (result.code === '1') {
      this.setState({
        tags: result.tags
      })
    } else {
      console.log(result);
    }
  }
  render() {
    let tags = this.state.tags;

    return (
      <section>
        <h6><Link to='/tags_cloud'>cloud label</Link></h6>
        <section>
          <ul>
            {
              tags.map((tag, index) => {
                // console.log(tag);
                return (

                  tag ? <TagItem
                          key = { index }
                          id = { tag._id }
                          content = { tag.tag }
                        />
                      : null
                );
              })
            }
          </ul>
        </section>
      </section>
    );
  }
}

export default TagsCloud;
