import React, { Component } from "react";
import TagItem from "../../components/TagItem/index.js";
import { view as TopMenu } from "../../components/TopMenu/";

import { getAllTags } from "./fetch.js";
import { Spin } from "antd";

import "./style.css";

import { FormattedMessage } from "react-intl";

class Tags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      loading: true
    };
  }
  async componentDidMount() {
    let result = await getAllTags();

    if (result.code === "1") {
      this.setState({
        tags: result.tags,
        loading: false
      });
    } else {
      console.log(result);
    }
  }

  render() {
    let { tags } = this.state;

    return (
      <section>
        <section className="All-Nav">
          <TopMenu />
        </section>
        <div className="container">
          <section className="TagCloud TagCloud-bg">
            <h2 className="TagCloud-Title">
              <FormattedMessage id="AllTags" defaultMessage="All Tags" />
            </h2>
            <Spin size="large" spinning={this.state.loading === true}>
              <div>
                <ul>
                  {tags.map(tag => {
                    return tag ? (
                      <TagItem key={tag._id} content={tag.tag} id={tag._id} />
                    ) : null;
                  })}
                </ul>
              </div>
            </Spin>
          </section>
        </div>
      </section>
    );
  }
}

export default Tags;
