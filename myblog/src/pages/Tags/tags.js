import React, { Component } from "react";
import TagItem from "../../components/TagItem/index.js";
import { view as TopMenu } from "../../components/TopMenu/";

import { getAllTags } from "./fetch.js";

import "./style.css";

import { FormattedMessage } from "react-intl";

class Tags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: []
    };
  }
  async componentDidMount() {
    let result = await getAllTags();

    if (result.code === "1") {
      this.setState({
        tags: result.tags
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
            <div>
              <ul>
                {tags.map((tag, index) => {
                  return tag ? (
                    <TagItem key={index} content={tag.tag} id={tag._id} />
                  ) : null;
                })}
              </ul>
            </div>
          </section>
        </div>
      </section>
    );
  }
}

export default Tags;
