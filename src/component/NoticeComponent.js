import React from 'react';
import {Alert} from 'antd';
import {apis, axios} from '../api';

export default class NoticeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeList: []
    };
  }

  componentDidMount() {
    this.getNotice();
  }

  getNotice() {
    axios.get(apis.getNotice).then(data => this.setState({noticeList: data.data}));
  }

  render() {
    return (
      <div>
        {this.state.noticeList.map((notice, index) => (
          <Alert
            style={{margin: '15px 0'}}
            message={
              <div
                dangerouslySetInnerHTML={(__html => ({
                  __html
                }))(notice)}
              />
            }
            key={index}
            type="warning"
          />
        ))}
      </div>
    );
  }
}
