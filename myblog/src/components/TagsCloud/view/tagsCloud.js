import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import qs from "qs";

import TagItem from "../../TagItem/index.js";
import { getTags } from "../fetch.js";
import { initTags } from "../action.js";

import FontAwesome from "react-fontawesome";
import "./style.css";
import { Tooltip } from "antd";
import { FormattedMessage } from "react-intl";

class TagsCloud extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: []
    };
  }
  async componentDidMount() {
    let result = await getTags(10);

    if (result.code === "1") {
      this.props.initTags(result.tags);
    } else {
      console.log(result);
    }
  }
  render() {
    let tags = this.props.tags;
    let { color = "#369" } = this.props;

    const languages = navigator.languages;
    const browserLanguage = languages[0];

    const locale =
      qs.parse(document.location.search && document.location.search.slice(1))
        .locale ||
      browserLanguage ||
      "en-US";

    let cliclTip = "click to show more";

    cliclTip = locale === "zh-CN" ? "点击查看更多标签" : "click to show more";

    return (
      <section className="TagsCloud">
        <h6 className="TagsCloud-TagsTitle">
          <Tooltip placement="top" title={<span>{cliclTip}</span>}>
            <Link to="/tags_cloud" style={{ color: color }}>
              <FontAwesome className="TagsCloud-icon" name="cloud" />
              <span>
                <FormattedMessage
                  id="CloudLabel"
                  defaultMessage="Cloud Label"
                />{" "}
                >>{" "}
              </span>
            </Link>
          </Tooltip>
        </h6>
        <section>
          <ul>
            {tags.map((tag, index) => {
              // console.log(tag);
              return tag ? (
                <TagItem key={index} id={tag._id} content={tag.tag} />
              ) : null;
            })}
          </ul>
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  tags: state.tag.tags
});

const mapDispatchToProps = dispatch => {
  return {
    initTags: tags => {
      dispatch(initTags(tags));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsCloud);
