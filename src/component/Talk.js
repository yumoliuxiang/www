import React from 'react';
import ReactDOM from 'react-dom';
import 'gitalk/dist/gitalk.css';
import Gitalk from 'gitalk';
import {injectGlobal} from 'styled-components';
import Media from './Media';

injectGlobal`
  .gt-container {
    ${Media.mobile`display: none;`}
    
    .gt-meta {
      margin-top: 0 !important;
    }
  }
`;

export default class Talk extends React.Component {
  componentDidMount() {
    const gitalk = new Gitalk({
      clientID: '895c3218cb7f8c5a579d',
      clientSecret: 'fc6daf02bda87906924018c6d753220c45c9d4b9',
      repo: 'mtdhb',
      owner: 'mtdhb',
      admin: ['zhuweiyou', 'huangdenghe', 'cooljser', 'duminghong'],
      id: window.location.pathname,
      distractionFreeMode: false,
      labels: ['留言'],
      createIssueManually: true,
      language: 'zh-CN'
    });

    gitalk.render(ReactDOM.findDOMNode(this.refs.container));
  }

  render() {
    return <div ref="container" />;
  }
}
