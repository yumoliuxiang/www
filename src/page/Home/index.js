import React from 'react';
import {browserHistory} from 'react-router';
import {Alert, Breadcrumb, Tabs} from 'antd';
import styled from 'styled-components';
import {axios, apis, qs} from '../../api';
import moment from 'moment';
import AlipayComponent from '../../component/AlipayComponent';
import CarouselComponent from '../../component/CarouselComponent';
import NoticeComponent from '../../component/NoticeComponent';
import TalkComponent from '../../component/TalkComponent';
import GetHongbao from './GetHongbao';
import Contribute from './Contribute';
import Rules from './Rules';
import Rank from './Rank';
import Statistics from './Statistics';
import JoinGroup from './JoinGroup';
import MiniProgram from './MiniProgram';

const Container = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const Column = styled.div`
  position: relative;
  width: 480px;

  &:first-child {
    margin-right: 20px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

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
      this.getRank();
      this.getTrend();
    } else {
      browserHistory.push('/login');
    }
  }

  render() {
    const {application, historyList, tab, carouselRecords, cookies, rankData, trendData} = this.state;

    return (
      <Container>
        <Column>
          <CarouselComponent data={carouselRecords} />
          {this.renderHello()}
          {this.renderBreadcrumb()}
          <AlipayComponent />
          {this.renderAvailable()}
          <NoticeComponent />
          <TalkComponent />
        </Column>
        <Column>
          <Tabs defaultActiveKey={tab} onChange={this.onTabChange}>
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
                cookies={cookies}
                deleteCookieCallback={this.deleteCookieCallback}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="排行" key="4">
              <Rank data={rankData} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="统计" key="5">
              <Statistics data={trendData} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="小程序" key="6">
              <MiniProgram />
            </Tabs.TabPane>
            <Tabs.TabPane tab="加群" key="7">
              <JoinGroup />
            </Tabs.TabPane>
          </Tabs>
        </Column>
      </Container>
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
          c.time = moment(new Date(c.gmtCreate)).format('YYYY-MM-DD HH:mm:ss');
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
        setTimeout(() => this.refresh(id), 5000);
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
            href="https://github.com/mtdhb/mtdhb/issues"
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
            href="https://github.com/mtdhb/donate/blob/master/README.md"
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
}
