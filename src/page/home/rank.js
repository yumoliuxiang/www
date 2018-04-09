import React from 'react';
import {Radio, Table} from 'antd';

const RadioGroup = Radio.Group;

export default class Rank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rank: localStorage.getItem('rank') || 'meituan'
    };
  }

  render() {
    const {data} = this.props;
    (data.meituan || []).forEach((item, index) => (item.key = index));
    (data.ele || []).forEach((item, index) => (item.key = index));

    const columns = [
      {title: '排名', dataIndex: 'ranking', width: '33%'},
      {title: 'uid', dataIndex: 'userId', width: '33%'},
      {title: '贡献数量', dataIndex: 'count', width: '33%'}
    ];

    return (
      <div>
        <div style={{color: '#dd2323', marginBottom: '15px'}}>
          排行榜玩法持续开发中，排名靠前的用户将享有特权
        </div>
        <div style={{paddingBottom: '15px'}}>
          贡献排行榜：
          <RadioGroup onChange={this.onChange} value={this.state.rank}>
            <Radio value="meituan">美团</Radio>
            <Radio value="ele">饿了么</Radio>
          </RadioGroup>
        </div>
        <Table
          dataSource={data[this.state.rank]}
          columns={columns}
          pagination={false}
        />
      </div>
    );
  }

  onChange = e => {
    const rank = e.target.value;
    this.setState({rank});
    localStorage.setItem('rank', rank);
  };
}
