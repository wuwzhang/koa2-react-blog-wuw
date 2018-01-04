import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import TagItem from "../../TagItem/index.js";
import { getTags } from "../fetch.js";
import { initTags } from "../action.js";

import FontAwesome from "react-fontawesome";
import "./style.css";
import { Tooltip, Spin } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";

import message from "../../../locale/message";

class TagsCloud extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      loading: true
    };
  }
  async componentDidMount() {
    let { tags } = this.props.tags;

    if (tags && tags.length > 0) {
      this.setState({
        tags: tags,
        loading: false
      });
    } else {
      let result = await getTags();

      if (result.code === "1") {
        this.props.initTags(result.tags);
        this.setState({
          tags: result.tags,
          loading: false
        });
      } else {
        console.log(result);
      }
    }
  }
  render() {
    let { tags = [] } = this.state;
    let { color = "#369" } = this.props;

    return (
      <section className="TagsCloud">
        <h6 className="TagsCloud-TagsTitle aside-title">
          <Tooltip
            placement="top"
            title={this.props.intl.formatMessage(message.TagsCloudTip)}
          >
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
        <Spin size="small" spinning={this.state.loading === true}>
          <section>
            <ul>
              {tags.map((tag, index) => {
                // console.log(tag);
                return tag ? (
                  <TagItem
                    key={`TagItem${index}`}
                    id={tag._id}
                    content={tag.tag}
                  />
                ) : null;
              })}
            </ul>
          </section>
        </Spin>
      </section>
    );
  }
}

TagsCloud.propTypes = {
  intl: PropTypes.object.isRequired,
  initTags: PropTypes.func,
  tags: PropTypes.object
};

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

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(TagsCloud, {
    withRef: true
  })
);
