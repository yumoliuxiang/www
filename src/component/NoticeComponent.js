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
    axios.get(apis.getNotice).then(data => {
      let noticeList = data.data;
      if (noticeList.length) {
        // 做下接口兼容
        if (typeof noticeList[0] === 'object') {
          noticeList = noticeList.filter(notice => ['all', 'web'].includes(notice.type)).map(notice => notice.content);
        }
        this.setState({noticeList});
      }
    });
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
