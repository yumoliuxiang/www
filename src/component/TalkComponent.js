import React from 'react';
import ReactDOM from 'react-dom';
import 'gitalk/dist/gitalk.css';
import Gitalk from 'gitalk';

export default class TalkComponent extends React.Component {
  componentDidMount() {
    const gitalk = new Gitalk({
      clientID: '6a4e797a25295987f8ee',
      clientSecret: '4930afa796bddfb2533f8537f0bd5bb8259cf8c6',
      repo: 'www',
      owner: 'mtdhb',
      admin: ['zhuweiyou', 'huangdenghe', 'cooljser'],
      id: window.location.pathname, // Ensure uniqueness and length less than 50
      distractionFreeMode: false, // Facebook-like distraction free mode
      labels: ['评论'],
      createIssueManually: true,
      language: 'zh-CN'
    });

    gitalk.render(ReactDOM.findDOMNode(this.refs.container));
  }

  render() {
    return <div ref="container" />;
  }
}
