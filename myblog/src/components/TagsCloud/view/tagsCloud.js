import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TagItem from '../../TagItem/index.js';
import { getTags } from '../fetch.js';

import FontAwesome from 'react-fontawesome';
import './style.css';
import { Tooltip } from 'antd';

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
    let { color='#369' } = this.props;

    return (
      <section className="TagsCloud">
        <h6 className="TagsCloud-TagsTitle">
          <Tooltip placement='top' title={ <span>click to show more</span> }>
            <Link to='/tags_cloud' style={{ color: color }}>
              <FontAwesome className="TagsCloud-icon" name='cloud' />
              <span>cloud label >> </span>
            </Link>
          </Tooltip>
        </h6>
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
