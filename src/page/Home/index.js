import React from 'react';
import {browserHistory} from 'react-router';
import {Alert, Breadcrumb, Tabs} from 'antd';
import {axios, apis, qs} from '../../api';
import dateFormat from '../../util/dateFormat';
import AsyncComponent from '../../component/AsyncComponent';
import CarouselComponent from '../../component/CarouselComponent';
import AlipayComponent from '../../component/AlipayComponent';

// 根据 tab 页切割 js
const GetHongbao = AsyncComponent(() => import('./GetHongbao'));
const Contribute = AsyncComponent(() => import('./Contribute'));
const Rules = AsyncComponent(() => import('./Rules'));
const Rank = AsyncComponent(() => import('./Rank'));
const Statistics = AsyncComponent(() => import('./Statistics'));
const JoinGroup = AsyncComponent(() => import('./JoinGroup'));

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      cookies: [],
      noticeList: [],
      available: {
        meituan: 0,
        ele: 0
      },
      historyList: [],
      createTime: 15,
      tab: localStorage.getItem('tab') || '1',
      application: parseInt(localStorage.getItem('application') || 0, 10),
      carouselRecords: [],
      rankData: {},
      trendData: {}
    };
    document.body.classList.add('is-home');
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.getUserInfo();
      this.getCookieList();
      this.getAvailableCount();
      this.getHongbaoHistory();
      this.zhuangbi();
      this.getNotice();
      this.getRank();
      this.getTrend();
    } else {
      browserHistory.push('/login');
    }
  }

  render() {
    let {application, historyList} = this.state;

    return (
      <div className="app">
        <div className="app-column">
          <CarouselComponent data={this.state.carouselRecords} />
          {this.renderHello()}
          {this.renderBreadcrumb()}
          <AlipayComponent.Button />
          {this.renderAvailable()}
          {this.renderNotice()}
          <AlipayComponent.Image />
        </div>

        <Tabs className="app-column" defaultActiveKey={this.state.tab} onChange={this.onTabChange}>
          <Tabs.TabPane tab="规则" key="1">
            <Rules />
          </Tabs.TabPane>
          <Tabs.TabPane tab="领取" key="2">
            <GetHongbao historyList={historyList} callback={this.getHongbaoCallback} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="贡献" key="3">
            <Contribute
              contributeCallback={this.contributeCallback}
              onApplicationChange={this.onApplicationChange}
              application={application}
              cookies={this.state.cookies}
              deleteCookieCallback={this.deleteCookieCallback}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="排行" key="4">
            <Rank data={this.state.rankData} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="统计" key="5">
            <Statistics data={this.state.trendData} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="加群" key="6">
            <JoinGroup />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }

  deleteCookieCallback = id => {
    //前端删除
    let cookies = this.state.cookies.filter(o => o.id !== id);
    this.setState({cookies});
    //刷新
    this.getAvailableCount();
  };

  getTrend = e => {
    axios.get(apis.getTrend).then(data => this.setState({trendData: data.data}));
  };

  getRank = e => {
    axios.get(apis.getRank).then(data => this.setState({rankData: data.data}));
  };

  getNotice = e => {
    axios.get(apis.getNotice).then(data => this.setState({noticeList: data.data}));
  };

  getUserInfo = e => {
    axios.get(apis.getUser).then(data => {
      if (data.code === 0) {
        this.setState({user: data.data});
      } else if (data.code === 10000) {
        localStorage.clear();
        browserHistory.push('/login');
      } else {
        alert(data.message);
      }
    });
  };

  getCookieList = e => {
    axios.get(apis.cookie).then(data => {
      if (data.code === 0) {
        let cookies = data.data;
        cookies.forEach((c, i) => {
          c.time = dateFormat(new Date(c.gmtCreate));
          c.key = i;
          c.nickname = c.nickname || '--';
        });
        this.setState({cookies});
      } else {
        alert(data.message);
      }
    });
  };

  getAvailableCount = e => {
    axios.get(apis.getAvailableCount).then(data => this.setState({available: data.data}));
  };

  getHongbaoHistory = e => {
    axios.get(apis.getHongbaoHistory).then(data => this.setState({historyList: data.data}));
  };

  refresh = id => {
    axios.post(apis.refresh, qs.stringify({receivingId: id})).then(res => {
      let {data} = res;
      if (data.status === 0) {
        setTimeout(e => this.refresh(id), 10000);
      } else {
        const {historyList} = this.state;
        historyList[0] = data;
        this.setState({historyList});
        this.getAvailableCount();
      }
    });
  };

  logout = e => {
    axios.get(apis.logout).then(data => {
      localStorage.clear();
      browserHistory.push('/login');
    });
  };

  zhuangbi = e => {
    axios.get(apis.zhuangbi).then(res => this.setState({carouselRecords: res.data}));
  };

  onTabChange = tab => {
    localStorage.setItem('tab', tab);
  };

  getHongbaoCallback = data => {
    let {historyList} = this.state;
    historyList = [data].concat(historyList);
    this.setState({historyList});
    this.refresh(data.id);
  };

  contributeCallback = e => {
    this.getCookieList();
    this.getAvailableCount();
  };

  onApplicationChange = e => {
    this.setState({application: e.target.value});
    localStorage.setItem('application', e.target.value);
  };

  renderHello = e => {
    return this.state.user.mail ? (
      <h3>
        您好 {this.state.user.mail} (uid: {this.state.user.id})
      </h3>
    ) : (
      <h3>您好</h3>
    );
  };

  renderBreadcrumb = e => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <a
            href="https://github.com/game-helper/hongbao2/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              margin: '12px 0'
            }}
          >
            反馈问题
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a
            href="https://github.com/game-helper/donate"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              margin: '12px 0'
            }}
          >
            捐赠我们
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a
            onClick={e => {
              e.preventDefault();
              this.logout();
            }}
          >
            退出登录
          </a>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  renderAvailable = e => {
    return this.state.user.mail ? (
      <Alert
        style={{margin: '15px 0'}}
        message={
          '今日剩余可消耗：美团 ' +
          this.state.available.meituan +
          '/' +
          this.state.cookies.filter(o => o.application === 0).length * 5 +
          ' 次，饿了么 ' +
          this.state.available.ele +
          '/' +
          this.state.cookies.filter(o => o.application === 1).length * 5 +
          ' 次'
        }
        type="info"
      />
    ) : (
      <Alert style={{margin: '15px 0'}} message="数据加载中，长时间没有响应请刷新页面" type="info" />
    );
  };

  renderNotice = e => {
    return this.state.noticeList.map((notice, index) => (
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
    ));
  };
}
