import React from 'react';
import {Select} from 'antd';

export default class Domain extends React.Component {
  state = {
    domain: Number(localStorage.getItem('domain') || 0)
  };

  render() {
    return (
      <Select defaultValue={this.state.domain} style={{width: 120, marginLeft: 15}} onChange={this.handleChange}>
        <Select.Option value={0}>国内线路</Select.Option>
        <Select.Option value={1}>海外线路</Select.Option>
      </Select>
    );
  }

  handleChange = domain => {
    this.setState({domain});
    localStorage.setItem('domain', domain);
    window.location.reload();
  };
}
