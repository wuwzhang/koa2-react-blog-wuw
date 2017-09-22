import React, { Component } from 'react';
import { getArticleDateList } from './fetch.js'
import { Badge, Timeline } from 'antd';
import FontAwesome from 'react-fontawesome';
import './style.css';

const KeepOnFileList = ({ year, monthInfo, badgeColor='red' }) => {
  let Arr = ['Jan.', 'Feb.', 'Mar.', 'Apr.',
             'May', 'Jane', 'July', 'Aug.',
             'Sept.', 'Oct.', 'Nov.', 'Dec.' ]
  return (

    <Timeline.Item>
    <div>
      <p className="KeepOnFile-year">{ year }</p>
      {
        monthInfo.map((item) => {
          return (

            <p className="KeepOnFile-month">{ Arr[item.month-1] }<Badge style={{width:'20px', height: '20px', background: badgeColor}} count={ item.count } overflowCount={10}></Badge></p>
          );
        })
      }
    </div>
    </Timeline.Item>
  );
}

class KeepOnFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    }
  }
  async componentDidMount() {
    let result = await getArticleDateList()
    if (result.code === '1') {
      // console.log(result.result);
      this.setState({
        result: result.result
      })
    } else {
      console.log(result);
    }
  }

  render() {

    let result = this.state.result;
    let { color='#369', badgeColor = 'red' } = this.props;

    return (
      <section className="keepOnFile">
        <h6 className="KeepOnFile-AsideTitle" style = {{ color: color}}><FontAwesome className="keepOnFileAside-Icon" name='file-text' /><span>Keep On File</span></h6>
        <Timeline>
          {
            result.map((item, index) => {
              return (
                <KeepOnFileList
                  index = { index }
                  key = { index }
                  year = { item._id.year }
                  monthInfo = { item.monthCount }
                  badgeColor = { badgeColor }
                />
              );
            })
          }
        </Timeline>
      </section>
    );
  }
}

export default KeepOnFile;

