import React, { Component } from "react";
import { keepOnFileDatalist } from "./fetch.js";
import { Badge, Timeline, Spin } from "antd";
import FontAwesome from "react-fontawesome";
import "./style.css";
import { FormattedMessage } from "react-intl";

const KeepOnFileList = ({ year, monthInfo, badgeColor = "red" }) => {
  let Arr = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jane",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec."
  ];
  return (
    <Timeline.Item>
      <div>
        <p className="KeepOnFile-year">{year}</p>
        {monthInfo
          ? monthInfo.map((item, index) => {
              return (
                <p
                  key={`KeepOnFile-month${index}`}
                  className="KeepOnFile-month"
                >
                  {Arr[item.month - 1]}
                  <Badge
                    style={{
                      height: "20px",
                      marginLeft: "10px",
                      background: badgeColor
                    }}
                    count={item.count}
                    overflowCount={9}
                  />
                </p>
              );
            })
          : null}
      </div>
    </Timeline.Item>
  );
};

class KeepOnFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      loading: true
    };
  }
  async componentDidMount() {
    let result = await keepOnFileDatalist();
    if (result.code === "1") {
      this.setState({
        result: result.result,
        loading: false
      });
    } else {
      console.log(result);
    }
  }

  render() {
    let result = this.state.result;
    let { color = "#369", badgeColor = "red" } = this.props;
    return (
      <section className="keepOnFile">
        <h6
          className="KeepOnFile-AsideTitle aside-title"
          style={{ color: color }}
        >
          <FontAwesome className="keepOnFileAside-Icon" name="file-text" />
          <span>
            <FormattedMessage id="KeepOnFile" defaultMessage="Keep On File" />
          </span>
        </h6>
        <Spin size="small" spinning={this.state.loading === true}>
          <Timeline>
            {result.map((item, index) => {
              return (
                <KeepOnFileList
                  index={index}
                  key={index}
                  year={item._id.year}
                  monthInfo={item.monthCount}
                  badgeColor={badgeColor}
                />
              );
            })}
          </Timeline>
        </Spin>
      </section>
    );
  }
}

export default KeepOnFile;
