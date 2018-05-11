import React from 'react';
import ReactDOM from 'react-dom';
import 'gitalk/dist/gitalk.css';
import Gitalk from 'gitalk';
import {injectGlobal} from 'styled-components';

injectGlobal`
  @media screen and (max-width: 768px) {
    .gt-container {
      display: none;
    }
  }
`;

export default class TalkComponent extends React.Component {
  componentDidMount() {
    const gitalk = new Gitalk({
      clientID: '6a4e797a25295987f8ee',
      clientSecret: '4930afa796bddfb2533f8537f0bd5bb8259cf8c6',
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
