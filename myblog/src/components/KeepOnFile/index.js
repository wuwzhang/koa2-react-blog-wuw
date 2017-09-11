import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchs as listFetchs } from '../../pages/ArticleList/';
import {
  Badge
} from 'react-bootstrap';

const KeepOnFileList = ({ year, monthInfo }) => {
  let Arr = ['Jan.', 'Feb.', 'Mar.', 'Apr.',
             'May', 'Jane', 'July', 'Aug.',
             'Sept.', 'Oct.', 'Nov.', 'Dec.' ]
  return (
    <div>
      <div>{year}</div>
      {
        monthInfo.map((item, index) => {
          return (

            <ul>
              <li><p>{ Arr[item.month-1] }<Badge>{ item.count }</Badge></p></li>
            </ul>
          );
        })
      }
    </div>

  );
}

class keepOnFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    }
  }
  componentDidMount() {
    (async function() {

      let result = await listFetchs.getArticleDateList();
      if (result.code === '1') {
        // console.log(result.result);
        this.setState({
          result: result.result
        })
      } else {
        console.log(result);
      }
    }.bind(this))();
  }

  render() {

    let result = this.state.result;

    return (
      <section className="keepOnFile">
        <h6><Link to = "/Keep_On_File">Keep On File</Link></h6>
        {
          result.map((item, index) => {
            return (
              <KeepOnFileList
                index = { index }
                key = { index }
                year = { item._id.year }
                monthInfo = { item.monthCount }
              />
            );
          })
        }
      </section>
    );
  }
}

export default keepOnFile;

