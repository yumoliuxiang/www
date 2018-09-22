import React from 'react';
import {Select} from 'antd';
import {domains} from '../api';

export default class Domain extends React.Component {
  state = {
    domain: Number(localStorage.getItem('domain') || 0)
  };

  render() {
    if (domains.length <= 1) {
      return null;
    }

    return (
      <Select defaultValue={this.state.domain} style={{width: 112, marginLeft: 15}} onChange={this.handleChange}>
        {domains.map((item, index) => <Select.Option value={index}>{item.name}</Select.Option>)}
      </Select>
    );
  }

  handleChange = domain => {
    this.setState({domain});
    localStorage.setItem('domain', domain);
    window.location.reload();
  };
}
